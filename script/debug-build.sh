#!/bin/bash
# Script de debug para descobrir onde está falhando

set -e  # Para na primeira falha

echo "==> [DEBUG] Iniciando build de debug..."
echo "==> [DEBUG] Node version: $(node --version)"
echo "==> [DEBUG] NPM version: $(npm --version)"

echo ""
echo "==> [DEBUG] Limpando cache do npm..."
npm cache clean --force || true

echo ""
echo "==> [DEBUG] Instalando dependências..."
npm install

echo ""
echo "==> [DEBUG] Listando dependências instaladas..."
npm list --depth=0

echo ""
echo "==> [DEBUG] Verificando se tsx existe..."
which tsx || echo "tsx NÃO encontrado no PATH"
npx tsx --version

echo ""
echo "==> [DEBUG] Verificando se vite existe..."
which vite || echo "vite NÃO encontrado no PATH"
npx vite --version

echo ""
echo "==> [DEBUG] Iniciando build do cliente..."
npm run build:frontend

echo ""
echo "==> [DEBUG] Verificando se dist/public foi criado..."
ls -la dist/public || echo "dist/public NÃO existe!"

echo ""
echo "==> [DEBUG] Build completo com sucesso!"
