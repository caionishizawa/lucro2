# 🚀 Guia Completo: Deploy no Cloudflare

Este guia detalha todos os passos para fazer deploy da aplicação Mobile Profit Guide no Cloudflare.

## 📋 Índice

1. [Visão Geral das Opções](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Preparação do Projeto](#preparação)
4. [Configuração do Banco de Dados em Produção](#banco-de-dados)
5. [Opção A: Cloudflare Pages (Frontend) + Workers (Backend)](#opção-a)
6. [Opção B: Cloudflare Pages Full-Stack](#opção-b)
7. [Configuração de Variáveis de Ambiente](#variáveis)
8. [Deploy Step-by-Step](#deploy)
9. [Pós-Deploy e Monitoramento](#pós-deploy)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral das Opções {#visão-geral}

### Opção A: Híbrida (Recomendada)
- **Frontend (React)**: Cloudflare Pages
- **Backend (API)**: Cloudflare Workers (adaptado) ou Railway/Render

### Opção B: Full-Stack no Cloudflare
- **Frontend + Backend**: Cloudflare Pages com Functions
- Requer adaptação do Express para Cloudflare Workers

### Opção C: Alternativa Simples
- **Frontend**: Cloudflare Pages
- **Backend**: Railway, Render ou Fly.io (mais fácil para Express)

**Recomendação**: Opção A ou C (dependendo da complexidade do backend)

---

## ✅ Pré-requisitos {#pré-requisitos}

- [ ] Conta no Cloudflare (gratuita)
- [ ] Conta no GitHub/GitLab (para CI/CD)
- [ ] Banco de dados PostgreSQL em produção (Supabase, Neon, Railway, etc.)
- [ ] Node.js instalado localmente
- [ ] Git configurado

---

## 🔧 Preparação do Projeto {#preparação}

### 1. Verificar e Otimizar Build

Execute localmente para garantir que o build funciona:

```bash
npm run build
```

Verifique se a pasta `dist/` foi criada com:
- `dist/index.cjs` (servidor)
- `dist/public/` (frontend compilado)

### 2. Criar Arquivo `.gitignore` (se não existir)

Certifique-se de que contém:
```
node_modules/
dist/
.env
.env.local
.env.production
*.log
.DS_Store
```

### 3. Preparar Variáveis de Ambiente

Crie um arquivo `.env.production.example` com todas as variáveis necessárias:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
PORT=8787
```

### 4. Testar Build de Produção Localmente

```bash
# Build
npm run build

# Testar produção localmente
NODE_ENV=production node dist/index.cjs
```

---

## 🗄️ Configuração do Banco de Dados em Produção {#banco-de-dados}

### Opção 1: Supabase (Recomendado - Grátis)

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em **Settings > Database**
4. Copie a **Connection String** (URI)
5. Execute as migrações:

```bash
# Atualize DATABASE_URL no .env
DATABASE_URL=sua_connection_string_aqui

# Execute migrações
npm run db:push
```

### Opção 2: Neon (PostgreSQL Serverless)

1. Acesse [neon.tech](https://neon.tech)
2. Crie um projeto
3. Copie a connection string
4. Execute migrações

### Opção 3: Railway

1. Acesse [railway.app](https://railway.app)
2. Crie um novo projeto PostgreSQL
3. Copie a connection string
4. Execute migrações

---

## 🌐 Opção A: Cloudflare Pages + Workers {#opção-a}

### Passo 1: Preparar Frontend para Pages

O frontend já está configurado. Apenas verifique:

- ✅ Build output: `dist/public`
- ✅ Build command: `npm run build` (já cria o frontend)

### Passo 2: Adaptar Backend para Workers

**IMPORTANTE**: Cloudflare Workers não suporta Express completo. Você tem duas opções:

#### Opção A1: Usar Cloudflare Pages Functions

Crie `functions/api/leads.ts`:

```typescript
export async function onRequestPost(context: EventContext) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    // Sua lógica aqui usando env.DATABASE_URL
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

#### Opção A2: Deploy Backend Separado (Railway/Render)

Mantenha o Express como está e faça deploy em:
- **Railway**: [railway.app](https://railway.app) - Conecte GitHub e faça deploy
- **Render**: [render.com](https://render.com) - Similar ao Railway

---

## 📦 Opção B: Cloudflare Pages Full-Stack {#opção-b}

### Configurar `wrangler.toml`

Crie `wrangler.toml` na raiz:

```toml
name = "mobile-profit-guide"
compatibility_date = "2024-01-15"
pages_build_output_dir = "dist/public"

[env.production]
vars = { NODE_ENV = "production" }
```

### Usar Pages Functions

Crie a estrutura:
```
functions/
  api/
    leads.ts
```

---

## 🔐 Configuração de Variáveis de Ambiente {#variáveis}

### No Cloudflare Dashboard:

1. Acesse seu projeto no Cloudflare Pages
2. Vá em **Settings > Environment Variables**
3. Adicione:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `DATABASE_URL` | `postgresql://...` | Production |
| `NODE_ENV` | `production` | Production |
| `PORT` | `8787` | Production (se necessário) |

**⚠️ IMPORTANTE**: Nunca commite `.env` no Git!

---

## 🚀 Deploy Step-by-Step {#deploy}

### Método 1: Via Cloudflare Dashboard (Recomendado)

#### Passo 1: Preparar Repositório Git

```bash
# Certifique-se de que está tudo commitado
git add .
git commit -m "Preparar para deploy Cloudflare"
git push origin main
```

#### Passo 2: Conectar ao Cloudflare Pages

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Vá em **Pages > Create a project**
3. Clique em **Connect to Git**
4. Selecione seu repositório (GitHub/GitLab)
5. Autorize o Cloudflare

#### Passo 3: Configurar Build Settings

- **Project name**: `mobile-profit-guide`
- **Production branch**: `main`
- **Build command**: `npm install && npm run build`
- **Build output directory**: `dist/public`

#### Passo 4: Adicionar Variáveis de Ambiente

1. Na página de configuração, role até **Environment variables**
2. Adicione todas as variáveis necessárias
3. Marque como **Production** e **Preview**

#### Passo 5: Deploy

1. Clique em **Save and Deploy**
2. Aguarde o build (2-5 minutos)
3. Seu site estará em: `https://seu-projeto.pages.dev`

### Método 2: Via Wrangler CLI

#### Instalar Wrangler

```bash
npm install -g wrangler
wrangler login
```

#### Deploy

```bash
# Build primeiro
npm run build

# Deploy
wrangler pages deploy dist/public --project-name=mobile-profit-guide
```

---

## 📊 Pós-Deploy e Monitoramento {#pós-deploy}

### 1. Verificar Deploy

- Acesse a URL fornecida pelo Cloudflare
- Teste todas as rotas principais
- Teste o formulário de leads

### 2. Configurar Domínio Customizado (Opcional)

1. No Cloudflare Pages, vá em **Custom domains**
2. Adicione seu domínio
3. Siga as instruções de DNS

### 3. Monitoramento

- **Analytics**: Cloudflare Pages Analytics (automático)
- **Logs**: Cloudflare Dashboard > Pages > Seu projeto > Logs
- **Performance**: Cloudflare Speed Insights

### 4. Configurar CI/CD Automático

O Cloudflare Pages já faz deploy automático em cada push para `main`.

Para preview deployments:
- Push para outras branches cria previews automaticamente
- Acesse em: `https://seu-branch-seu-projeto.pages.dev`

---

## 🐛 Troubleshooting {#troubleshooting}

### Erro: "Build failed"

**Solução**:
- Verifique os logs de build no Cloudflare
- Teste `npm run build` localmente
- Certifique-se de que todas as dependências estão em `dependencies` (não `devDependencies`)

### Erro: "DATABASE_URL not found"

**Solução**:
- Verifique se adicionou a variável no Cloudflare Dashboard
- Certifique-se de que está marcada para **Production**
- Reinicie o deploy após adicionar variáveis

### Erro: "Cannot connect to database"

**Solução**:
- Verifique se o banco de dados permite conexões externas
- Teste a connection string localmente
- Verifique firewall/whitelist do banco

### Frontend carrega mas API não funciona

**Solução**:
- Se usando Pages Functions, verifique a estrutura de pastas
- Se usando backend separado, configure CORS
- Verifique os logs no Cloudflare

### Build muito lento

**Solução**:
- Use `.npmrc` para cache: `cache=~/.npm`
- Considere usar `npm ci` em vez de `npm install`
- Otimize dependências (remova não usadas)

---

## 📝 Checklist Final Antes do Deploy

- [ ] Build funciona localmente (`npm run build`)
- [ ] Testes passam
- [ ] Banco de dados em produção configurado
- [ ] Migrações executadas no banco remoto
- [ ] Variáveis de ambiente preparadas
- [ ] `.env` não está no Git
- [ ] Código commitado e pushado
- [ ] Domínio customizado configurado (se aplicável)
- [ ] SSL/HTTPS habilitado (automático no Cloudflare)
- [ ] Logs e monitoramento configurados

---

## 🔗 Links Úteis

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)

---

## 💡 Próximos Passos

Após o deploy bem-sucedido:

1. Configure analytics (Google Analytics, Cloudflare Analytics)
2. Configure CDN e cache
3. Configure rate limiting (se necessário)
4. Configure backups do banco de dados
5. Configure monitoramento de uptime

---

**Boa sorte com o deploy! 🚀**

Se encontrar problemas, consulte a seção [Troubleshooting](#troubleshooting) ou os logs do Cloudflare.

