# 🚀 Deploy no Fly.io (Alternativa ao Render)

O Render está dando problemas. Vamos usar o **Fly.io** que é mais confiável.

## ✅ Por que Fly.io?

- ✅ Grátis (3 VMs pequenas)
- ✅ Mais estável que Render
- ✅ Logs detalhados (vamos ver o erro se houver)
- ✅ Deploy via CLI (mais controle)

---

## 📋 PASSO 1: Instalar Fly CLI

### No Mac/Linux:

```bash
curl -L https://fly.io/install.sh | sh
```

### No Windows (PowerShell):

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

Depois, fechar e abrir o terminal novamente.

---

## 📋 PASSO 2: Login no Fly.io

```bash
# Fazer login (abre navegador)
fly auth login

# OU criar conta
fly auth signup
```

---

## 📋 PASSO 3: Criar Aplicação

No diretório do projeto:

```bash
cd /caminho/para/lucroo

# Criar app
fly launch --no-deploy

# Responder:
# App name: lucroo-backend (ou deixar gerar)
# Region: Miami (ou mais próximo)
# PostgreSQL: NO (já temos Supabase)
# Redis: NO
# Deploy now: NO
```

---

## 📋 PASSO 4: Configurar Variáveis de Ambiente

```bash
# Adicionar variáveis
fly secrets set DATABASE_URL="postgresql://postgres.twcmndhbramzhlmpaapz:enricamos2026%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

fly secrets set NODE_ENV=production

fly secrets set PORT=8080
```

---

## 📋 PASSO 5: Editar fly.toml

Abrir `fly.toml` e verificar se está assim:

```toml
app = "lucroo-backend"
primary_region = "mia"

[build]
  [build.args]
    NODE_VERSION = "20"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[services]]
  protocol = "tcp"
  internal_port = 8080

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

---

## 📋 PASSO 6: Criar Dockerfile

Criar arquivo `Dockerfile` na raiz:

```dockerfile
FROM node:20-slim

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código
COPY . .

# Build
RUN npm run build

# Expor porta
EXPOSE 8080

# Start
CMD ["npm", "start"]
```

---

## 📋 PASSO 7: Deploy!

```bash
fly deploy
```

Aguardar 2-5 minutos.

---

## 📋 PASSO 8: Ver Logs

```bash
# Ver logs em tempo real
fly logs

# Ver status
fly status

# Ver URL
fly open
```

---

## ✅ URL Final

```
https://lucroo-backend.fly.dev
```

---

## 🐛 Se Der Erro

```bash
# Ver logs detalhados
fly logs -a lucroo-backend

# Conectar via SSH
fly ssh console

# Dentro do container, testar:
npm run build
```

---

## 💰 Custos

**FREE TIER**:
- 3 VMs compartilhadas
- 160GB bandwidth/mês
- 3GB storage

Suficiente para começar!

---

## 🔄 Fazer Redeploy

Quando atualizar o código:

```bash
git push origin main
fly deploy
```

---

**Muito mais simples e confiável que Render!** 🚀
