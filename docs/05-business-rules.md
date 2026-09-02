# Regras de negócio

## 1. Multiempresa e autorização

1. Toda informação operacional deve estar associada ao contexto de um salão.
2. Um usuário somente pode acessar um salão quando possuir um `SalonMember` ativo para ele.
3. O papel deve ser obtido do vínculo com o salão, não apenas da conta global.
4. Um mesmo usuário pode ter papéis diferentes em salões diferentes.
5. O backend deve validar usuário, vínculo ativo, `salonId` e papel em operações protegidas.
6. O frontend não é uma fronteira de autorização. Ocultar componentes não protege uma operação.
7. Consultas e alterações nunca podem misturar dados operacionais de salões diferentes.
8. O MVP usará banco compartilhado entre salões, não um banco separado por salão.

## 2. Usuários, membros e profissionais

1. `User` é a conta global de acesso.
2. `SalonMember` é o vínculo entre `User` e `Salon` e define o papel naquele salão.
3. `Professional` é uma entidade operacional diferente de `User`.
4. Um profissional pode existir na agenda sem possuir login.
5. `Professional` possui `userId` opcional para quando precisar acessar o sistema.
6. Dentro do mesmo salão, um `User` pode estar associado a no máximo um `Professional`.
7. O mesmo `User` pode possuir um `Professional` diferente em outro salão.
8. O vínculo de um profissional com um usuário não elimina a necessidade de validar `SalonMember` e papel.

## 3. Papéis

1. Os papéis do MVP são `OWNER`, `ADMIN`, `RECEPTIONIST` e `PROFESSIONAL`.
2. O `OWNER` possui acesso administrativo completo ao salão.
3. O `ADMIN` gerencia a operação, mas não pode remover o proprietário nem executar ações reservadas ao `OWNER`.
4. O `RECEPTIONIST` atua nos fluxos operacionais descritos e não possui acesso administrativo completo.
5. O `PROFESSIONAL` atua sobre sua agenda e seus atendimentos.
6. O `PROFESSIONAL` não pode alterar agendamentos de outros profissionais.
7. A matriz explícita de permissões está em [Papéis e permissões](04-roles-and-permissions.md).
8. Operações não atribuídas explicitamente a um papel não devem receber autorização presumida.

## 4. Serviços

1. Cada salão possui seu próprio catálogo de serviços.
2. Um profissional pode realizar vários serviços.
3. Um serviço pode ser realizado por vários profissionais.
4. Serviços possuem preço e duração padrão.
5. Preço e duração podem variar por cliente ou agendamento.
6. Valores financeiros devem ser armazenados em centavos.
7. Alterações futuras no cadastro de serviços não podem modificar históricos de atendimentos anteriores.
8. Nome, preço e duração efetivamente usados no atendimento devem ser preservados em snapshots.

Exemplos de serviços que o catálogo pode representar:

- corte;
- coloração;
- mechas;
- moreno iluminado;
- progressiva;
- alisamento orgânico;
- tratamento capilar;
- cronograma capilar;
- escova;
- serviços para cabelos cacheados;
- serviços de unhas.

## 5. Funcionamento e disponibilidade

1. Cada salão configura dias de funcionamento, horários, intervalos, dias fechados e bloqueios.
2. Cada profissional pode possuir disponibilidade própria.
3. Bloqueios do salão e do profissional devem ser considerados ao validar horários.
4. O detalhamento de precedência entre horários gerais, disponibilidade profissional e bloqueios deve ser fechado antes da implementação da agenda.

## 6. Agendamentos

1. `Appointment` representa uma reserva futura.
2. Um agendamento relaciona o contexto de salão, cliente, profissional, serviços e período reservado.
3. O mesmo profissional não pode possuir dois agendamentos ativos sobrepostos.
4. Não existe opção de ignorar um conflito no MVP.
5. Horários consecutivos são permitidos porque não possuem sobreposição.

Exemplo permitido:

```text
09:00–11:00
11:00–12:00
```

6. Os estados de agendamento são:
   - `SCHEDULED`;
   - `CONFIRMED`;
   - `IN_PROGRESS`;
   - `COMPLETED`;
   - `CANCELED`;
   - `NO_SHOW`.
7. Para a regra de conflito, ocupam horário:
   - `SCHEDULED`;
   - `CONFIRMED`;
   - `IN_PROGRESS`.
8. `CANCELED` e `NO_SHOW` liberam o horário.
9. `COMPLETED` permanece como histórico.
10. As transições básicas permitidas são somente:

```text
SCHEDULED
 ├── CONFIRMED
 ├── CANCELED
 └── NO_SHOW

CONFIRMED
 ├── IN_PROGRESS
 ├── CANCELED
 └── NO_SHOW

IN_PROGRESS
 └── COMPLETED
```

11. Não devem ser presumidas outras transições.
12. Um agendamento pode gerar atendimento, ser cancelado ou resultar em ausência conforme essas transições.

