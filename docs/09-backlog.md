# Backlog

## Convenções de status

- **Concluído:** implementado e validado.
- **Parcialmente preparado:** existe uma base, mas o item ainda requer trabalho.
- **Em andamento:** trabalho iniciado e ainda não finalizado.
- **Pendente:** não implementado.

## Épico 1 — Fundação

**Objetivo:** estabelecer a base do repositório e do monorepo para as aplicações futuras.

Escopo conhecido:

- repositório Git;
- monorepo pnpm;
- documentação de contexto;
- aplicações base Next.js e NestJS;
- health check;
- TypeScript compartilhado;
- ESLint e Prettier;
- variáveis de ambiente;
- pacotes compartilhados;
- scripts da raiz;
- integração contínua.

Status geral: **em andamento**.

## Épico 2 — Banco e Supabase

**Objetivo:** preparar PostgreSQL no Supabase e a persistência com Prisma.

Escopo conhecido:

- PostgreSQL hospedado no Supabase;
- Prisma ORM;
- modelo compartilhado entre salões;
- preparação das entidades descritas em [Modelo de dados](06-data-model.md);
- valores financeiros em centavos;
- base para snapshots históricos.

Status geral: **pendente**.

## Épico 3 — Autenticação

**Objetivo:** autenticar a conta global e permitir que a API reconheça o usuário.

Escopo conhecido:

- Supabase Auth;
- JWT enviado à API NestJS;
- verificação da identidade no backend.

Status geral: **pendente**.

## Épico 4 — Multiempresa

**Objetivo:** garantir acesso e isolamento por salão.

Escopo conhecido:

- `User`, `Salon` e `SalonMember`;
- múltiplos salões por usuário;
- vínculo ativo;
- papel por salão;
- seleção de contexto;
- validação de `salonId` no backend;
- prevenção de acesso cruzado entre salões.

Status geral: **pendente**.

## Épico 5 — Equipe e permissões

**Objetivo:** aplicar os papéis do MVP em cada salão.

Escopo conhecido:

- matriz explícita para `OWNER`, `ADMIN`, `RECEPTIONIST` e `PROFESSIONAL`;
- autorização no backend;
- operação completa para `OWNER` e `ADMIN`, respeitando ações reservadas à propriedade;
- atuação operacional da recepção;
- ações próprias do profissional;
- indicadores financeiros completos restritos a `OWNER` e `ADMIN`;
- limites descritos em [Papéis e permissões](04-roles-and-permissions.md).

Status geral: **pendente**.

## Épico 6 — Configurações do salão

**Objetivo:** representar quando o salão pode operar.

Escopo conhecido:

- dias de funcionamento;
- horários;
- intervalos;
- dias fechados;
- bloqueios do salão.

Status geral: **pendente**.

## Épico 7 — Profissionais

**Objetivo:** cadastrar profissionais e sua participação na agenda.

Escopo conhecido:

- `Professional` separado de `User`;
- profissional sem login;
- `userId` opcional;
- no máximo um `Professional` por `User` dentro do mesmo salão;
- possibilidade de outro `Professional` para o mesmo `User` em outro salão;
- disponibilidade própria;
- bloqueios do profissional;
- relação com serviços.

Status geral: **pendente**.

## Épico 8 — Serviços

**Objetivo:** manter o catálogo de serviços de cada salão.

Escopo conhecido:

- catálogo isolado por salão;
- nome;
- preço padrão em centavos;
- duração padrão;
- variação por cliente ou agendamento;
- relação muitos-para-muitos com profissionais.

Status geral: **pendente**.

## Épico 9 — Clientes

**Objetivo:** centralizar o cadastro e o contexto básico da cliente.

Escopo conhecido:

- nome;
- telefone normalizado;
- e-mail;
- data de nascimento;
- tipo ou características do cabelo;
- observações;
- autorização para fotos;
- alerta de possível duplicidade sem unicidade obrigatória do telefone.

Status geral: **pendente**.

## Épico 10 — Agenda

**Objetivo:** gerenciar reservas respeitando funcionamento e disponibilidade.

Escopo conhecido:

- `Appointment` e `AppointmentService`;
- cliente, profissional, serviços e período;
- estados de agendamento;
- `SCHEDULED`, `CONFIRMED` e `IN_PROGRESS` ocupando horário;
- `CANCELED` e `NO_SHOW` liberando horário;
- `COMPLETED` preservado como histórico;
- transições básicas definidas em [Regras de negócio](05-business-rules.md);
- confirmação, reagendamento, cancelamento e ausência conforme permissão;
- prevenção de agendamentos ativos sobrepostos;
- horários consecutivos permitidos;
- proibição de ignorar conflitos no MVP.

Ainda deve ser definida a precedência entre horários gerais, disponibilidade profissional e bloqueios.

Status geral: **pendente**.

## Épico 11 — Atendimentos

**Objetivo:** registrar atendimentos realmente iniciados ou realizados.

Escopo conhecido:

- atendimento originado de agendamento;
- atendimento avulso;
- cliente;
- profissional;
- serviços;
- horário real;
- início e conclusão;
- preço final e desconto.

