from fastapi import FastAPI, status, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing_extensions import Annotated, List

import os

# Server

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.mount('/assets', StaticFiles(directory='dist/assets'), name='assets')

# Models

class BookModel(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    author: str = Field(index=True)
    comment: str = Field(default='', index=True)
    created_date: datetime = Field(default=datetime.now(), index=True)

# Database configurations

sql_file_name = 'database.db'
sqlite_url = f'sqlite:///{sql_file_name}'
connect_args = {'check_same_thread': False}
engine = create_engine(sqlite_url, connect_args=connect_args)

# --
# Create Tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

# End Database Configurations

# Initialization

@app.on_event('startup')
async def startup_event():
    create_db_and_tables()

# Endpoints

@app.post('/api/book', status_code=status.HTTP_201_CREATED)
async def create_book(book: BookModel, session: SessionDep):
    session.add(book)
    session.commit()
    session.refresh(book)
    return book.model_dump(exclude_none=True)

@app.get('/api/books', status_code=status.HTTP_200_OK)
def read_all_books(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100
) -> List[BookModel]:
    books = session.exec(select(BookModel).offset(offset).limit(limit)).all()
    return books

@app.get('/api/books/{book_id}', status_code=status.HTTP_200_OK)
def read_one_book(book_id: int, session: SessionDep) -> BookModel:
    book = session.get(BookModel, book_id)
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Book not found')
    
    return book

@app.delete('/api/books/{book_id}', status_code=status.HTTP_204_NO_CONTENT)
def remove_one_book(book_id: int, session: SessionDep):
    book = session.get(BookModel, book_id)

    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail='Book not found.')
    
    session.delete(book)
    session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@app.get('/', response_class=FileResponse)
async def serve_root():
    return FileResponse("dist/index.html")

@app.get('/{full_path:path}', response_class=FileResponse)
async def serve_spa(full_path: str):
    return FileResponse("dist/index.html")
