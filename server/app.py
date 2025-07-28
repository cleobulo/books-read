from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import Response
# from fastapi.responses import FileResponse
# from fastapi.staticfiles import StaticFiles
from db import create_db_and_tables
from api import books_router

# import os

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

app.include_router(books_router)
# app.mount('/assets', StaticFiles(directory='dist/assets'), name='assets')

@app.on_event('startup')
async def startup_event():
    create_db_and_tables()

# @app.get('/', response_class=FileResponse)
# async def serve_root():
#     return FileResponse("dist/index.html")

# @app.get('/{full_path:path}', response_class=FileResponse)
# async def serve_spa(full_path: str):
#     return FileResponse("dist/index.html")