Status geral: **pendente**.

## Épico 12 — Pagamentos

**Objetivo:** registrar pagamentos simples vinculados a atendimentos.

Escopo conhecido:

- métodos `PIX`, `CASH`, `DEBIT_CARD`, `CREDIT_CARD` e `OTHER`;
- `Attendance.finalTotalInCents`;
- `Attendance.paidTotalInCents`;
- `Attendance.paymentStatus`;
- `Payment.attendanceId`;
- `Payment.amountInCents`;
- `Payment.method`;
- `Payment.paidAt`;
- vários pagamentos por atendimento;
- divisão entre métodos;
- `paymentStatus` derivado como `PENDING`, `PARTIAL` ou `PAID` pela soma dos pagamentos;
- valores em centavos;
- ausência de financeiro completo.

Status geral: **pendente**.

## Épico 13 — Histórico técnico e retornos

**Objetivo:** preservar o que ocorreu no atendimento e orientar o retorno.

Escopo conhecido:

- serviços realizados;
- snapshots de nome, preço e duração;
- fórmulas;
- cores e tonalidades;
- produtos utilizados;
- condição do cabelo;
- observações;
- cuidados recomendados;
- recomendação de retorno.

Status geral: **pendente**.

## Épico 14 — Fotos

**Objetivo:** registrar fotos autorizadas com armazenamento protegido.

Escopo conhecido:

- autorização registrada da cliente;
- fotos antes e depois;
- bucket privado do Supabase Storage;
- banco com metadados e caminhos;
- acesso protegido no contexto do salão.

Status geral: **pendente**.

## Épico 15 — Dashboard

**Objetivo:** disponibilizar o dashboard inicial do salão.

Escopo conhecido:

- agendamentos de hoje;
- próximos horários;
- atendimentos em andamento;
- atendimentos concluídos;
- cancelamentos;
- `NO_SHOW`;
- quantidade de clientes;
- serviços mais realizados;
- valores básicos dos atendimentos concluídos;
- clientes com retorno próximo;
- indicadores financeiros completos restritos a `OWNER` e `ADMIN`.

Status geral: **pendente**.

## Épico 16 — Auditoria

**Objetivo:** implementar auditoria com `AuditLog`.

Eventos mínimos:

- alteração de papel;
- remoção ou desativação de acesso;
- alteração de configurações;
- reagendamento;
- cancelamento;
- alteração de pagamento;
- edição de atendimento concluído;
- arquivamento de cliente;
- desativação de profissional.

Dados mínimos:

- `salonId`;
- `userId`;
- ação;
- entidade;
- `entityId`;
- valor anterior quando aplicável;
- valor novo quando aplicável;
- data/hora.

Restrições:

- usuários comuns não podem editar `AuditLog`;
- senha, token e segredo nunca podem ser armazenados;
- a política de retenção ainda deve ser definida.

Status geral: **pendente**.

## Épico 17 — Segurança e qualidade

**Objetivo:** revisar e fortalecer as garantias transversais do MVP.

Escopo conhecido:

- isolamento entre salões;
- autorização no backend;
- validação de `salonId`;
- proteção de segredos;
- proteção do acesso a fotos;
- TypeScript estrito;
- qualidade das regras relevantes.

Status geral: **pendente**.

## Épico 18 — Testes

**Objetivo:** validar regras e fluxos do MVP.

Ferramentas planejadas:

- Jest;
- Supertest;
- Playwright.

Prioridades conhecidas:

- isolamento multiempresa;
- autorização;
- estados, transições e conflitos de agenda;
- preservação de snapshots;
- pagamentos divididos e derivação de `paymentStatus`;
- acesso protegido a fotos;
- eventos e proteção de `AuditLog`.

Status geral: **pendente**.

## Épico 19 — Deploy

**Objetivo:** publicar o MVP após definição do ambiente de execução.

O processo e os provedores de deploy ainda não foram definidos.

Status geral: **pendente**.

## Épico 20 — Beta com primeiro salão

**Objetivo:** validar o MVP com o primeiro salão em ambiente real.

Escopo conhecido:

- uso real dos fluxos essenciais;
- validação da base multiempresa;
- registro de aprendizados antes da expansão.

Critérios e métricas do beta ainda não foram definidos.

Status geral: **pendente**.

## Sprint 1 — Fundação

| Item | Status |
| --- | --- |
| Criação do repositório | Concluída |
| Criação do monorepo base | Concluída |
| Next.js | Concluída |
| NestJS | Concluída |
| Health check | Concluída |
| TypeScript compartilhado | Concluída |
| ESLint/Prettier | Concluída |
| Variáveis de ambiente | Concluída |
| Packages compartilhados | Parcialmente preparados |
| Scripts da raiz | Concluída |
| CI | Pendente |
| AGENTS.md/documentação | Concluída |

Nenhum item pendente deve ser marcado como concluído antes de sua implementação e validação.

## Backlog posterior ao MVP

- onboarding comercial;
- planos;
- assinaturas;
- cobrança da assinatura;
- agendamento público;
- WhatsApp;
- automações;
- financeiro;
- comissões;
- estoque;
- inteligência artificial.
