from fastapi import APIRouter, status, Query, HTTPException, Response
from sqlmodel import select
from typing_extensions import Annotated, List
from models import BookModel
from db import SessionDep

router = APIRouter()

# Endpoints

@router.post('/api/book', status_code=status.HTTP_201_CREATED)
async def create_book(book: BookModel, session: SessionDep):
    session.add(book)
    session.commit()
    session.refresh(book)
    return book.model_dump(exclude_none=True)

@router.get('/api/books', status_code=status.HTTP_200_OK)
def read_all_books(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100
) -> List[BookModel]:
    books = session.exec(select(BookModel).offset(offset).limit(limit)).all()
    return books

@router.get('/api/books/{book_id}', status_code=status.HTTP_200_OK)
def read_one_book(book_id: int, session: SessionDep) -> BookModel:
    book = session.get(BookModel, book_id)
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Book not found')
    
    return book

@router.delete('/api/books/{book_id}', status_code=status.HTTP_204_NO_CONTENT)
def remove_one_book(book_id: int, session: SessionDep):
    book = session.get(BookModel, book_id)

    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail='Book not found.')
    
    session.delete(book)
    session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
