# Setup com Supabase Database

## 🗄️ Configurar Database no Supabase

### Passo 1: Obter a Connection String

Você já tem a URL do Render PostgreSQL, mas se estiver usando **Supabase**:

1. Acessar [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecionar seu projeto
3. Ir em **Settings** → **Database**
4. Rolar até **Connection String**
5. Copiar a **Connection Pooling** URL (Transaction mode)

**Formato da URL Supabase**:
```
postgresql://postgres.[PROJECT_ID]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true
```

**Importante**: Para produção, use a URL com **connection pooling** (porta 6543 com pgBouncer).

---

### Passo 2: Executar Migrations

Como você já tem a DATABASE_URL do Render, vou usar ela para executar as migrations.

**No seu computador local**:

```bash
# 1. Definir a variável de ambiente
export DATABASE_URL="postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo"

# 2. Executar migrations
npm run db:push

# Você deve ver algo como:
# ✅ Pushing changes...
# ✅ Done!
```

**Se usar Supabase**, a variável seria:
```bash
export DATABASE_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
npm run db:push
```

---

### Passo 3: Verificar se as Tabelas foram Criadas

#### Opção A: Via psql (linha de comando)

```bash
# Conectar ao database
psql "postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo"

# Listar todas as tabelas
\dt

# Ver estrutura da tabela leads
\d leads

# Deve mostrar:
# Column     | Type      | Nullable | Default
# -----------+-----------+----------+-------------------
# id         | serial    | not null | nextval(...)
# email      | text      | not null |
# name       | text      |          |
# created_at | timestamp | not null | CURRENT_TIMESTAMP

# Sair
\q
```

#### Opção B: Via Supabase Dashboard (se usar Supabase)

1. Ir em **Table Editor** no Supabase
2. Verificar se a tabela `leads` aparece
3. Ver colunas: `id`, `email`, `name`, `created_at`

#### Opção C: Via Render Dashboard

1. Ir no Render Database dashboard
2. Clicar em **"Connect"** → **"External Connection"**
3. Abrir um client PostgreSQL (como TablePlus, pgAdmin, etc.)
4. Conectar e verificar a tabela `leads`

---

## 🚀 Configurar Backend com a Database URL

### No Render Web Service

Ao criar o backend no Render, configure as variáveis de ambiente:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://lucroo.vercel.app` (configurar depois) |

**Se usar Supabase**, use a connection pooling URL:
```
DATABASE_URL = postgresql://postgres.[PROJECT_ID]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true
```

---

## 🔧 Diferenças: Supabase vs Render PostgreSQL

| Feature | Supabase | Render PostgreSQL |
|---------|----------|-------------------|
| **Free Tier** | 500MB database, 2GB transfer | 90 dias grátis |
| **Connection Pooling** | pgBouncer integrado (porta 6543) | Não incluído no free tier |
| **Backups** | Daily backups (7 dias de retenção) | Apenas no paid tier |
| **Região** | Várias opções globais | Ohio, Oregon, Frankfurt, Singapore |
| **Extras** | Auth, Storage, Edge Functions | Apenas database |
| **Dashboard** | Table Editor, SQL Editor, Logs | Básico |

**Recomendação**:
- **Supabase**: Melhor para projetos que vão crescer (tem muitos extras)
- **Render**: Mais simples, bom para começar

---

## ⚠️ Importante: Connection Pooling

Se usar **Supabase** em produção:

**Para migrations** (create/alter table):
- Use a **direct connection** (porta 5432)
- URL: `postgresql://postgres.[PROJECT_ID]:[PASSWORD]@[HOST]:5432/postgres`

**Para o backend** (insert/select):
- Use a **pooled connection** (porta 6543 com pgBouncer)
- URL: `postgresql://postgres.[PROJECT_ID]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true`

No Render, você não precisa se preocupar com isso, pois não tem pgBouncer.

---

## 🧪 Testar Conexão

### Teste Rápido (psql)

```bash
# Testar conexão
psql "postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo" -c "SELECT version();"

# Deve retornar a versão do PostgreSQL
# PostgreSQL 16.x on x86_64-pc-linux-gnu...
```

### Teste Inserindo um Lead Manualmente

```bash
psql "postgresql://lucroo_user:t8LezGhSJskJO7bfMsVE6QORJK102y35@dpg-d5un3tchg0os73b1lgt0-a.ohio-postgres.render.com/lucroo"

# Inserir um lead de teste
INSERT INTO leads (email, name) VALUES ('teste@example.com', 'Teste');

# Ver todos os leads
SELECT * FROM leads;

# Deve mostrar:
# id | email              | name  | created_at
# ---|--------------------┼-------┼-------------
#  1 | teste@example.com  | Teste | 2026-01-31...

# Sair
\q
```

---

## 📝 Resumo de URLs

| Tipo | URL | Quando Usar |
|------|-----|-------------|
| **Render External** | `postgresql://lucroo_user:...@dpg-...ohio-postgres.render.com/lucroo` | Migrations locais, conexões externas |
| **Render Internal** | `postgresql://lucroo_user:...@dpg-...ohio-postgres.render.com/lucroo` (mesma, mas mais rápida dentro do Render) | Backend rodando no Render (mesma região) |
| **Supabase Direct** | `postgresql://postgres.[ID]:[PWD]@[HOST]:5432/postgres` | Migrations, operações DDL |
| **Supabase Pooled** | `postgresql://postgres.[ID]:[PWD]@[HOST]:6543/postgres?pgbouncer=true` | Backend em produção |

---

**Próximo Passo**: Ir para `INICIO-RAPIDO.md` para completar o deploy do Backend e Frontend!
