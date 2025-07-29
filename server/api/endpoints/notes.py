from fastapi import APIRouter, status, Query, HTTPException, Response
from sqlmodel import select
from typing_extensions import Annotated, List
from models import BookModel, NoteModel
from db import SessionDep

router = APIRouter()

# Endpoints

@router.post('/api/note', status_code=status.HTTP_201_CREATED)
async def create_note(note: NoteModel, session: SessionDep):
    book = session.exec(select(BookModel).where(BookModel.id == note.book_id)).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    session.add(note)
    session.commit()
    session.refresh(note)
    return note.model_dump(exclude_none=True)

@router.get('/api/notes/{book_id}', status_code=status.HTTP_200_OK)
async def get_notes(book_id: int, session: SessionDep):
    notes = session.exec(select(NoteModel).where(NoteModel.book_id == book_id)).all()
    return [note.model_dump(exclude_none=True) for note in notes]
