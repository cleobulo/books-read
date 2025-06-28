@echo off
REM Caminho para o venv
set VENV_DIR=%~dp0venv

if not exist "%VENV_DIR%" (
    echo O ambiente virtual não existe. Execute "activate_venv.bat" primeiro.
    exit /b 1
)

call "%VENV_DIR%\Scripts\activate.bat"

echo Iniciando o servidor em http://127.0.0.1:8000 ...
uvicorn app:app --reload
