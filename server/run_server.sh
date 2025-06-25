#!/bin/bash

# Caminho para o venv
VENV_DIR="$(dirname "$0")/venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "O ambiente virtual não existe. Execute 'source activate_venv.sh' primeiro."
    exit 1
fi

# Ativa o venv
source "$VENV_DIR/bin/activate"

# Roda o servidor FastAPI usando Uvicorn
echo "Iniciando o servidor em http://127.0.0.1:8000 ..."
uvicorn app:app --reload
