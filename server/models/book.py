from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Book(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    author: str = Field(index=True)
    created_date: datetime = Field(default=datetime.now(), index=True)
    note: Optional['Note'] = Relationship(back_populates='book')

class Note(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: Optional[str] = Field(default=None, index=True)
    content: str = Field(default=None, index=True)
    created_date: datetime = Field(default=datetime.now(), index=True)
    book_id: int = Field(default=None, foreign_key='book.id')
    book: Book = Relationship(back_populates='note')
