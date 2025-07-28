from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Book(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    author: str = Field(index=True)
    created_date: datetime = Field(default=datetime.now(), index=True)
    note_id: Optional[int] = Field(default=None, foreign_key='note.id')
    note: Optional['Note'] = Relationship(back_populates='books')

class Note(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    content: str = Field(index=True)
    created_date: datetime = Field(default=datetime.now(), index=True)
    books: List[Book] = Relationship(back_populates='note')
