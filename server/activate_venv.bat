@echo off
REM Caminho para o venv
set VENV_DIR=%~dp0venv

if not exist "%VENV_DIR%" (
    echo Criando ambiente virtual em %VENV_DIR%...
    python -m venv "%VENV_DIR%"
)

echo Ativando ambiente virtual...
call "%VENV_DIR%\Scripts\activate.bat"
