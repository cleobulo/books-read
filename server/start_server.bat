@echo off
REM Ativa o ambiente virtual e inicia o servidor FastAPI em segundo plano
call activate_venv.bat
start "" uvicorn app:app --host 0.0.0.0 --port 8099
