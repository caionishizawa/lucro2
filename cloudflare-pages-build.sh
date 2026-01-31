#!/bin/bash
# Script de build otimizado para Cloudflare Pages

set -e

echo "🔨 Instalando dependências..."
npm ci --prefer-offline --no-audit

echo "🏗️  Executando build..."
npm run build

echo "✅ Build concluído!"
echo "📦 Arquivos prontos em: dist/public"

