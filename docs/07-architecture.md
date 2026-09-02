# Arquitetura

## Estado deste documento

Esta é a arquitetura planejada para o Beauty SaaS. As aplicações, integrações, banco e dependências ainda não estão implementados.

## Estilo arquitetural

O sistema será um monólito modular organizado em monorepo pnpm.

Essa escolha mantém implantação e operação iniciais simples, enquanto separa responsabilidades por módulos dentro do backend. Microserviços não fazem parte da arquitetura inicial.

## Stack planejada

### Frontend

- Next.js;
- React;
- TypeScript;
- App Router;
- Tailwind CSS.

### Backend

- Node.js;
- NestJS;
- TypeScript;
- API REST.

### Dados

- PostgreSQL hospedado no Supabase;
- Prisma ORM.

### Serviços

- Supabase Auth;
- Supabase Storage em bucket privado.

### Qualidade

- Jest para testes planejados;
- Supertest para testes planejados da API;
- Playwright para testes planejados de ponta a ponta.

### Colaboração

- Git e GitHub;
- desenvolvimento assistido por Codex.

## Fluxo principal

```text
Usuário
   ↓
Next.js
   ↓
API NestJS
   ↓
Prisma
   ↓
PostgreSQL / Supabase
```

O NestJS é a principal camada responsável por regras de negócio e autorização. O frontend não deve acessar diretamente tabelas operacionais para executar regras de negócio.

## Fluxo de autenticação e autorização

```text
Next.js
   ↓
Supabase Auth
   ↓ JWT
NestJS
   ↓
Verificação de usuário, vínculo, salão e papel
```

Responsabilidades:

1. o Supabase Auth autentica a conta;
2. o frontend encaminha o JWT para a API;
3. o NestJS valida a identidade;
4. o NestJS verifica o `SalonMember` ativo;
5. o NestJS valida o `salonId` e o papel para a ação;
6. somente então a regra de negócio acessa os dados operacionais.

O frontend pode refletir permissões na experiência, mas o backend continua sendo a autoridade.

## Isolamento multiempresa

- `Salon` é o limite de isolamento operacional;
- o banco PostgreSQL é compartilhado;
- não haverá banco separado por salão no início;
- toda operação deve receber ou derivar um contexto de salão válido;
- consultas e alterações devem ser filtradas pelo salão autorizado;
- relações filhas não podem ser usadas para contornar o contexto do salão;
- um usuário precisa de vínculo ativo para cada salão acessado.

## Estrutura planejada do monorepo

```text
apps/
├── web/
└── api/

packages/
├── validation/
├── shared-types/
├── eslint-config/
└── typescript-config/
```

Responsabilidades planejadas:

- `apps/web`: frontend Next.js;
- `apps/api`: API NestJS;
- `packages/validation`: validações compartilháveis quando justificadas;
- `packages/shared-types`: tipos compartilhados quando houver contrato comum real;
- `packages/eslint-config`: configuração comum de lint;
- `packages/typescript-config`: configuração comum de TypeScript.

Esses diretórios ainda não devem ser tratados como implementados.

## Organização do backend

O NestJS será organizado como monólito modular, acompanhando os domínios do roadmap, como autenticação, salões, equipe, profissionais, serviços, clientes, agenda, atendimentos, pagamentos, histórico, fotos, dashboard e auditoria.

Os limites internos serão definidos à medida que cada módulo for implementado. Não há necessidade inicial de comunicação distribuída, filas ou serviços independentes.

## Dados e persistência

- Prisma será a camada de acesso ao PostgreSQL;
- valores financeiros serão persistidos em centavos;
- `Attendance` manterá `finalTotalInCents`, `paidTotalInCents` e `paymentStatus`;
- cada `Payment` manterá `attendanceId`, `amountInCents`, `method` e `paidAt`;
- `paidTotalInCents` e `paymentStatus` devem refletir a soma dos pagamentos;
- históricos de serviços realizados usarão snapshots;
- o modelo deve permitir atendimento com ou sem agendamento;
- as regras de conflito e as transições permitidas da agenda serão aplicadas no backend;
- o `salonId` deve ser validado em toda operação com dados operacionais.

## Dashboard

O dashboard inicial será atendido pela API no contexto do salão. Ele consolida agenda do dia, próximos horários, estados dos atendimentos, cancelamentos, `NO_SHOW`, quantidade de clientes, serviços mais realizados, valores básicos de atendimentos concluídos e retornos próximos.

Indicadores financeiros completos exigem papel `OWNER` ou `ADMIN`.

## Auditoria

O backend deve gerar `AuditLog` para os eventos mínimos definidos nas regras de negócio. Cada registro deve identificar salão, usuário, ação, entidade, registro afetado, valores anterior e novo quando aplicáveis e data/hora.

Usuários comuns não podem editar esses registros. Senhas, tokens e segredos nunca devem fazer parte do conteúdo de auditoria.

## Arquivos privados

- fotos ficarão no Supabase Storage;
- o bucket será privado;
- o banco armazenará metadados e caminhos;
- a autorização para fotos deve estar registrada;
- o acesso ao arquivo deve validar identidade e contexto do salão.

## Estratégia de testes planejada

- Jest para regras e unidades relevantes;
- Supertest para comportamento da API REST, incluindo autorização;
- Playwright para fluxos essenciais de ponta a ponta.

Testes devem cobrir especialmente isolamento entre salões, permissões, estados e conflitos de agenda, snapshots históricos, derivação de pagamentos, proteção de fotos e geração de auditoria quando esses módulos forem implementados.

## Fora da arquitetura inicial

- microserviços;
- Kubernetes;
- Redis;
- GraphQL;
- banco separado por salão;
- aplicativo nativo.

## Critério para evolução

Novas abstrações ou componentes de infraestrutura devem responder a uma necessidade observada. A preferência inicial é por soluções simples, explícitas e testáveis dentro do monólito modular.
