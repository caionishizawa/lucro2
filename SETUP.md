# 🚀 Guia Rápido de Setup

## Passo a Passo para Rodar Localmente

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Configurar Banco de Dados PostgreSQL

**Opção A: PostgreSQL Local**
1. Instale o PostgreSQL se ainda não tiver
2. Crie um banco de dados:
   ```sql
   CREATE DATABASE mobile_profit_guide;
   ```

**Opção B: Docker (Recomendado)**
```bash
docker run --name mobile-profit-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mobile_profit_guide -p 5432:5432 -d postgres
```

### 3️⃣ Criar Arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_profit_guide
PORT=5000
NODE_ENV=development
```

**Ajuste a URL conforme sua configuração:**
- Usuário: `postgres` (ou seu usuário)
- Senha: `postgres` (ou sua senha)
- Host: `localhost`
- Porta: `5432`
- Database: `mobile_profit_guide`

### 4️⃣ Executar Migrações do Banco
```bash
npm run db:push
```

### 5️⃣ Iniciar o Servidor
```bash
npm run dev
```

### 6️⃣ Acessar a Aplicação
Abra seu navegador em: **http://localhost:5000**

---

## ✅ Verificação

Se tudo estiver funcionando, você verá:
- No terminal: `serving on port 5000`
- No navegador: A landing page do Mobile Profit Guide

## 🐛 Problemas Comuns

### Erro: "DATABASE_URL must be set"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Confirme que a variável `DATABASE_URL` está definida

### Erro: "connection refused" ou "ECONNREFUSED"
- Verifique se o PostgreSQL está rodando
- Confirme se a porta 5432 está correta
- Teste a conexão: `psql -U postgres -d mobile_profit_guide`

### Erro ao executar `npm run dev` no Windows
- Os scripts agora usam `cross-env` e devem funcionar em Windows
- Se ainda houver problemas, use Git Bash ou WSL

---

## 📝 Próximos Passos

Após o setup inicial, você pode:
- Editar componentes em `client/src/components/`
- Modificar rotas da API em `server/routes.ts`
- Ajustar o schema do banco em `shared/schema.ts`

