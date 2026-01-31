# ✅ RESOLVIDO - Node Version para Railway

## 🔧 O Que Foi Corrigido

Mudei `.nvmrc` de `20.19.27` para `20` (genérica).

Railway não aceita versões muito específicas do Node, apenas versões major (ex: `20`, `18`, `16`).

---

## 🚀 FAÇA AGORA NO RAILWAY

### Opção 1: Redeploy Automático (Se conectou via GitHub)

1. **O Railway já detectou** a mudança no código
2. **Aguardar** 1-2 minutos
3. **Vai fazer redeploy automaticamente** ✅

### Opção 2: Redeploy Manual

Se não aconteceu automaticamente:

1. **Ir no Railway** → seu projeto
2. **Clicar** no serviço `lucroo`
3. **Ir em "Deployments"** (aba superior)
4. **Clicar** nos **⋮** (3 pontinhos) do último deploy
5. **Selecionar** **"Redeploy"**
6. **Aguardar** 3-5 minutos

---

## ✅ O Que Você Deve Ver Agora

Nos logs do Railway:

```
✅ SUCESSO:
╭─────────────────╮
│ Railpack 0.17.1 │
╰─────────────────╯

↳ Detected Node
↳ Using npm package manager
✓ Resolved Node version 20.x.x

==> Installing dependencies...
==> Running build...

> rest-express@1.0.0 build
> tsx script/build.ts

building client...
✓ built in 12s
building server...
⚡ Done

==> Build successful!
==> Starting service...
==> Your service is live 🎉
```

---

## 🌐 Depois do Deploy

### 1. Copiar URL do Railway

Vai aparecer algo como:
```
https://lucroo-production.up.railway.app
```

### 2. Atualizar URL na Vercel

1. **Ir na Vercel** → projeto `lucroo`
2. **Settings** → **Environment Variables**
3. **Editar** `VITE_API_URL`
4. **Trocar** para: `https://lucroo-production.up.railway.app`
5. **Save**
6. **Redeploy** na Vercel

### 3. Executar Migrations

No Railway:

#### Via Interface:

Se Railway tiver "Shell" ou "Terminal":
1. Abrir o terminal
2. Executar: `npm run db:push`

#### Via CLI (Mais fácil):

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Executar migrations
railway run npm run db:push
```

---

## ✅ Testar Tudo Funcionando

1. **Abrir** `https://lucroo.vercel.app`
2. **F12** → aba **Network**
3. **Preencher** formulário de leads
4. **Verificar** request: `POST → 201 Created` ✅
5. **Verificar** no Supabase se o lead foi salvo

---

## 📊 URLs Finais

```
Frontend: https://lucroo.vercel.app
Backend:  https://lucroo-production.up.railway.app
API:      https://lucroo-production.up.railway.app/api/leads
Database: twcmndhbramzhlmpaapz.supabase.co
```

---

## 🎉 PRONTO!

Agora o Railway vai aceitar a versão do Node e fazer o deploy com sucesso!

**Aguarde o redeploy e me avise se funcionou!** 🚀
