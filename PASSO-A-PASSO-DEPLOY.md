# 🚀 PASSO A PASSO COMPLETO - Deploy do Projeto Lucroo

Siga EXATAMENTE nesta ordem. Não pule nenhum passo!

---

## ✅ PASSO 0: Preparação (Fazer PRIMEIRO)

### 0.1 Fazer Push das Alterações

```bash
# No terminal, no diretório do projeto
git add .
git commit -m "Adiciona build separado para frontend"
git push origin claude/setup-project-configuration-gClpW

# Depois fazer merge para main
git checkout main
git merge claude/setup-project-configuration-gClpW
git push origin main
```

### 0.2 Executar Migrations no Supabase

```bash
# No terminal
export DATABASE_URL="postgresql://postgres:enricamos2026%40@db.twcmndhbramzhlmpaapz.supabase.co:5432/postgres"
npm run db:push
```

**Resultado esperado**: ✅ `Done!`

**Se der erro de rede**: Está ok, vamos executar as migrations via Render depois.

---

## 📦 PASSO 1: Deploy do Backend no Render

### 1.1 Acessar o Render

1. Ir em https://dashboard.render.com
2. Fazer login

### 1.2 Criar Web Service

1. Clicar em **"New +"** (botão azul no canto superior direito)
2. Selecionar **"Web Service"**

### 1.3 Conectar Repositório

1. Se ainda não conectou GitHub:
   - Clicar em **"Connect GitHub"**
   - Autorizar Render

2. Procurar o repositório **"lucroo"** na lista
3. Clicar em **"Connect"**

### 1.4 Configurar o Web Service

Preencher EXATAMENTE assim:

| Campo | Valor EXATO |
|-------|-------------|
| **Name** | `lucroo-backend` |
| **Region** | `Ohio (US East)` |
| **Branch** | `main` |
| **Root Directory** | *(deixar vazio)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 1.5 Adicionar Environment Variables

Clicar em **"Advanced"** para expandir, depois rolar até **"Environment Variables"**.

Clicar em **"Add Environment Variable"** para cada uma:

**Variável 1:**
```
Key: DATABASE_URL
Value: postgresql://postgres.twcmndhbramzhlmpaapz:enricamos2026%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Variável 2:**
```
Key: NODE_ENV
Value: production
```

**Variável 3:**
```
Key: PORT
Value: 5000
```

**Variável 4:**
```
Key: FRONTEND_URL
Value: https://lucroo.vercel.app
```

### 1.6 Criar Web Service

1. Rolar até o final
2. Clicar em **"Create Web Service"** (botão azul grande)
3. **AGUARDAR** - O deploy vai demorar 5-10 minutos

### 1.7 Acompanhar o Deploy

Você verá logs aparecendo. Aguarde até ver:

```
✓ Building...
✓ Starting service...
==> Deployment successful!
```

### 1.8 Anotar a URL do Backend

No topo da página, você verá a URL:

```
https://lucroo-backend.onrender.com
```

**COPIE ESTA URL** - você vai precisar dela!

### 1.9 Executar Migrations (Se não fez no Passo 0.2)

1. No Render, no menu lateral esquerdo, clicar em **"Shell"**
2. Aguardar o terminal carregar
3. Executar:
   ```bash
   npm run db:push
   ```
4. Aguardar a mensagem: `Done!`

### 1.10 Testar o Backend

Abrir nova aba do navegador e testar:

```
https://lucroo-backend.onrender.com/api/leads
```

**Deve mostrar**: `Cannot GET /api/leads` (normal, porque o endpoint é POST)

---

## 🌐 PASSO 2: Deploy do Frontend na Vercel

### 2.1 Acessar a Vercel

1. Ir em https://vercel.com
2. Fazer login com GitHub

### 2.2 Deletar Projeto Antigo (Se houver)

Se você já tentou fazer deploy antes e deu erro:

1. Ir em **"Projects"** (menu superior)
2. Procurar projeto "lucroo" ou similar
3. Clicar no projeto
4. Ir em **"Settings"** (aba superior)
5. Rolar até o final da página
6. Clicar em **"Delete Project"**
7. Confirmar digitando o nome do projeto
8. Clicar em **"Delete"**

### 2.3 Criar Novo Projeto

1. Voltar para https://vercel.com/new
2. Ou clicar em **"Add New..."** → **"Project"**

### 2.4 Importar Repositório

1. Na seção **"Import Git Repository"**
2. Procurar **"lucroo"** na lista
3. Clicar em **"Import"**

### 2.5 Configurar o Projeto

**IMPORTANTE**: Preencher EXATAMENTE assim:

| Campo | Valor EXATO |
|-------|-------------|
| **Project Name** | `lucroo` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` *(deixar como está)* |
| **Build Command** | *(deixar vazio - vai usar vercel.json)* |
| **Output Directory** | *(deixar vazio - vai usar vercel.json)* |
| **Install Command** | *(deixar vazio - vai usar vercel.json)* |

### 2.6 Adicionar Environment Variable

1. Clicar em **"Environment Variables"** para expandir
2. Adicionar:

```
Name: VITE_API_URL
Value: https://lucroo-backend.onrender.com
```

**IMPORTANTE**: Use a URL que você anotou no Passo 1.8!

3. Marcar as 3 opções:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### 2.7 Deploy

1. Clicar em **"Deploy"** (botão azul grande)
2. **AGUARDAR** - O deploy vai demorar 3-5 minutos

### 2.8 Acompanhar o Build

Você verá:

```
Queued...
Building...
✓ Installing dependencies
✓ Running build command
✓ Collecting build outputs
```

### 2.9 Verificar Deploy Bem-Sucedido

