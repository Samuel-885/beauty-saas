# Beauty SaaS

> Projeto em desenvolvimento.

O Beauty SaaS será uma plataforma SaaS multiempresa para a gestão de salões de beleza.

## Objetivo do MVP

Estabelecer uma base para centralizar a operação essencial de múltiplos salões em uma plataforma organizada, evolutiva e preparada para isolamento entre empresas. As funcionalidades do produto serão definidas e implementadas nas próximas etapas.

## Estrutura inicial do monorepo

```text
beauty-saas/
├── apps/       # Aplicações do produto
├── packages/   # Pacotes compartilhados
├── docs/       # Documentação do projeto
├── AGENTS.md
├── .editorconfig
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

As pastas `apps` e `packages` contêm arquivos `.gitkeep` enquanto ainda não possuem conteúdo próprio. A pasta `docs` contém a documentação oficial do projeto, referenciada pelo `AGENTS.md`.

## Requisitos locais identificados

- Git 2.48.1.windows.1
- Node.js 20.16.0
- Corepack 0.28.2
- pnpm 9.15.9 (versão adotada e validada)

O pnpm 9.15.9 foi disponibilizado por meio do Corepack, sem instalação global manual, e está acessível pelo comando `pnpm`.

## Instalação provisória

Quando houver pacotes ou dependências no workspace e o pnpm 9.15.9 estiver disponível, execute na raiz:

```bash
pnpm install
```

Neste momento, nenhuma dependência foi adicionada ou instalada.

## Variáveis de ambiente

Nunca versione arquivos `.env`. Quando exemplos forem necessários, use arquivos `.env.example` sem segredos ou credenciais.

## Status atual

A fundação inicial do repositório e a documentação oficial estão concluídas. A aplicação frontend inicial foi criada com Next.js. Ainda não há backend, banco de dados, autenticação ou funcionalidades de negócio implementadas.
