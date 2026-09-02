# Fluxos de usuário

## Premissas comuns

Todos os fluxos autenticados devem considerar:

1. a conta global do usuário;
2. o salão selecionado;
3. um vínculo ativo entre usuário e salão;
4. o papel atribuído ao vínculo;
5. a autorização da ação no backend.

O frontend apresenta somente as ações pertinentes, mas não substitui essas validações.

## 1. Acesso a um salão

1. O usuário autentica sua conta pelo Supabase Auth.
2. O frontend recebe a sessão e envia o JWT para a API NestJS.
3. O backend verifica a identidade do usuário.
4. O backend verifica o vínculo ativo com o salão solicitado.
5. O backend identifica o papel daquele vínculo.
6. O acesso é permitido somente ao contexto autorizado.

Um usuário com acesso ao Salão A não obtém acesso ao Salão B sem um vínculo ativo específico com o Salão B.

## 2. Seleção entre vários salões

1. O usuário possui vínculos ativos com mais de um salão.
2. O usuário escolhe o salão em que deseja operar.
3. As consultas e comandos passam a usar o `salonId` selecionado.
4. O backend valida novamente o vínculo e o papel em cada operação protegida.

O papel pode mudar conforme o salão. Por exemplo:

```text
Ana
├── Salão A → PROFESSIONAL
└── Salão B → ADMIN
```

## 3. Cadastro ou identificação de cliente

1. Um usuário autorizado informa os dados da cliente.
2. O telefone é normalizado.
3. O sistema alerta sobre possíveis cadastros duplicados no mesmo contexto operacional.
4. O telefone não é tratado como obrigatoriamente único.
5. O cadastro registra a autorização ou ausência de autorização para fotos.

## 4. Configuração de agenda

1. O salão define dias de funcionamento, horários, intervalos, dias fechados e bloqueios.
2. Quando aplicável, o profissional define ou recebe sua disponibilidade própria.
3. A disponibilidade resultante serve de base para a agenda.
4. Bloqueios do salão e do profissional devem ser respeitados.

## 5. Criação de agendamento

1. Um usuário autorizado seleciona salão, cliente, profissional e serviços.
2. O preço e a duração partem dos valores padrão e podem ser ajustados para o cliente ou agendamento.
3. O período desejado é confrontado com a disponibilidade e os bloqueios.
4. O backend verifica sobreposição com agendamentos ativos do mesmo profissional.
5. Se houver sobreposição, o agendamento não é criado.
6. Se não houver conflito, a reserva é registrada como `Appointment`.

Horários consecutivos são permitidos:

```text
09:00–11:00
11:00–12:00
```

## 6. Gestão de agendamento

Conforme seu papel, um usuário autorizado pode confirmar, reagendar ou cancelar um agendamento. O agendamento também pode resultar em ausência.

Os estados previstos são:

- `SCHEDULED`;
- `CONFIRMED`;
- `IN_PROGRESS`;
- `COMPLETED`;
- `CANCELED`;
- `NO_SHOW`.

Para a regra de conflito, `SCHEDULED`, `CONFIRMED` e `IN_PROGRESS` ocupam horário. `CANCELED` e `NO_SHOW` liberam o horário. `COMPLETED` permanece como histórico.

As transições básicas permitidas são somente:

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

Outras transições não fazem parte da decisão inicial.

## 7. Atendimento originado de agendamento

1. Um agendamento válido chega ao momento do atendimento.
2. Um usuário autorizado inicia o atendimento.
3. É criado um `Attendance` relacionado ao `Appointment`.
4. São registrados horário real, profissional, cliente e serviços efetivamente realizados.
5. O histórico técnico pode ser preenchido durante ou ao final do atendimento.
6. Os dados usados dos serviços são preservados por snapshots.
7. Pagamentos e recomendação de retorno podem ser registrados.
8. O atendimento é concluído.

## 8. Atendimento avulso

1. A cliente chega sem uma reserva antecipada.
2. Um usuário autorizado inicia um atendimento avulso.
3. São informados cliente, profissional, serviços e horário real.
4. O atendimento registra histórico, pagamento e recomendação de retorno quando aplicável.
5. Nenhum `Appointment` é criado retroativamente apenas para representar essa operação.

## 9. Registro técnico

Durante um atendimento, um profissional autorizado pode registrar:

- fórmulas;
- cores e tonalidades;
- produtos utilizados;
- condição do cabelo;
- observações;
- cuidados recomendados;
- fotos autorizadas antes e depois;
- recomendação de retorno.

O registro pertence ao salão do atendimento e não pode ser exposto a outro salão sem vínculo autorizado.

## 10. Registro de fotos

1. O sistema verifica se existe autorização registrada da cliente.
2. Sem autorização, a foto não deve ser registrada.
3. Com autorização, o arquivo é enviado ao bucket privado do Supabase Storage.
4. O banco recebe apenas metadados e o caminho do arquivo.
5. O acesso posterior exige autorização e contexto de salão válidos.

## 11. Pagamento dividido

1. O usuário autorizado informa o valor final e eventual desconto do atendimento em `finalTotalInCents`.
2. Cada pagamento individual é registrado como `Payment`, com `attendanceId`, `amountInCents`, `method` e `paidAt`.
3. Um atendimento pode receber vários pagamentos, permitindo a divisão entre métodos.
4. `paidTotalInCents` mantém a soma dos pagamentos do atendimento.
5. `paymentStatus` é derivado da comparação entre `paidTotalInCents` e `finalTotalInCents`:
   - zero pago → `PENDING`;
   - menor que o total → `PARTIAL`;
   - igual ou maior ao total → `PAID`.

Exemplo:

```text
R$ 100 em PIX
R$ 250 em CREDIT_CARD
```

Esse fluxo não gera contas a pagar, fluxo de caixa ou outras funções de financeiro completo.

## 12. Recomendação de retorno

1. Durante ou ao concluir um atendimento, o profissional registra a recomendação de retorno.
2. A recomendação permanece associada ao atendimento e à cliente no salão.
3. Automações de contato ou WhatsApp não fazem parte do MVP.

## 13. Consulta do dashboard

1. Um usuário autorizado acessa o dashboard no contexto de um salão.
2. O backend valida identidade, vínculo ativo, papel e `salonId`.
3. O dashboard inicial pode apresentar:
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
4. Indicadores financeiros completos ficam restritos a `OWNER` e `ADMIN`.

## 14. Geração de auditoria

Quando uma ação auditável é concluída, o backend gera um `AuditLog` no contexto do salão. O registro identifica quem executou a ação, qual entidade foi afetada e os valores anterior e novo quando aplicáveis.

Usuários comuns não podem editar o `AuditLog`, e o registro nunca deve conter senha, token ou segredo.