Quando terminar, você verá:

```
✅ Deployment ready
```

E a Vercel vai te mostrar a URL:

```
https://lucroo.vercel.app
```

### 2.10 Testar o Frontend

1. Clicar no botão **"Visit"** ou na URL
2. O site deve carregar
3. **Se der erro 404**: Aguardar 30 segundos e recarregar

---

## 🔄 PASSO 3: Atualizar CORS no Backend

Agora que temos a URL do frontend, precisamos atualizar o backend.

### 3.1 Atualizar Frontend URL

1. Voltar para https://dashboard.render.com
2. Clicar no seu Web Service **"lucroo-backend"**
3. Ir em **"Environment"** (menu lateral esquerdo)
4. Procurar a variável `FRONTEND_URL`
5. Clicar no ícone de **editar** (lápis)
6. Trocar o valor para a URL EXATA da Vercel (do Passo 2.9):
   ```
   https://lucroo.vercel.app
   ```
7. Clicar em **"Save Changes"**

### 3.2 Aguardar Redeploy

O Render vai fazer redeploy automático. Aguardar 2-3 minutos.

Você verá nos logs:

```
==> Restarting service...
==> Deployment successful!
```

---

## ✅ PASSO 4: Testar Tudo Funcionando

### 4.1 Abrir o Site

Abrir a URL da Vercel:

```
https://lucroo.vercel.app
```

### 4.2 Abrir DevTools

Pressionar **F12** para abrir as ferramentas de desenvolvedor.

### 4.3 Ir na Aba Network

1. Clicar na aba **"Network"** (ou "Rede")
2. Marcar **"Preserve log"** (para não limpar ao navegar)

### 4.4 Testar o Formulário

1. Preencher o formulário de leads com:
   - Email: `teste@example.com`
   - Nome: `Teste Usuario`
2. Clicar em **"Enviar"** (ou botão similar)

### 4.5 Verificar no Network Tab

No DevTools, você deve ver:

```
POST https://lucroo-backend.onrender.com/api/leads
Status: 201 Created
```

Se clicar nessa linha, na aba **"Response"** deve mostrar algo como:

```json
{
  "id": 1,
  "email": "teste@example.com",
  "name": "Teste Usuario",
  "createdAt": "2026-01-31T..."
}
```

### 4.6 Verificar no Supabase

1. Ir em https://supabase.com/dashboard/project/twcmndhbramzhlmpaapz/editor
2. Clicar na tabela **"leads"** (menu lateral)
3. Verificar se o lead aparece na lista

**Parabéns! Tudo está funcionando!** 🎉

---

## 🐛 TROUBLESHOOTING

### Erro no Render: "Build failed"

**Verificar**:
1. Build Command: `npm install && npm run build`
2. Start Command: `npm start`
3. Variável `DATABASE_URL` está correta (porta 6543)

**Solução**:
1. Ir em **"Manual Deploy"** → **"Clear build cache & deploy"**

### Erro na Vercel: "Build failed"

**Verificar**:
1. Arquivo `vercel.json` tem `"buildCommand": "npm run build:frontend"`
2. Arquivo existe em: `/home/user/lucroo/vercel.json`

**Solução**:
1. Ir em **"Deployments"**
2. Clicar no deploy com erro
3. Clicar em **"Redeploy"**
4. Marcar ✅ **"Use existing Build Cache"**
5. Clicar em **"Redeploy"**

### Erro CORS: "blocked by CORS policy"

**Verificar**:
1. Variável `FRONTEND_URL` no Render está EXATA
2. URL tem `https://` (não `http://`)
3. Não tem `/` no final

**Solução**:
1. Editar `FRONTEND_URL` no Render
2. Copiar URL EXATA da Vercel
3. Aguardar redeploy

### Frontend carrega mas não envia formulário

**Verificar no DevTools (F12)**:
1. Aba **"Console"** - procurar erros em vermelho
2. Aba **"Network"** - ver se request está indo para URL correta

**Soluções**:
1. Verificar `VITE_API_URL` na Vercel
2. Deve ser: `https://lucroo-backend.onrender.com` (sem `/api`)
3. Fazer **Redeploy** na Vercel após corrigir

### Backend demora 30+ segundos na primeira request

**É normal!** Render Free tier coloca o serviço em sleep após 15 minutos de inatividade.

**Soluções**:
1. Aceitar o cold start (grátis)
2. Upgrade para Render Starter ($7/mês - sem sleep)
3. Usar serviço de ping (UptimeRobot) para manter ativo

---

## 📊 URLs Finais

Após completar todos os passos:

| Serviço | URL |
|---------|-----|
| **Frontend** | https://lucroo.vercel.app |
| **Backend** | https://lucroo-backend.onrender.com |
| **API Endpoint** | https://lucroo-backend.onrender.com/api/leads |
| **Supabase** | https://twcmndhbramzhlmpaapz.supabase.co |

---

## ✅ Checklist Final

- [ ] 1. Migrations executadas com sucesso
- [ ] 2. Backend no Render deployado (verde)
- [ ] 3. Frontend na Vercel deployado (verde)
- [ ] 4. `FRONTEND_URL` atualizado no Render
- [ ] 5. Site carrega sem erros
- [ ] 6. Formulário envia lead com sucesso
- [ ] 7. Lead aparece no Supabase

**Tudo marcado? Você terminou! 🎉**

---

## 🎯 Próximos Passos (Opcional)

1. Configurar domínio customizado (Registro.br)
2. Adicionar Google Analytics
3. Configurar Sentry para monitoramento de erros
4. Fazer backup do database regularmente

Consulte `GUIA-CONFIGURACAO.md` para mais detalhes!