## 7. Atendimentos

1. `Attendance` representa um atendimento realmente iniciado ou realizado.
2. Um atendimento pode nascer de um agendamento.
3. Um atendimento também pode existir sem agendamento, como atendimento avulso.
4. Um atendimento avulso deve possuir cliente, profissional, serviços, horário real, histórico e pagamento quando registrado.
5. O atendimento avulso não cria reserva antecipada na agenda.
6. O atendimento deve preservar os dados dos serviços efetivamente usados por meio de snapshots.
7. O preço final e o desconto pertencem ao contexto histórico do atendimento.

## 8. Clientes

1. O cadastro inicialmente previsto contém:
   - nome;
   - telefone;
   - e-mail;
   - data de nascimento;
   - tipo ou características do cabelo;
   - observações;
   - autorização para fotos.
2. O telefone deve ser normalizado.
3. O telefone deve ajudar a alertar sobre possíveis duplicidades.
4. O telefone não é obrigatoriamente único.
5. O tratamento de duplicidade deve respeitar o isolamento do salão.

## 9. Histórico técnico

Um atendimento pode registrar:

- serviços realizados;
- profissional;
- fórmulas;
- cores e tonalidades;
- produtos utilizados;
- condição do cabelo;
- observações;
- cuidados recomendados;
- fotos antes e depois;
- preço final;
- desconto;
- pagamentos;
- recomendação de retorno.

O histórico pertence ao atendimento e não deve ser recalculado a partir de cadastros atuais.

## 10. Pagamentos

1. O MVP não possui financeiro completo.
2. Pagamentos existem somente vinculados a atendimentos.
3. `Attendance` mantém:
   - `finalTotalInCents`;
   - `paidTotalInCents`;
   - `paymentStatus`.
4. `Payment` representa cada pagamento individual e mantém:
   - `attendanceId`;
   - `amountInCents`;
   - `method`;
   - `paidAt`.
5. Um `Attendance` pode possuir vários `Payment`.
6. Os métodos aceitos no MVP são:
   - `PIX`;
   - `CASH`;
   - `DEBIT_CARD`;
   - `CREDIT_CARD`;
   - `OTHER`.
7. Deve ser possível dividir o valor entre métodos.
8. `paidTotalInCents` corresponde à soma de `amountInCents` dos pagamentos do atendimento.
9. `paymentStatus` é derivado dessa soma:
   - zero pago → `PENDING`;
   - menor que `finalTotalInCents` → `PARTIAL`;
   - igual ou maior que `finalTotalInCents` → `PAID`.
10. Todo valor monetário deve ser armazenado em centavos.
11. Regras de estorno, contas a pagar, fluxo de caixa e conciliação não estão definidas no MVP.

## 11. Fotos

1. Fotos exigem autorização registrada da cliente.
2. Sem autorização, fotos não devem ser registradas.
3. Os arquivos devem ficar em bucket privado do Supabase Storage.
4. O banco armazena somente metadados e caminhos, não o conteúdo do arquivo.
5. O acesso ao arquivo deve ser protegido e autorizado no contexto do salão.

## 12. Recomendações de retorno

1. A recomendação de retorno é registrada no contexto de um atendimento.
2. Ela deve permanecer relacionada à cliente e ao salão daquele atendimento.
3. Automação de lembrete, WhatsApp ou contato não faz parte do MVP.

## 13. Dashboard inicial

1. O dashboard inicial pertence ao contexto de um salão.
2. Seu escopo no MVP inclui:
   - agendamentos de hoje;
   - próximos horários;
   - atendimentos em andamento;
   - atendimentos concluídos;
   - cancelamentos;
   - `NO_SHOW`;
   - quantidade de clientes;
   - serviços mais realizados;
   - valores básicos dos atendimentos concluídos;
   - clientes com retorno próximo.
3. Indicadores financeiros completos são restritos a `OWNER` e `ADMIN`.
4. Toda consulta do dashboard deve validar vínculo, papel e `salonId` no backend.

## 14. Auditoria

1. `AuditLog` faz parte do modelo planejado.
2. Devem gerar `AuditLog` pelo menos:
   - alteração de papel;
   - remoção ou desativação de acesso;
   - alteração de configurações;
   - reagendamento;
   - cancelamento;
   - alteração de pagamento;
   - edição de atendimento concluído;
   - arquivamento de cliente;
   - desativação de profissional.
3. O registro deve permitir identificar:
   - `salonId`;
   - `userId`;
   - ação;
   - entidade;
   - `entityId`;
   - valor anterior, quando aplicável;
   - valor novo, quando aplicável;
   - data/hora.
4. `AuditLog` não pode ser editado por usuários comuns.
5. `AuditLog` nunca deve armazenar senha, token ou segredo.
6. A política de retenção ainda deve ser definida antes da implementação.
