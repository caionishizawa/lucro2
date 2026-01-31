# Supabase - Como Obter as Credenciais Corretas

## 📝 Informações do Seu Projeto

**Project URL**: https://twcmndhbramzhlmpaapz.supabase.co
**Project Ref**: `twcmndhbramzhlmpaapz`

---

## 🔑 Obter a Senha do Database PostgreSQL

As API Keys que você tem são para usar a API do Supabase, **não para conectar ao database PostgreSQL diretamente**.

### Passo 1: Ir no Dashboard do Supabase

1. Acessar: https://supabase.com/dashboard/project/twcmndhbramzhlmpaapz
2. Fazer login se necessário

### Passo 2: Obter a Database Password

1. No menu lateral, clicar em **"Settings"** (ícone de engrenagem)
2. Clicar em **"Database"**
3. Rolar até a seção **"Connection string"**
4. Você verá várias opções:

#### Opção A: URI (Recomendado)

Procure por **"URI"** e você verá algo como:

```
postgresql://postgres:[YOUR-PASSWORD]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres
```

A senha estará entre `postgres:` e `@db.twcmndhbramzhlmpaapz`

#### Opção B: Connection Pooling (Para Produção)

Procure por **"Connection Pooling"** → **"Transaction"** mode:

```
postgresql://postgres.twcmndhbramzhlmpaapz:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Copie a senha** que aparece entre `:` e `@`.

---

## 🗄️ URLs do Database

Depois de obter a senha, você terá:

### Para Migrations (Direct Connection - Porta 5432)

```bash
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"
```

### Para Backend em Produção (Pooled Connection - Porta 6543)

```bash
DATABASE_URL="postgresql://postgres.twcmndhbramzhlmpaapz:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Importante**:
- Use porta **5432** (direct) para migrations
- Use porta **6543** (pooled) para o backend em produção no Render

---

## 🚀 Executar Migrations

Depois de obter a senha:

```bash
# No terminal, no diretório do projeto
cd /caminho/para/lucroo

# Definir a variável de ambiente com a URL DIRECT (porta 5432)
export DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"

# Executar migrations
npm run db:push
```

**Resultado esperado**:
```
✅ Pushing schema to database...
✅ Done!
```

---

## 📋 Configurar no Render (Backend)

Quando for configurar o backend no Render, use a **Pooled Connection** (porta 6543):

**Environment Variables no Render**:

```
DATABASE_URL=postgresql://postgres.twcmndhbramzhlmpaapz:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://lucroo.vercel.app
```

**Por que usar pooled connection?**
- Melhor performance
- Evita limite de conexões simultâneas
- Recomendado pela Supabase para produção

---

## 🔐 API Keys do Supabase

Você já tem as API Keys, mas elas são para usar com o SDK do Supabase (Auth, Storage, etc.), não para conexão PostgreSQL direta:

### Anon Key (Public)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3Y21uZGhicmFtemhsbXBhYXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjA1MjEsImV4cCI6MjA4NTM5NjUyMX0.Vtc2SaDcfyj5JJmX0dl2I7YldB41A5x3sAFJ_peHzMQ
```
- Usar no frontend para Supabase Auth, Storage, etc.
- Pode ser exposta publicamente

### Service Role Key (Secret)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3Y21uZGhicmFtemhsbXBhYXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgyMDUyMSwiZXhwIjoyMDg1Mzk2NTIxfQ.4KNYPgb4NMoq8GCcSfvur8tMkxQInnjHUHX0fXsB8MM
```
- Usar apenas no backend (tem permissões admin)
- **NUNCA** expor no frontend

**Nota**: Como você está usando apenas PostgreSQL (não Auth ou Storage), essas keys não são necessárias para este projeto.

---

## 📊 Resumo

| Tipo | URL | Quando Usar |
|------|-----|-------------|
| **Direct Connection** | `postgresql://postgres:[PWD]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres` | Migrations, alterações de schema |
| **Pooled Connection** | `postgresql://postgres.twcmndhbramzhlmpaapz:[PWD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres` | Backend em produção (Render) |
| **Anon Key** | `eyJhbGci...peHzMQ` | Frontend (se usar Supabase Auth/Storage) |
| **Service Role** | `eyJhbGci...sB8MM` | Backend admin (se usar Supabase API) |

---

## 🎯 Próximos Passos

1. ✅ Obter a senha do database no Supabase Dashboard
2. ✅ Executar migrations com direct connection (porta 5432)
3. ✅ Configurar backend no Render com pooled connection (porta 6543)
4. ✅ Deploy do frontend na Vercel

**Precisa de ajuda?** Consulte `INICIO-RAPIDO.md` para o fluxo completo!
