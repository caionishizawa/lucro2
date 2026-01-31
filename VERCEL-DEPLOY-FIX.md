# 🔧 Como Resolver Erro de Build na Vercel

## ❌ Erro Atual

```
Exited with status 1 while building your code
```

## ✅ Soluções

### Solução 1: Configurar Corretamente o Projeto na Vercel

1. **Acessar** [https://vercel.com/dashboard](https://vercel.com/dashboard)

2. **Deletar o projeto antigo** (se tiver erro):
   - Ir em **Settings** do projeto
   - Rolar até o final
   - Clicar em **"Delete Project"**

3. **Criar novo projeto**:
   - Clicar em **"Add New..."** → **"Project"**
   - Selecionar o repositório `lucroo`

4. **Configurar EXATAMENTE assim**:

| Campo | Valor |
|-------|-------|
| **Project Name** | `lucroo` (sem underscore, sem maiúscula) |
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist/public` |
| **Install Command** | `npm install` |
| **Node.js Version** | `18.x` ou `20.x` |

5. **Adicionar Environment Variables**:

```
VITE_API_URL=https://lucroo-backend.onrender.com
```

**IMPORTANTE**: NÃO adicione `DATABASE_URL` na Vercel! Ela é apenas para o backend.

6. **Clicar em Deploy**

---

### Solução 2: Verificar se os Arquivos Corretos estão no Repositório

Os arquivos `.vercelignore` e `vercel.json` já foram atualizados. Faça commit e push:

```bash
git add .vercelignore vercel.json
git commit -m "Fix Vercel deploy configuration"
git push origin main
```

Depois, fazer **redeploy** na Vercel.

---

### Solução 3: Build com Variável de Ambiente Vazia (Caso de Emergência)

Se o erro persistir, pode ser que o Vite esteja tentando usar `VITE_API_URL` durante o build e falhando.

**Adicionar na Vercel**:

```
VITE_API_URL=https://lucroo-backend.onrender.com
NODE_ENV=production
```

---

## 🧪 Testar Build Localmente Primeiro

Antes de fazer deploy, testar localmente:

```bash
# Limpar build anterior
rm -rf dist

# Definir variável de ambiente
export VITE_API_URL=https://lucroo-backend.onrender.com

# Fazer build
npm run build

# Verificar se criou a pasta dist/public
ls -la dist/public

# Deve mostrar:
# index.html
# assets/
```

Se o build local funcionar, o problema é configuração da Vercel.

---

## 🔍 Ver Logs Detalhados na Vercel

1. Ir no deploy com erro
2. Clicar em **"View Function Logs"** ou **"Build Logs"**
3. Procurar por:
   - `Error: Cannot find module`
   - `Module not found`
   - `Failed to compile`
   - Linhas com `ERROR` ou `FAILED`

**Se encontrar um erro específico**, me envie para eu te ajudar!

---

## ⚙️ Configuração Correta do vercel.json

O arquivo `vercel.json` foi atualizado para:

```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**O que mudou**:
- ✅ Removido `devCommand` (não necessário)
- ✅ Removido `regions` (Vercel escolhe automaticamente)
- ✅ Adicionado `rewrites` para SPA funcionar corretamente

---

## 📋 Checklist de Deploy

- [ ] 1. Deletar projeto antigo na Vercel (se tiver)
- [ ] 2. Criar novo projeto
- [ ] 3. Nome: `lucroo` (sem underscore!)
- [ ] 4. Framework: Vite
- [ ] 5. Build Command: `npm run build`
- [ ] 6. Output: `dist/public`
- [ ] 7. Adicionar variável `VITE_API_URL`
- [ ] 8. Deploy
- [ ] 9. Verificar se deploy passou
- [ ] 10. Testar site funcionando

---

## 🚨 Problemas Comuns

### Erro: "Cannot find module 'vite'"

**Causa**: Dependências não instaladas

**Solução**: Verificar se `vite` está em `package.json` (já está)

### Erro: "Output directory 'dist' not found"

**Causa**: Build não criou a pasta `dist`

**Solução**: Verificar `Build Command` está como `npm run build`

### Erro: "VITE_API_URL is not defined"

**Causa**: Variável de ambiente faltando

**Solução**: Adicionar `VITE_API_URL` nas Environment Variables da Vercel

### Erro: "Node.js version not supported"

**Causa**: Versão antiga do Node

**Solução**:
1. Ir em **Settings** → **General**
2. **Node.js Version**: Selecionar `20.x`
3. Fazer **redeploy**

---

## ✅ Deploy Deve Mostrar

Se tudo estiver correto, você verá:

```
Building...
✓ Installing dependencies
✓ Running build command
✓ Collecting build outputs
✓ Uploading build artifacts
✓ Deploying

✅ Deployment successful!
```

URL final: `https://lucroo.vercel.app`

---

## 🎯 Próximos Passos Após Deploy Bem-Sucedido

1. ✅ Testar site: `https://lucroo.vercel.app`
2. ✅ Testar formulário de leads
3. ✅ Verificar Network tab se API calls vão para Render
4. ✅ Atualizar `FRONTEND_URL` no Render para `https://lucroo.vercel.app`
5. ✅ Testar novamente após atualizar CORS

---

**Problema continua?** Me envie o log completo do build error!
