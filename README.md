# Mobile Profit Guide

Aplicação full-stack para landing page de produto digital sobre lucro com celulares.

## 🚀 Tecnologias

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express + TypeScript
- **Banco de Dados**: PostgreSQL + Drizzle ORM
- **UI Components**: Radix UI + shadcn/ui

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🔧 Configuração Local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

**Exemplo para PostgreSQL local:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mobile_profit_guide
```

### 3. Criar o banco de dados

No PostgreSQL, crie o banco de dados:

```sql
CREATE DATABASE mobile_profit_guide;
```

### 4. Executar migrações do banco de dados

```bash
npm run db:push
```

Este comando criará as tabelas necessárias no banco de dados.

### 5. Executar o projeto em modo desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor em modo produção
- `npm run check` - Verifica erros de TypeScript
- `npm run db:push` - Executa migrações do banco de dados

## 🗂️ Estrutura do Projeto

```
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   └── hooks/       # Custom hooks
├── server/          # Backend Express
│   ├── index.ts     # Servidor principal
│   ├── routes.ts    # Rotas da API
│   └── db.ts        # Configuração do banco
├── shared/          # Código compartilhado
│   ├── schema.ts    # Schema do Drizzle ORM
│   └── routes.ts    # Definições de rotas
└── dist/            # Build de produção
```

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `DATABASE_URL` | URL de conexão do PostgreSQL | Sim |
| `PORT` | Porta do servidor (padrão: 5000) | Não |
| `NODE_ENV` | Ambiente (development/production) | Não |

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme se a `DATABASE_URL` está correta no arquivo `.env`
- Verifique se o banco de dados foi criado

### Erro ao executar `npm run dev` no Windows
Se você estiver no Windows e encontrar problemas com a variável `NODE_ENV`, você pode usar:
- Git Bash
- WSL (Windows Subsystem for Linux)
- Ou instalar `cross-env` e atualizar o script

## 📄 Licença

MIT

