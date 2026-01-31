# 🔧 RESOLVER ERRO DE BUILD NO RENDER - Guia Completo

## ❌ Erro Atual

```
Exited with status 1 while building your code
```

Isso significa que o build falhou, mas o Render não está mostrando o erro completo.

---

## 📋 PASSO 1: Ver o Log Completo do Erro

### 1.1 Acessar o Render

1. Ir em https://dashboard.render.com
2. Clicar no seu Web Service **"lucroo-backend"**

### 1.2 Ver Logs Completos

1. Na página do serviço, você verá a seção **"Events"**
2. Procurar pelo deploy mais recente que falhou (com ❌ vermelho)
3. Clicar em **"Deploy"** ou no timestamp do deploy
4. Você verá os logs completos

### 1.3 Procurar por Erros Específicos

Role os logs e procure por:

- `ERROR`
- `Failed`
- `Cannot find module`
- `ENOENT`
- `npm ERR!`
- Qualquer linha em vermelho

**ME ENVIE A MENSAGEM DE ERRO COMPLETA** para eu te ajudar!

---

## 🔧 PASSO 2: Verificar Configuração (Enquanto isso)

### 2.1 Verificar Build Command

1. No Render, ir em **"Settings"** (aba superior)
2. Procurar por **"Build Command"**
3. Deve estar EXATAMENTE:

```
npm install && npm run build
```

**NÃO pode ter**:
- `npm ci` (usar `npm install`)
- Scripts extras
- Comandos de database

### 2.2 Verificar Start Command

Procurar por **"Start Command"**

Deve estar EXATAMENTE:

```
npm start
```

### 2.3 Verificar Environment Variables

Ir em **"Environment"** (menu lateral)

Deve ter EXATAMENTE estas 4 variáveis:

| Key | Value | Verificar |
|-----|-------|-----------|
| `DATABASE_URL` | `postgresql://postgres.twcmndhbramzhlmpaapz:enricamos2026%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres` | ✅ Tem `%40` (não `@`) |
| `NODE_ENV` | `production` | ✅ Sem espaços |
| `PORT` | `5000` | ✅ Apenas números |
| `FRONTEND_URL` | `https://lucroo.vercel.app` | ✅ Tem `https://` |

**IMPORTANTE**:
- `DATABASE_URL` deve ter **`%40`** no lugar de `@` na senha
- `FRONTEND_URL` pode ficar vazio por enquanto (atualizar depois do deploy do Vercel)

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: "Cannot find module 'tsx'"

**Causa**: `tsx` está em devDependencies

**Solução**:
1. Ir em **"Settings"**
2. Mudar **"Build Command"** para:
   ```
   npm install --include=dev && npm run build
   ```

### Problema 2: "ENOENT: no such file or directory, open 'dist/index.cjs'"

**Causa**: Build não criou o arquivo

**Solução**:
1. Verificar se **Build Command** está correto
2. Fazer **Manual Deploy** com cache limpo:
   - Ir em **"Manual Deploy"** (botão no canto superior direito)
   - Selecionar **"Clear build cache & deploy"**
   - Clicar em **"Deploy"**

### Problema 3: "Error: connect ECONNREFUSED" durante build

**Causa**: Build está tentando conectar ao database

**Solução**:
O build NÃO deve usar o database. Isso pode acontecer se:
- Drizzle está tentando validar schema durante build
- Migrations estão rodando automaticamente

**Como resolver**:
1. Temporariamente REMOVER a variável `DATABASE_URL`
2. Fazer deploy
3. Depois adicionar `DATABASE_URL` de volta
4. Executar migrations via Shell

### Problema 4: "Out of memory" ou "JavaScript heap out of memory"

**Causa**: Build precisa de mais memória

**Solução**:
1. Upgrade para Render Starter ($7/mês) - tem mais memória
2. Ou otimizar o build (não recomendado para agora)

### Problema 5: "Module not found: Can't resolve 'X'"

**Causa**: Dependência faltando

**Solução**:
1. Verificar se todas as dependências estão em `package.json`
2. No Render, ir em **"Manual Deploy"** → **"Clear build cache & deploy"**

---

## ✅ PASSO 3: Configuração Correta Completa

Vou te dar a configuração EXATA que deve estar no Render:

### No Settings:

```
Name: lucroo-backend
Region: Ohio (US East)
Branch: main
Root Directory: (vazio)

Build Command: npm install && npm run build
Start Command: npm start

Auto-Deploy: Yes
```

### No Environment:

```
DATABASE_URL=postgresql://postgres.twcmndhbramzhlmpaapz:enricamos2026%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres
NODE_ENV=production
PORT=5000
FRONTEND_URL=
```

**Nota**: Deixe `FRONTEND_URL` vazio por enquanto se não tiver a URL da Vercel ainda.

---

## 🔄 PASSO 4: Fazer Deploy Limpo

### 4.1 Limpar Cache e Fazer Novo Deploy

1. No Render, no menu superior, clicar em **"Manual Deploy"**
2. Selecionar **"Clear build cache & deploy"**
3. Clicar em **"Deploy"**
4. **AGUARDAR** e assistir os logs

### 4.2 Acompanhar os Logs

Você deve ver:

```
==> Cloning from https://github.com/...
==> Checking out commit...
==> Using Node.js version 20.19.27
==> Running 'npm install && npm run build'

> npm install
...instalando dependências...

> npm run build
building client...
✓ built in XXs
building server...
⚡ Done

==> Uploading build...
==> Build successful!
==> Starting service...
==> Your service is live 🎉
```

### 4.3 Se Der Erro

**COPIE O LOG COMPLETO** e me envie!

Procure especialmente a parte depois de `> npm run build`

---

## 📸 COMO TIRAR SCREENSHOT DO ERRO

Se preferir me enviar screenshot:

1. No Render, na página do deploy com erro
2. Role até a parte com o erro (linhas vermelhas ou `ERROR`)
3. Tirar screenshot incluindo algumas linhas antes e depois
4. Me enviar

---

## 🎯 PRÓXIMOS PASSOS APÓS RESOLVER

Quando o deploy der certo, você verá:

```
✅ Deployment successful!
```

E a URL do backend no topo da página:

```
https://lucroo-backend.onrender.com
```

Aí você pode:

1. ✅ Testar a URL: `https://lucroo-backend.onrender.com/api/leads`
2. ✅ Executar migrations via Shell
3. ✅ Continuar para o deploy do frontend na Vercel

---

## 💡 DICA RÁPIDA

Se quiser fazer teste rápido:

1. Temporariamente REMOVER `DATABASE_URL` das variáveis
2. Fazer deploy
3. Se funcionar, o problema é a conexão com database durante build
4. Adicionar `DATABASE_URL` de volta depois do deploy bem-sucedido

---

## ❓ AINDA COM ERRO?

Me envie:

1. **Log completo** do build error (copiar texto dos logs)
2. **Screenshot** da parte com erro
3. **Configuração** atual:
   - Build Command que está usando
   - Start Command
   - Variáveis de ambiente (SEM mostrar senhas completas)

Vou te ajudar a resolver! 🚀
