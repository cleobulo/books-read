from sqlmodel import SQLModel, create_engine, Session
from typing_extensions import Annotated
from fastapi import Depends

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
