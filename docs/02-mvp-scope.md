# Escopo do MVP

## Objetivo

O MVP do Beauty SaaS deve permitir que um salão opere seus fluxos essenciais em uma plataforma preparada para múltiplos salões. A primeira implantação real validará o produto, mas os dados e acessos continuarão modelados por salão.

## Incluído no MVP

### Contas, salões e equipe

- conta global de usuário;
- cadastro de salão;
- vínculo entre usuário e salão;
- múltiplos salões por usuário;
- papel específico por vínculo;
- papéis `OWNER`, `ADMIN`, `RECEPTIONIST` e `PROFESSIONAL`;
- validação de vínculo ativo, salão e papel no backend.

### Configuração operacional do salão

- dias de funcionamento;
- horários;
- intervalos;
- dias fechados;
- bloqueios de calendário;
- disponibilidade própria de profissionais.

### Profissionais e serviços

- profissionais com ou sem conta de acesso;
- `Professional` diferente de `User`;
- `userId` opcional em `Professional` quando for necessário login;
- no máximo um `Professional` associado ao mesmo `User` dentro de um salão;
- possibilidade de o mesmo `User` possuir um `Professional` diferente em outro salão;
- catálogo de serviços próprio de cada salão;
- relação muitos-para-muitos entre profissionais e serviços;
- preço e duração padrão;
- possibilidade de variar preço e duração por cliente ou agendamento.

### Clientes

- nome;
- telefone;
- e-mail;
- data de nascimento;
- tipo ou características do cabelo;
- observações;
- autorização para fotos;
- normalização do telefone;
- alerta de possível duplicidade por telefone sem exigir unicidade.

### Agenda

- criação e gestão de agendamentos;
- profissional, cliente, serviços e período do agendamento;
- estados `SCHEDULED`, `CONFIRMED`, `IN_PROGRESS`, `COMPLETED`, `CANCELED` e `NO_SHOW`;
- `SCHEDULED`, `CONFIRMED` e `IN_PROGRESS` ocupando horário para a regra de conflito;
- `CANCELED` e `NO_SHOW` liberando o horário;
- `COMPLETED` preservado como histórico;
- transições básicas de estado definidas em [Fluxos de usuário](03-user-flows.md);
- prevenção obrigatória de sobreposição entre agendamentos que ocupam horário do mesmo profissional;
- permissão de horários consecutivos.

### Atendimentos

- atendimento originado de agendamento;
- atendimento avulso sem reserva antecipada;
- cliente, profissional, serviços e horário real;
- início e conclusão do atendimento;
- histórico técnico;
- snapshots dos dados de serviço utilizados no atendimento.

### Histórico técnico e retorno

- fórmulas;
- cores e tonalidades;
- produtos utilizados;
- condição do cabelo;
- observações;
- cuidados recomendados;
- fotos antes e depois, quando autorizadas;
- preço final e desconto;
- recomendação de retorno.

### Pagamentos simples

- pagamentos ligados a atendimentos;
- métodos `PIX`, `CASH`, `DEBIT_CARD`, `CREDIT_CARD` e `OTHER`;
- divisão do pagamento entre métodos;
- estados `PENDING`, `PARTIAL` e `PAID`;
- `Attendance` mantendo `finalTotalInCents`, `paidTotalInCents` e `paymentStatus`;
- cada `Payment` mantendo `attendanceId`, `amountInCents`, `method` e `paidAt`;
- `paymentStatus` derivado da soma dos pagamentos;
- valores financeiros armazenados em centavos.

### Dashboard inicial

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

### Fotos

- registro da autorização da cliente;
- arquivos em bucket privado do Supabase Storage;
- banco de dados contendo somente metadados e caminhos;
- acesso protegido aos arquivos.

### Auditoria

- entidade `AuditLog` prevista no modelo;
- registro inicial de alterações de papel, acesso, configurações, agenda, pagamentos, atendimentos concluídos, arquivamento de cliente e desativação de profissional;
- identificação de `salonId`, `userId`, ação, entidade, `entityId`, valores anterior e novo quando aplicáveis e data/hora;
- proibição de edição por usuários comuns;
- proibição de armazenar senha, token ou segredo.

## Fora do MVP

- onboarding comercial;
- planos, assinaturas e cobrança da assinatura;
- agendamento público;
- WhatsApp;
- automações;
- financeiro completo;
- comissões;
- estoque;
- inteligência artificial;
- aplicativo nativo.

## Limites técnicos iniciais

- monorepo gerenciado com pnpm;
- frontend em Next.js, React e TypeScript, usando App Router e Tailwind CSS;
- backend em NestJS, Node.js e TypeScript;
- API REST;
- PostgreSQL hospedado no Supabase;
- Prisma ORM;
- Supabase Auth;
- Supabase Storage privado;
- monólito modular;
- Git e GitHub;
- desenvolvimento assistido por Codex;
- testes planejados com Jest, Supertest e Playwright.

## Não adotado inicialmente

- microserviços;
- Kubernetes;
- Redis;
- GraphQL;
- banco separado por salão.

## Condições obrigatórias

- dados operacionais devem ser isolados por salão;
- autorização deve ocorrer no backend;
- conflitos de agenda não podem ser ignorados no MVP;
- históricos não podem mudar quando o cadastro de um serviço for atualizado;
- fotos não podem ser registradas sem autorização;
- pagamentos representam somente valores ligados a atendimentos, não um módulo financeiro completo.

## Itens ainda não definidos

Detalhes de interface, métricas comerciais além dos indicadores do dashboard inicial, regras de cobrança, automações e comportamentos não descritos nesta documentação não fazem parte da definição atual. Qualquer inclusão exige decisão explícita antes da implementação.
