# Beauty SaaS

> Projeto em desenvolvimento.

O Beauty SaaS será uma plataforma SaaS multiempresa para a gestão de salões de beleza.

## Objetivo do MVP

Estabelecer uma base para centralizar a operação essencial de múltiplos salões em uma plataforma organizada, evolutiva e preparada para isolamento entre empresas. As funcionalidades do produto serão definidas e implementadas nas próximas etapas.

## Estrutura inicial do monorepo

```text
beauty-saas/
├── apps/       # Aplicações do produto
│   ├── web/    # Frontend Next.js
│   └── api/    # Backend NestJS
├── packages/                    # Pacotes compartilhados
│   ├── typescript-config/       # Configurações TypeScript compartilhadas
│   ├── eslint-config/           # Configuração ESLint compartilhada
│   └── prettier-config/         # Configuração Prettier compartilhada
├── docs/       # Documentação do projeto
├── AGENTS.md
├── .editorconfig
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

A pasta `apps` contém as aplicações iniciais `web` e `api`. A pasta `packages` contém configurações compartilhadas de TypeScript, ESLint e Prettier utilizadas pelas duas aplicações. A pasta `docs` contém a documentação oficial do projeto, referenciada pelo `AGENTS.md`.

## Requisitos locais identificados

- Git 2.48.1.windows.1
- Node.js 20.16.0
- Corepack 0.28.2
- pnpm 9.15.9 (versão adotada e validada)

O pnpm 9.15.9 foi disponibilizado por meio do Corepack, sem instalação global manual, e está acessível pelo comando `pnpm`.

## Instalação provisória

O workspace possui dependências de frontend e backend. Para instalá-las, execute na raiz:

```bash
pnpm install
```

O monorepo utiliza o arquivo `pnpm-lock.yaml` compartilhado da raiz.

## Comandos da raiz

Os comandos principais do monorepo devem ser executados na raiz:

- `pnpm dev`: inicia web e API em paralelo;
- `pnpm build`: gera os builds das aplicações;
- `pnpm lint`: executa o lint dos workspaces aplicáveis;
- `pnpm format:check`: verifica a formatação sem alterar arquivos;
- `pnpm typecheck`: verifica os tipos das aplicações;
- `pnpm test`: executa os testes unitários existentes;
- `pnpm test:e2e`: executa testes e2e somente nos workspaces que os possuem;
- `pnpm format`: aplica formatação explicitamente;
- `pnpm check`: executa, em sequência, todas as verificações de qualidade e o build.

## Variáveis de ambiente

Os exemplos versionáveis ficam em `apps/web/.env.example` e `apps/api/.env.example`. Quando uma aplicação exigir valores locais, copie o exemplo correspondente para um arquivo como `.env.local` e preencha-o somente no ambiente local.

Variáveis do frontend que realmente precisem chegar ao navegador devem usar o prefixo `NEXT_PUBLIC_` e nunca podem conter segredos. Credenciais e demais valores privados pertencem somente à API e não devem usar esse prefixo.

Atualmente, o web não exige variáveis de ambiente. A API aceita `PORT` pelo ambiente do processo e usa `3001` como fallback. Como ainda não há carregador de arquivos `.env` na API, `PORT` deve ser fornecida ao processo quando for necessário substituir esse padrão.

Nunca versione arquivos `.env`, `.env.local` ou outras variações reais. Os arquivos `.env.example` devem conter apenas nomes e valores seguros de exemplo, sem segredos ou credenciais.

## Status atual

A fundação inicial do repositório e a documentação oficial estão concluídas. As aplicações iniciais de frontend com Next.js e backend com NestJS foram criadas, utilizam configurações compartilhadas de TypeScript, ESLint e Prettier, possuem uma estratégia inicial para variáveis de ambiente e podem ser operadas pelos scripts da raiz. Banco de dados, autenticação e funcionalidades de negócio ainda não foram implementados.

A API possui o endpoint básico `GET /health`, que retorna:

```json
{
  "status": "ok"
}
```
