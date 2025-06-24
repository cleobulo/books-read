#!/bin/bash

# Caminho para o venv
VENV_DIR="$(dirname "$0")/venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "Criando ambiente virtual em $VENV_DIR..."
    python3 -m venv "$VENV_DIR"
fi

if [[ "$0" == "$BASH_SOURCE" ]]; then
    echo -e "\nATENÇÃO: Rode este script com 'source activate_venv.sh' ou '. activate_venv.sh' para ativar o ambiente no shell atual."
    return 1
fi

echo "Ativando ambiente virtual..."
# shellcheck disable=SC1090
source "$VENV_DIR/bin/activate"
