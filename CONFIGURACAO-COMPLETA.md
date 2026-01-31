# ✅ Configuração Completa - Seu Projeto

Este guia contém TODAS as configurações específicas do seu projeto.

---

## 🗄️ 1. Database (Supabase)

**Project URL**: https://twcmndhbramzhlmpaapz.supabase.co

### Para Migrations (executar localmente)

```bash
# No seu computador
export DATABASE_URL="postgresql://postgres:enricamos2026%40@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"
npm run db:push
```

**Nota**: O `%40` é o caractere `@` URL encoded (necessário porque a senha tem `@`).

### Verificar se Migrations Funcionaram

```bash
# Conectar ao database
psql "postgresql://postgres:enricamos2026%40@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"

# Ver tabelas
\dt

# Ver estrutura da tabela leads
\d leads

# Sair
\q
```

---

## 🚀 2. Backend (Render)

**URL**: https://lucroo-backend.onrender.com

### Variáveis de Ambiente no Render

Ir em **Environment** no dashboard do Render e adicionar:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://postgres.twcmndhbramzhlmpaapz:enricamos2026%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://lucroo.vercel.app` |

**IMPORTANTE**:
- Use a URL com porta **6543** (pooled connection)
- O `%40` é necessário (representa o `@` na senha)

### Testar Backend

```bash
# Testar se está respondendo
curl https://lucroo-backend.onrender.com/api/leads

# Testar criação de lead
curl -X POST https://lucroo-backend.onrender.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","name":"Teste"}'
```

---

## 🌐 3. Frontend (Vercel)

**URL**: https://lucroo.vercel.app (ou o que a Vercel gerar)

### Configuração do Projeto

1. Deletar projeto antigo (se houver erro)
2. Criar novo projeto:
   - **Project Name**: `lucroo`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`

### Variáveis de Ambiente na Vercel

Ir em **Settings** → **Environment Variables**:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_API_URL` | `https://lucroo-backend.onrender.com` | Production, Preview, Development |

### Após Deploy

1. Anotar a URL final (ex: `https://lucroo.vercel.app`)
2. Atualizar `FRONTEND_URL` no Render para a URL da Vercel
3. Aguardar redeploy automático do Render
4. Testar o site

---

## 🔐 4. Resumo de URLs e Credenciais

### Database URLs

| Uso | URL |
|-----|-----|
| **Migrations** | `postgresql://postgres:enricamos2026%40@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres` |
| **Backend (Render)** | `postgresql://postgres.twcmndhbramzhlmpaapz:enricamos2026%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres` |

**Diferença**:
- Migrations: porta 5432 (direct)
- Backend: porta 6543 (pooled - mais eficiente)

### URLs dos Serviços

| Serviço | URL |
|---------|-----|
| **Supabase Dashboard** | https://twcmndhbramzhlmpaapz.supabase.co |
| **Backend (Render)** | https://lucroo-backend.onrender.com |
| **Frontend (Vercel)** | https://lucroo.vercel.app |

---

## 📋 Checklist de Deploy Completo

### Passo 1: Migrations ✅

```bash
export DATABASE_URL="postgresql://postgres:enricamos2026%40@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"
npm run db:push
```

### Passo 2: Verificar Tabela Criada ✅

```bash
psql "postgresql://postgres:enricamos2026%40@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres" -c "\d leads"
```

### Passo 3: Configurar Backend no Render ✅

- [ ] `DATABASE_URL` = pooled URL (porta 6543)
- [ ] `NODE_ENV` = production
- [ ] `PORT` = 5000
- [ ] `FRONTEND_URL` = https://lucroo.vercel.app
- [ ] Aguardar deploy
- [ ] Testar: `curl https://lucroo-backend.onrender.com/api/leads`

### Passo 4: Configurar Frontend na Vercel ✅

- [ ] Deletar projeto antigo (se houver)
- [ ] Criar novo projeto
- [ ] Nome: `lucroo`
- [ ] Build: `npm run build`
- [ ] Output: `dist/public`
- [ ] Variável: `VITE_API_URL` = https://lucroo-backend.onrender.com
- [ ] Deploy

### Passo 5: Atualizar CORS no Backend ✅

- [ ] Ir no Render → Environment
- [ ] Atualizar `FRONTEND_URL` para URL da Vercel
- [ ] Aguardar redeploy

### Passo 6: Testar Tudo ✅

- [ ] Abrir site da Vercel
- [ ] Testar formulário de leads
- [ ] Verificar Network tab (F12)
- [ ] Confirmar que API calls vão para Render
- [ ] Verificar se lead foi salvo no Supabase

---

## 🐛 Troubleshooting

### Backend não conecta ao Database

**Erro**: `password authentication failed`

**Solução**:
1. Verificar se usou `%40` no lugar de `@` na senha
2. Verificar se está usando porta 6543 (pooled)
3. Copiar a URL exata deste guia

### Frontend erro CORS

**Erro**: `blocked by CORS policy`

**Solução**:
1. Verificar `FRONTEND_URL` no Render
2. Deve ser exatamente a URL da Vercel
3. Aguardar redeploy do backend

### Build falha na Vercel

**Solução**: Consultar `VERCEL-DEPLOY-FIX.md`

---

## 🎯 URLs Finais

Após tudo configurado:

```
Frontend: https://lucroo.vercel.app
Backend:  https://lucroo-backend.onrender.com
Database: twcmndhbramzhlmpaapz.supabase.co

API Endpoint: https://lucroo-backend.onrender.com/api/leads
```

---

## 📞 Próximos Passos

1. ✅ Executar migrations (Passo 1)
2. ✅ Configurar Render (Passo 3)
3. ✅ Configurar Vercel (Passo 4)
4. ✅ Testar tudo (Passo 6)
5. 🎨 Configurar domínio customizado (opcional)

---

**Todos os comandos e URLs estão prontos para copiar e colar!** 🚀
