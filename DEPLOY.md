# 🚀 Guia Completo de Deploy - Cloudflare Pages + Supabase

## 📋 Pré-requisitos

- ✅ Código no GitHub
- ✅ Conta no Cloudflare (gratuita)
- ✅ Conta no Supabase (gratuita)

---

## PARTE 1: Configurar Banco de Dados no Supabase

### 1️⃣ Criar Projeto no Supabase

1. Acesse: [supabase.com](https://supabase.com)
2. Clique em **"Start your project"** → **"New Project"**
3. Preencha:
   - **Name**: `lucrocelular` (ou outro nome)
   - **Database Password**: Crie uma senha forte (GUARDE!)
   - **Region**: `South America (São Paulo)` (mais próximo do Brasil)
4. Clique em **"Create new project"** (aguarde 2-3 minutos)

### 2️⃣ Obter Connection String

1. No projeto criado, vá em **Settings** (⚙️) → **Database**
2. Role até **"Connection string"**
3. Selecione **"URI"** e ative **"Display connection pooling string"**
4. Copie a string que parece com:
   ```
   postgresql://postgres.[PROJECT-ID]:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```
5. **Substitua** `[YOUR-PASSWORD]` pela senha que você criou no passo 1

### 3️⃣ Executar Migrações Localmente

No seu computador, **ANTES** de fazer deploy:

```bash
# 1. Edite o .env local com a URL do Supabase
# Substitua a linha DATABASE_URL com a URL copiada acima

# 2. Execute as migrações para criar as tabelas no Supabase
npm run db:push

# ✅ Você deve ver: "No changes detected" ou "Tables created successfully"
```

**⚠️ IMPORTANTE:** Execute isso ANTES de fazer deploy no Cloudflare!

---

## PARTE 2: Deploy no Cloudflare Pages

### 1️⃣ Fazer Push do Código para GitHub

```bash
# Certifique-se de que todas as mudanças estão commitadas
git status

# Se houver mudanças, commit:
git add .
git commit -m "Prepare for Cloudflare deployment"

# Push para o GitHub
git push origin main
```

### 2️⃣ Conectar Cloudflare ao GitHub

1. Acesse: [dash.cloudflare.com](https://dash.cloudflare.com)
2. Faça login ou crie conta (gratuita)
3. No menu lateral, clique em **"Workers & Pages"**
4. Clique em **"Create application"** → **"Pages"** → **"Connect to Git"**
5. Clique em **"Connect GitHub"**
6. Autorize o Cloudflare a acessar seus repositórios
7. Selecione o repositório **`lucrocel`**

### 3️⃣ Configurar Build Settings

Na tela de configuração, preencha:

| Campo | Valor |
|-------|-------|
| **Project name** | `lucrocelular` (ou qualquer nome) |
| **Production branch** | `main` |
| **Framework preset** | `None` (deixe em branco) |
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `dist/public` |

### 4️⃣ Configurar Variáveis de Ambiente

**MUITO IMPORTANTE!** Role para baixo até **"Environment variables"**:

Clique em **"Add variable"** e adicione:

| Variable name | Value | Production? |
|---------------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres.[ID]:[PASS]@...` | ✅ Sim |
| `NODE_ENV` | `production` | ✅ Sim |

**⚠️ Cole a mesma URL do Supabase que você usou no passo 1.3**

### 5️⃣ Fazer Deploy

1. Clique em **"Save and Deploy"**
2. Aguarde 2-5 minutos (acompanhe o log de build)
3. ✅ Quando aparecer **"Success"**, seu site está no ar!

**Sua URL será**: `https://lucrocelular.pages.dev` (ou o nome que você escolheu)

---

## PARTE 3: Backend API (Railway - Recomendado)

O Cloudflare Pages serve **apenas o frontend estático**. Para o backend funcionar, você precisa hospedá-lo separadamente.

### Opção A: Railway (RECOMENDADO)

1. Acesse: [railway.app](https://railway.app)
2. Clique em **"Start a New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Autorize e selecione seu repositório `lucrocel`
5. Configure:
   - **Root Directory**: `/` (padrão)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Clique em **"Add Variables"** e adicione:
   ```
   DATABASE_URL=postgresql://... (mesma do Supabase)
   NODE_ENV=production
   PORT=5000
   ```
7. Clique em **"Deploy"**

**Copie a URL gerada** (ex: `https://lucrocel-production.up.railway.app`)

### Opção B: Render.com

1. Acesse: [render.com](https://render.com)
2. New → **Web Service**
3. Connect GitHub → Selecione `lucrocel`
4. Configure:
   - **Name**: `lucrocel-api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Adicione `DATABASE_URL` e `NODE_ENV`
5. Clique em **"Create Web Service"**

---

## PARTE 4: Conectar Frontend ao Backend

Agora você precisa fazer o frontend (Cloudflare) chamar o backend (Railway/Render).

### 1️⃣ Atualizar URLs da API

Edite o arquivo `client/src/lib/api.ts` (ou onde estão as chamadas de API):

```typescript
// ANTES (desenvolvimento)
const API_URL = 'http://localhost:5000'

// DEPOIS (produção)
const API_URL = import.meta.env.PROD
  ? 'https://lucrocel-production.up.railway.app'  // ← Cole sua URL do Railway aqui
  : 'http://localhost:5000'
```

### 2️⃣ Commit e Push

```bash
git add .
git commit -m "Configure production API URL"
git push origin main
```

O Cloudflare vai **automaticamente** fazer redeploy quando detectar o push!

---

## 🎯 RESUMO FINAL

### ✅ O que você tem agora:

1. **Banco de Dados**: Supabase (PostgreSQL na nuvem)
2. **Frontend**: Cloudflare Pages (`https://lucrocelular.pages.dev`)
3. **Backend API**: Railway (`https://lucrocel-production.up.railway.app`)

### 🔄 Fluxo de Funcionamento:

```
Usuário → Frontend (Cloudflare Pages) → Backend API (Railway) → Banco (Supabase)
```

---

## 🧪 Testar o Deploy

1. Acesse sua URL do Cloudflare: `https://lucrocelular.pages.dev`
2. Clique em **"Quero Aprender"**
3. Preencha o formulário e envie
4. Verifique os dados no Supabase:
   - Vá em **Table Editor** → Selecione `leads`
   - Você deve ver os dados salvos!

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch" ao enviar formulário

**Problema**: Frontend não consegue falar com Backend

**Solução**:
1. Verifique se a URL da API está correta no código
2. Certifique-se que o backend está rodando (acesse a URL do Railway)
3. Verifique se não há erro de CORS no backend

### Erro: "Database connection failed"

**Problema**: Banco de dados não conecta

**Solução**:
1. Verifique se a `DATABASE_URL` está correta nas variáveis de ambiente
2. Confirme que executou `npm run db:push` localmente
3. Teste a conexão no Supabase (Settings → Database → Connection)

### Build falha no Cloudflare

**Problema**: Erro durante o build

**Solução**:
1. Veja o log completo no Cloudflare Pages
2. Teste o build localmente: `npm run build`
3. Certifique-se que `dist/public` existe após o build

---

## 🔐 Segurança

### ⚠️ NUNCA COMMITE:
- ❌ Arquivos `.env`
- ❌ Senhas do banco de dados
- ❌ API keys

### ✅ SEMPRE USE:
- ✅ Variáveis de ambiente nas plataformas (Cloudflare/Railway)
- ✅ `.gitignore` atualizado
- ✅ Senhas fortes para banco de dados

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no Cloudflare Pages
2. Verifique os logs no Railway/Render
3. Consulte a documentação oficial:
   - [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
   - [Supabase Docs](https://supabase.com/docs)
   - [Railway Docs](https://docs.railway.app)

---

## 🎉 Pronto!

Seu projeto está no ar! Agora você pode:
- Compartilhar a URL com clientes
- Configurar domínio personalizado no Cloudflare
- Monitorar acessos e conversões
- Iterar e melhorar continuamente

**Boas vendas!** 🚀
