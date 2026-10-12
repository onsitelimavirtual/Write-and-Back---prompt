@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo [Write and Back 4.0] Node.js 20 ou superior nao encontrado.
  echo Abra index.html para usar o motor inteligente offline sem instalar nada.
  echo Para o modelo neural local, instale Node.js 20+ e Ollama com um modelo local.
  pause
  exit /b 1
)
node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 20 ? 0 : 1)"
if errorlevel 1 (
  echo Node.js desatualizado. Requer 20 ou superior para a ponte local.
  pause
  exit /b 1
)
echo Iniciando servidor somente neste computador em 127.0.0.1:8787...
start "Write and Back - Servidor Local" cmd /k "node local-bridge.js"
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:8787/"
echo Para encerrar a ponte, feche a janela Write and Back - Servidor Local.
endlocal
