# Início Rápido - Deploy Lucroo

## 🚨 Resolver Problemas Comuns

### Problema 1: Executar Migrations no Render Database

Você tem a DATABASE_URL:
```
postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo
```

**Opção A: Executar Localmente** (Recomendado)

```bash
# 1. Criar arquivo .env.production (se ainda não existe)
cat > .env.production << 'EOF'
DATABASE_URL=postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://seu-projeto.vercel.app
EOF

# 2. Executar migrations
export DATABASE_URL="postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo"
npm run db:push
```

**Opção B: Via Render Shell** (Depois de fazer deploy do backend)

1. Ir no Render Dashboard → Web Service `lucroo-backend`
2. Clicar na aba **"Shell"**
3. Executar:
```bash
npm run db:push
```

---

### Problema 2: Erro "Invalid Characters" no Vercel

**Causa**: O Vercel tem regras rígidas para nomes de projetos.

**Solução**:

Quando estiver criando o projeto na Vercel:

1. **Nome do Projeto**: Use apenas letras minúsculas, números e hífens
   - ✅ Bom: `lucroo`, `lucroo-app`, `meu-projeto`
   - ❌ Ruim: `Lucroo`, `lucro_app`, `projeto 2024`

2. **NÃO use**:
   - Underscores `_`
   - Espaços
   - Letras maiúsculas
   - Caracteres especiais (@, #, $, etc.)
   - Não comece com número

3. **Configuração Correta**:
   ```
   Project Name: lucroo (ou lucroo-frontend)
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist/public
   Install Command: npm install
   ```

4. **Variáveis de Ambiente**:
   ```
   VITE_API_URL = https://lucroo-backend.onrender.com
   ```

---

## 📋 Checklist Completo de Deploy

### ✅ 1. Database (Render PostgreSQL)

- [ ] Criar database no Render
- [ ] Copiar External Database URL
- [ ] Executar migrations (`npm run db:push`)
- [ ] Verificar se tabela `leads` foi criada

### ✅ 2. Backend (Render Web Service)

- [ ] Criar Web Service no Render
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente:
  ```
  DATABASE_URL = postgresql://lucroo_user:...@dpg-...ohio-postgres.render.com/lucroo
  NODE_ENV = production
  PORT = 5000
  FRONTEND_URL = https://lucroo.vercel.app (ou seu domínio)
  ```
- [ ] Aguardar deploy (5-10 min)
- [ ] Anotar URL do backend: `https://lucroo-backend.onrender.com`
- [ ] Testar endpoint:
  ```bash
  curl -X POST https://lucroo-backend.onrender.com/api/leads \
    -H "Content-Type: application/json" \
    -d '{"email":"teste@example.com"}'
  ```

### ✅ 3. Frontend (Vercel)

- [ ] Acessar [vercel.com](https://vercel.com)
- [ ] Importar repositório GitHub
- [ ] Configurar projeto:
  - **Nome**: `lucroo` (sem underscores, sem maiúsculas!)
  - **Framework**: Vite
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist/public`
- [ ] Adicionar variáveis de ambiente:
  ```
  VITE_API_URL = https://lucroo-backend.onrender.com
  ```
- [ ] Deploy
- [ ] Anotar URL: `https://lucroo.vercel.app`
- [ ] Testar site e formulário

### ✅ 4. Atualizar FRONTEND_URL no Backend

Após obter a URL do Vercel:

1. Ir no Render → Web Service → **Environment**
2. Editar `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://lucroo.vercel.app
   ```
3. Salvar (redeploy automático)

### ✅ 5. Configurar Domínio Customizado (Opcional)

Se você tem um domínio no Registro.br, siga o guia completo em `GUIA-CONFIGURACAO.md`.

**Resumo**:
- Frontend: `seudominio.com.br` → Vercel
- Backend: `api.seudominio.com.br` → Render

---

## 🧪 Testar Tudo

### 1. Testar Database

```bash
# Conectar ao database
psql "postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo"

# Verificar tabelas
\dt

# Ver estrutura da tabela leads
\d leads

# Sair
\q
```

### 2. Testar Backend

```bash
# Testar criação de lead
curl -X POST https://lucroo-backend.onrender.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","name":"Teste Usuario"}'

# Deve retornar algo como:
# {"id":1,"email":"teste@example.com","name":"Teste Usuario","createdAt":"2026-01-31T..."}
```

### 3. Testar Frontend

1. Abrir `https://lucroo.vercel.app` no navegador
2. Testar o formulário de captura de leads
3. Abrir DevTools (F12) → Network tab
4. Submeter o formulário
5. Verificar:
   - Request vai para `https://lucroo-backend.onrender.com/api/leads`
   - Status 201 (Created)
   - Response com os dados do lead

---

## 🐛 Troubleshooting Rápido

### Erro: CORS no Frontend

**Sintoma**: Console mostra erro `blocked by CORS policy`

**Solução**:
1. Verificar `FRONTEND_URL` no Render (deve ser `https://lucroo.vercel.app`)
2. Fazer redeploy do backend
3. Limpar cache do navegador

### Erro: 404 Not Found no Backend

**Sintoma**: Todas as chamadas retornam 404

**Solução**:
1. Verificar se o backend está rodando no Render
2. Verificar URL da API no Vercel: `VITE_API_URL`
3. Testar endpoint direto com curl

### Erro: Database Connection Failed

**Sintoma**: Backend retorna erro 500

**Solução**:
1. Verificar `DATABASE_URL` no Render
2. Usar **Internal Database URL** se ambos estão na mesma região
3. Verificar se o database está ativo

### Erro: Build Failed na Vercel

**Sintoma**: Deploy falha durante build

**Solução**:
1. Verificar logs de build na Vercel
2. Testar localmente: `npm run build`
3. Verificar se todas as dependências estão em `package.json`
4. Limpar cache e fazer redeploy

---

## 📊 URLs Finais

Após completar todos os passos:

| Serviço | URL | Status |
|---------|-----|--------|
| **Frontend** | https://lucroo.vercel.app | ✅ |
| **Backend** | https://lucroo-backend.onrender.com | ✅ |
| **Database** | dpg-...ohio-postgres.render.com | ✅ |

---

## 🎯 Próximos Passos

1. ✅ Testar fluxo completo de captura de leads
2. ✅ Configurar domínio customizado (se tiver)
3. ✅ Configurar Analytics (Google Analytics, etc.)
4. ✅ Configurar monitoramento de erros (Sentry)
5. ✅ Adicionar página de obrigado após captura
6. ✅ Integrar com ferramenta de email marketing

---

**Problemas?** Consulte o `GUIA-CONFIGURACAO.md` completo!
