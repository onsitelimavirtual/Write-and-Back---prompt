#!/bin/sh
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo 'Node.js 20+ ausente. Use index.html diretamente para o modo offline básico.'
  exit 1
fi
printf 'Acesse http://127.0.0.1:8787 no navegador. Pressione Ctrl+C para encerrar.\n'
node local-bridge.js
