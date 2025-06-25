#!/bin/bash

# Caminho para o venv
VENV_DIR="$(dirname "$0")/venv"
REQ_FILE="$(dirname "$0")/requirements.txt"

if [ ! -d "$VENV_DIR" ]; then
    echo "O ambiente virtual não existe. Execute 'source activate_venv.sh' primeiro."
    exit 1
fi

if [ ! -f "$REQ_FILE" ]; then
    echo "Arquivo requirements.txt não encontrado em $REQ_FILE."
    exit 1
fi

# Ativa o venv
source "$VENV_DIR/bin/activate"

# Instala as dependências
pip install --upgrade pip
pip install -r "$REQ_FILE"

echo "Dependências instaladas com sucesso."
