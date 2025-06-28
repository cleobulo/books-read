@echo off
REM Caminho para o venv e requirements.txt
set VENV_DIR=%~dp0venv
set REQ_FILE=%~dp0requirements.txt

if not exist "%VENV_DIR%" (
    echo O ambiente virtual não existe. Execute "activate_venv.bat" primeiro.
    exit /b 1
)

if not exist "%REQ_FILE%" (
    echo Arquivo requirements.txt não encontrado em %REQ_FILE%.
    exit /b 1
)

call "%VENV_DIR%\Scripts\activate.bat"

pip install --upgrade pip
pip install -r "%REQ_FILE%"

echo Dependencias instaladas com sucesso.
