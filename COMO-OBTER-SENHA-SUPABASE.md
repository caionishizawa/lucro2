# 🔑 Como Obter a Senha do Database no Supabase

## Método Rápido (Recomendado)

### Passo 1: Acessar o Dashboard

Abrir no navegador:
```
https://supabase.com/dashboard/project/twcmndhbramzhlmpaapz/settings/database
```

### Passo 2: Encontrar a Connection String

1. Você verá a seção **"Connection string"**
2. Procure por **"URI"** ou **"Connection string"**
3. Clique no botão **"Show connection string"** ou no ícone do olho 👁️
4. Você verá algo assim:

```
postgresql://postgres:SUA_SENHA_AQUI@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres
```

A senha está entre `postgres:` e `@db.twcmndhbramzhlmpaapz`

### Passo 3: Copiar a Senha

Copie **apenas a senha** (a parte entre `:` e `@`).

---

## Método Alternativo (Se não conseguir pela Connection String)

### Opção A: Ver no Terminal do Supabase

1. No dashboard, ir em **"Settings"** → **"Database"**
2. Rolar até **"Database password"**
3. Clicar em **"Show password"** ou **"Reset password"**

**Atenção**: Se resetar a senha, você precisará atualizar em todos os lugares onde está usando!

### Opção B: Usar o Supabase CLI

Se você tem o Supabase CLI instalado:

```bash
# Fazer login
supabase login

# Obter detalhes do projeto
supabase projects list

# Ver connection string
supabase db show twcmndhbramzhlmpaapz
```

---

## ✅ Depois de Obter a Senha

### 1. Testar a Conexão

```bash
# Testar conexão (substitua [SUA-SENHA] pela senha real)
psql "postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres" -c "SELECT version();"
```

Se conectar com sucesso, você verá a versão do PostgreSQL.

### 2. Executar Migrations

```bash
# No diretório do projeto
export DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"
npm run db:push
```

### 3. Verificar se a Tabela foi Criada

```bash
# Conectar ao database
psql "postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"

# Listar tabelas
\dt

# Ver estrutura da tabela leads
\d leads

# Sair
\q
```

---

## 🔐 Guardar a Senha com Segurança

### Criar arquivo .env.production (local)

```bash
# No diretório do projeto
cat > .env.production.local << EOF
# Supabase Database (Direct Connection - para migrations)
DATABASE_URL=postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres

# Supabase Database (Pooled Connection - para produção)
DATABASE_URL_POOLED=postgresql://postgres.twcmndhbramzhlmpaapz:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

NODE_ENV=production
PORT=5000
FRONTEND_URL=https://lucroo.vercel.app
EOF
```

**Importante**: Adicione `.env.production.local` ao `.gitignore` para não commitar senhas!

### Verificar .gitignore

```bash
# Ver se .env.production.local está no .gitignore
cat .gitignore | grep .env

# Se não estiver, adicionar
echo ".env.production.local" >> .gitignore
```

---

## 📋 Resumo dos Formatos de URL

### Para Migrations (Direct - Porta 5432)
```
postgresql://postgres:[SUA-SENHA]@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres
```

### Para Render Backend (Pooled - Porta 6543)
```
postgresql://postgres.twcmndhbramzhlmpaapz:[SUA-SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Diferenças:
| Campo | Direct (5432) | Pooled (6543) |
|-------|---------------|---------------|
| **User** | `postgres` | `postgres.twcmndhbramzhlmpaapz` |
| **Host** | `db.twcmndhbramzhlmpaapz.supabase.co` | `aws-0-us-east-1.pooler.supabase.com` |
| **Port** | `5432` | `6543` |
| **Database** | `postgres` | `postgres` |

---

## ❓ Problemas Comuns

### "Password authentication failed"

**Causa**: Senha incorreta ou formato da URL errado

**Soluções**:
1. Verificar se copiou a senha completa (sem espaços)
2. Verificar se a URL está correta
3. Tentar resetar a senha no dashboard

### "Connection timeout"

**Causa**: Firewall ou região incorreta

**Soluções**:
1. Verificar se sua conexão de internet permite PostgreSQL (porta 5432)
2. Tentar de outra rede
3. Verificar se o projeto Supabase está ativo

### "Database does not exist"

**Causa**: URL apontando para database inexistente

**Solução**: Sempre use `postgres` como nome do database no Supabase

---

## 🎯 Próximo Passo

Depois de executar as migrations com sucesso:
1. ✅ Configurar backend no Render
2. ✅ Deploy frontend na Vercel
3. ✅ Testar o fluxo completo

Consulte `INICIO-RAPIDO.md` para continuar!
