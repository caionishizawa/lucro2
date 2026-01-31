# Guia Completo de Configuração - Lucroo

Este guia fornece o passo a passo completo para configurar o backend, frontend e database do projeto usando **Vercel** (frontend) e **Render** (backend + database).

## 📋 Índice

1. [Configuração Local (Desenvolvimento)](#configuração-local-desenvolvimento)
2. [Configuração do Database (Produção - Render)](#configuração-do-database-produção)
3. [Configuração do Backend (Produção - Render)](#configuração-do-backend-produção)
4. [Configuração do Frontend (Produção - Vercel)](#configuração-do-frontend-produção)
5. [Configurar Domínio Customizado (Registro.br)](#configurar-domínio-customizado-registrobr)
6. [Troubleshooting](#troubleshooting)

## 🌐 Stack de Produção

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render Web Service (Node.js + Express)
- **Database**: Render PostgreSQL
- **Domínio**: Registro.br

---

## 🖥️ Configuração Local (Desenvolvimento)

### Pré-requisitos

- **Node.js** 18+ instalado
- **PostgreSQL** 14+ instalado (ou Docker)
- **Git** instalado

### Passo 1: Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd lucroo
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar o Database Local

#### Opção A: PostgreSQL Instalado Localmente

1. Criar o database:
```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar database
CREATE DATABASE mobile_profit_guide;

# Sair
\q
```

2. Anotar a URL de conexão:
```
postgresql://postgres:SUA_SENHA@localhost:5432/mobile_profit_guide
```

#### Opção B: PostgreSQL via Docker

```bash
docker run --name lucroo-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mobile_profit_guide \
  -p 5432:5432 \
  -d postgres:14
```

URL de conexão:
```
postgresql://postgres:postgres@localhost:5432/mobile_profit_guide
```

### Passo 4: Configurar Variáveis de Ambiente

1. Copiar o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Editar o arquivo `.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_profit_guide
PORT=5000
NODE_ENV=development
```

### Passo 5: Executar Migrations do Database

```bash
npm run db:push
```

Este comando cria a tabela `leads` no database.

### Passo 6: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:5000**

### Passo 7: Verificar o Funcionamento

1. Abrir o navegador em `http://localhost:5000`
2. Testar o formulário de captura de leads
3. Verificar se os dados são salvos no database

---

## 🗄️ Configuração do Database (Produção)

### Usando Render PostgreSQL

#### Passo 1: Criar Database no Render

1. Acessar [https://dashboard.render.com](https://dashboard.render.com)
2. Fazer login ou criar conta (pode usar GitHub)
3. Clicar em **"New +"** → **"PostgreSQL"**

#### Passo 2: Configurar o Database

Preencher os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `lucroo-db` |
| **Database** | `lucroo` |
| **User** | `lucroo_user` (gerado automaticamente) |
| **Region** | Escolher a região mais próxima (ex: Ohio, USA) |
| **PostgreSQL Version** | 14 ou superior |
| **Plan** | Free (para testes) ou Starter ($7/mês para produção) |

3. Clicar em **"Create Database"**

#### Passo 3: Obter as Credenciais

Após a criação, você verá as informações de conexão:

- **Internal Database URL**: Para uso dentro do Render (mesma região)
- **External Database URL**: Para uso fora do Render

**Copiar a External Database URL** que terá este formato:
```
postgres://lucroo_user:senha@dpg-xxxxx.ohio-postgres.render.com/lucroo
```

#### Passo 4: Executar Migrations

**Localmente** (Recomendado):

1. Criar arquivo `.env.production`:
```bash
cp .env.example .env.production
```

2. Adicionar a URL do database:
```env
DATABASE_URL=postgres://lucroo_user:senha@dpg-xxxxx.ohio-postgres.render.com/lucroo
NODE_ENV=production
```

3. Executar migrations:
```bash
# Usando o arquivo .env.production
export $(cat .env.production | xargs) && npm run db:push
```

**Ou via Render Shell** (após criar o backend):
1. Ir em **"Shell"** no dashboard do web service
2. Executar: `npm run db:push`

---

## 🚀 Configuração do Backend (Produção)

### Usando Render Web Service

#### Passo 1: Criar Web Service no Render

1. No dashboard do Render, clicar em **"New +"** → **"Web Service"**
2. Conectar seu repositório GitHub/GitLab
3. Selecionar o repositório `lucroo`

#### Passo 2: Configurar o Web Service

Preencher os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `lucroo-backend` |
| **Region** | Mesma região do database (Ohio) |
| **Branch** | `main` ou `master` |
| **Root Directory** | `.` (raiz do projeto) |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free (para testes) ou Starter ($7/mês) |

#### Passo 3: Configurar Variáveis de Ambiente

Na seção **"Environment"**, adicionar:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgres://lucroo_user:senha@dpg-xxxxx.ohio-postgres.render.com/lucroo` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://seudominio.com.br` (configurar depois) |

**Dica**: Use a **Internal Database URL** se o backend e database estão na mesma região (mais rápido e sem cobrança de dados).

#### Passo 4: Deploy

1. Clicar em **"Create Web Service"**
2. O Render fará o build e deploy automaticamente
3. Aguardar o deploy finalizar (5-10 minutos)

#### Passo 5: Verificar a URL do Backend

Após o deploy, você terá uma URL como:
```
https://lucroo-backend.onrender.com
```

#### Passo 6: Testar o Backend

```bash
# Testar criação de lead
curl -X POST https://lucroo-backend.onrender.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","name":"Teste"}'
```

---

## 🌐 Configuração do Frontend (Produção)

### Usando Vercel

#### Passo 1: Preparar o Projeto

Antes de fazer deploy, precisamos configurar a URL da API.

**Opção A: Usar variável de ambiente (Recomendado)**

Certifique-se que seu código usa `import.meta.env.VITE_API_URL` para a URL da API.

**Opção B: Configurar no código**

Se necessário, você pode criar um arquivo de configuração separado.

#### Passo 2: Fazer Deploy no Vercel

##### Via Dashboard (Mais Fácil)

1. Acessar [https://vercel.com](https://vercel.com)
2. Fazer login com GitHub
3. Clicar em **"Add New..."** → **"Project"**
4. Importar o repositório `lucroo`
5. Configurar o projeto:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist/public` |

6. Adicionar variáveis de ambiente:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://lucroo-backend.onrender.com` |
| `NODE_ENV` | `production` |

7. Clicar em **"Deploy"**

##### Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Seguir as instruções:
# - Set up and deploy? Yes
# - Which scope? (selecionar sua conta)
# - Link to existing project? No
# - What's your project's name? lucroo
# - In which directory is your code located? ./
# - Want to override the settings? Yes
#   - Build Command: npm run build
#   - Output Directory: dist/public
#   - Development Command: npm run dev
```

#### Passo 3: Configurar Variáveis de Ambiente no Vercel

Se não configurou durante o deploy:

1. Ir no projeto no [dashboard da Vercel](https://vercel.com/dashboard)
2. Clicar em **"Settings"** → **"Environment Variables"**
3. Adicionar:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://lucroo-backend.onrender.com` | Production, Preview, Development |

4. Fazer **redeploy** do projeto para aplicar as variáveis

#### Passo 4: Verificar Deploy

Após o deploy, você terá uma URL como:
```
https://lucroo.vercel.app
```

Acessar a URL e testar:
1. Site carrega corretamente
2. Formulário de leads funciona
3. Verificar no Network tab se as chamadas vão para a URL correta da API

---

## 🔧 Configurar Domínio Customizado (Registro.br)

### Estrutura Recomendada

- `seudominio.com.br` ou `www.seudominio.com.br` → Frontend (Vercel)
- `api.seudominio.com.br` → Backend (Render)

---

### Passo 1: Configurar Backend no Render (api.seudominio.com.br)

#### 1.1. No Render

1. Ir no seu Web Service `lucroo-backend`
2. Clicar em **"Settings"** → **"Custom Domain"**
3. Adicionar: `api.seudominio.com.br`
4. Render mostrará os registros DNS necessários:

```
Tipo: CNAME
Nome: api
Valor: lucroo-backend.onrender.com
```

#### 1.2. No Registro.br

1. Acessar [https://registro.br](https://registro.br)
2. Fazer login na sua conta
3. Ir em **"Meus Domínios"** → selecionar seu domínio
4. Ir em **"DNS"** → **"Editar Zona"**
5. Adicionar novo registro:

| Tipo | Nome | Dados | TTL |
|------|------|-------|-----|
| **CNAME** | `api` | `lucroo-backend.onrender.com` | 3600 |

6. Clicar em **"Salvar"**

**Importante**: A propagação DNS pode levar de 5 minutos a 48 horas (geralmente 1-2 horas).

---

### Passo 2: Configurar Frontend no Vercel (seudominio.com.br)

#### 2.1. No Vercel

1. Ir no seu projeto no [dashboard da Vercel](https://vercel.com/dashboard)
2. Ir em **"Settings"** → **"Domains"**
3. Adicionar domínio: `seudominio.com.br`
4. Vercel mostrará os registros DNS necessários

**Para domínio raiz** (`seudominio.com.br`):
```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

**Para www** (`www.seudominio.com.br`):
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

#### 2.2. No Registro.br

1. Ir em **"DNS"** → **"Editar Zona"**
2. Adicionar os registros:

| Tipo | Nome | Dados | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

3. Salvar alterações

**Nota**: Os IPs da Vercel podem mudar. Sempre verificar a documentação mais recente em [vercel.com/docs/concepts/projects/custom-domains](https://vercel.com/docs/concepts/projects/custom-domains).

---

### Passo 3: Atualizar Variáveis de Ambiente

#### 3.1. Backend (Render)

Atualizar a variável `FRONTEND_URL`:

1. Ir em **"Environment"** no Render
2. Editar `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://seudominio.com.br
   ```
3. Salvar e aguardar redeploy automático

#### 3.2. Frontend (Vercel)

Atualizar a variável `VITE_API_URL`:

1. Ir em **"Settings"** → **"Environment Variables"** na Vercel
2. Editar `VITE_API_URL`:
   ```
   VITE_API_URL=https://api.seudominio.com.br
   ```
3. Ir em **"Deployments"** → selecionar o último deploy → **"Redeploy"**

---

### Passo 4: Verificar Configuração

#### 4.1. Testar DNS

```bash
# Testar se o domínio principal resolve
dig seudominio.com.br
dig www.seudominio.com.br

# Testar se a API resolve
dig api.seudominio.com.br
```

Ou use ferramentas online:
- [DNSChecker.org](https://dnschecker.org)
- [WhatsMyDNS.net](https://whatsmydns.net)

#### 4.2. Testar SSL

```bash
# Verificar certificado SSL
curl -I https://seudominio.com.br
curl -I https://api.seudominio.com.br
```

#### 4.3. Testar Funcionamento Completo

1. Acessar `https://seudominio.com.br` no navegador
2. Verificar se o site carrega corretamente
3. Testar o formulário de captura de leads
4. Abrir o **DevTools** (F12) → **Network** tab
5. Verificar se as chamadas de API vão para `https://api.seudominio.com.br`

---

### Resumo da Configuração DNS

**Registros DNS no Registro.br**:

| Tipo | Nome | Valor | Descrição |
|------|------|-------|-----------|
| **A** | `@` | `76.76.21.21` | Site principal (Vercel) |
| **CNAME** | `www` | `cname.vercel-dns.com` | Alias www (Vercel) |
| **CNAME** | `api` | `lucroo-backend.onrender.com` | API do backend (Render) |

**Variáveis de Ambiente**:

| Serviço | Variável | Valor |
|---------|----------|-------|
| Render (Backend) | `DATABASE_URL` | (URL do Render PostgreSQL) |
| Render (Backend) | `FRONTEND_URL` | `https://seudominio.com.br` |
| Render (Backend) | `NODE_ENV` | `production` |
| Render (Backend) | `PORT` | `5000` |
| Vercel (Frontend) | `VITE_API_URL` | `https://api.seudominio.com.br` |

**URLs Finais**:
- Frontend: `https://seudominio.com.br` ou `https://www.seudominio.com.br`
- Backend API: `https://api.seudominio.com.br`
- Exemplo de chamada: `https://api.seudominio.com.br/api/leads`

---

## 🐛 Troubleshooting

### Database

**Problema: Backend não conecta ao Database**

**Sintomas**: Erro `connect ECONNREFUSED` ou `password authentication failed`

**Soluções**:
1. Verificar se a `DATABASE_URL` está correta no Render
2. Usar **Internal Database URL** se backend e DB estão na mesma região
3. Verificar se o database está ativo no Render
4. Testar conexão manualmente:
```bash
psql "postgres://lucroo_user:senha@dpg-xxxxx.ohio-postgres.render.com/lucroo"
```

---

### Frontend / API

**Problema: Frontend não consegue fazer requests ao Backend**

**Sintomas**: Erro CORS ou network error

**Soluções**:
1. Verificar se `VITE_API_URL` está configurado corretamente na Vercel
2. Verificar CORS no backend (origins permitidas) em `server/index.ts`
3. Verificar se `FRONTEND_URL` está configurado no Render
4. Verificar se backend está respondendo:
```bash
curl https://api.seudominio.com.br/api/leads
```
5. Abrir DevTools → Network tab e verificar qual erro específico está ocorrendo

---

### Build

**Problema: Build falha no Render ou Vercel**

**Sintomas**: Build error durante deploy

**Soluções**:
1. Verificar logs de build na plataforma
2. Testar build localmente:
```bash
npm run build
```
3. Verificar se todas as dependências estão em `package.json`
4. No Render: limpar cache em **Settings** → **"Clear build cache"**
5. Na Vercel: ir em Deployment → **"Redeploy"** com cache limpo

---

### Aplicação Lenta (Render Free Tier)

**Sintomas**: Primeira request demora 30+ segundos

**Explicação**: Render Free tier coloca serviços inativos em sleep após 15 minutos

**Soluções**:
1. Upgrade para Starter tier ($7/mês) - elimina o sleep
2. Usar serviço de ping externo (ex: UptimeRobot, Cron-job.org)
3. Aceitar o cold start em ambientes de teste

---

### DNS

**Problema: "Site não carrega" ou "ERR_NAME_NOT_RESOLVED"**

**Soluções**:
1. Aguardar propagação DNS (até 48h, geralmente 1-2h)
2. Limpar cache DNS local:
   ```bash
   # Windows
   ipconfig /flushdns

   # macOS
   sudo dscacheutil -flushcache

   # Linux
   sudo systemd-resolve --flush-caches
   ```
3. Verificar registros DNS no Registro.br
4. Usar ferramenta de verificação DNS: https://dnschecker.org

---

### SSL

**Problema: "SSL Certificate Error" ou "Not Secure"**

**Soluções**:
1. Aguardar provisionamento do SSL (5-30 minutos)
2. Na Vercel: SSL é automático após adicionar domínio
3. No Render: verificar se domínio customizado está ativo em Settings
4. Forçar renovação de SSL nas configurações da plataforma

---

### CORS

**Problema: "CORS Error" ao fazer requests da API**

**Sintomas**:
```
Access to fetch at 'https://api.seudominio.com.br/api/leads' from origin 'https://seudominio.com.br'
has been blocked by CORS policy
```

**Soluções**:
1. Verificar se `FRONTEND_URL` está configurado corretamente no Render
2. Verificar configuração de CORS no `server/index.ts`:
   ```typescript
   const allowedOrigins = [
     process.env.FRONTEND_URL, // deve ser https://seudominio.com.br
     "http://localhost:5000",
     "http://localhost:3000",
   ].filter(Boolean) as string[];
   ```
3. Garantir que está usando `https://` (não `http://`)
4. Verificar no Network tab do navegador qual origem está sendo bloqueada
5. Fazer redeploy do backend após alterar `FRONTEND_URL`

---

### Migrations não aplicadas

**Problema: Tabela `leads` não existe**

**Sintomas**: Erro `relation "leads" does not exist`

**Soluções**:
1. Executar migrations via Render Shell:
   - Ir no Web Service → **"Shell"**
   - Executar: `npm run db:push`

2. Ou executar localmente apontando para o database de produção:
   ```bash
   export DATABASE_URL="postgres://lucroo_user:senha@dpg-xxxxx.ohio-postgres.render.com/lucroo"
   npm run db:push
   ```

---

## 📊 Custos Estimados

### Vercel (Frontend)

| Recurso | Hobby (Free) | Pro ($20/mês) |
|---------|--------------|---------------|
| **Builds** | 6000 min/mês | Ilimitado |
| **Bandwidth** | 100GB/mês | 1TB/mês |
| **Serverless Functions** | 100GB-Hrs | 1000GB-Hrs |
| **Domains** | Ilimitado | Ilimitado |
| **SSL** | Automático | Automático |

**Recomendação**: Hobby (Free) é suficiente para a maioria dos projetos

---

### Render

| Serviço | Free Tier | Paid Tier | Recomendação |
|---------|-----------|-----------|--------------|
| **PostgreSQL** | ✅ 90 dias | $7/mês (Starter) | Paid para produção |
| **Web Service** | ✅ Com spin down | $7/mês (Starter) | Paid para produção |

**Limitações do Free Tier**:
- Web Services entram em sleep após 15 min de inatividade
- Database gratuito por 90 dias
- 750 horas/mês de runtime

**Total mínimo para produção estável**: $14/mês (Database + Web Service no Starter)

---

### Comparação com Railway

| Plataforma | Custo Mensal | Vantagens | Desvantagens |
|------------|--------------|-----------|--------------|
| **Vercel + Render** | $0-14/mês | Vercel grátis, Render estável | Render free tier tem spin down |
| **Railway** | $0-5/mês | Simples, $5 de crédito grátis | Pode ter problemas de estabilidade |

**Recomendação atual**: **Vercel (Frontend) + Render (Backend/DB)**
- Vercel: Grátis e extremamente rápido
- Render: Mais estável que Railway, free tier sem cartão
- Total: $0 para testes, $14/mês para produção

---

## 🎯 Próximos Passos

Após configurar tudo:

1. ✅ Testar fluxo completo de captura de leads
2. ✅ Configurar domínio customizado (Registro.br)
3. ✅ Configurar analytics (Google Analytics, Plausible, etc.)
4. ✅ Configurar monitoramento de erros (Sentry)
5. ✅ Configurar backups regulares do database
6. ✅ Adicionar testes automatizados
7. ✅ Configurar CI/CD para deploys automáticos

---

## 📞 Suporte

- **Issues do Projeto**: [GitHub Issues](seu-repositorio/issues)
- **Documentação Vercel**: [https://vercel.com/docs](https://vercel.com/docs)
- **Documentação Render**: [https://render.com/docs](https://render.com/docs)
- **Drizzle ORM**: [https://orm.drizzle.team](https://orm.drizzle.team)

---

**Última atualização**: Janeiro 2026 - Stack: Vercel + Render
