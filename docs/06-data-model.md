# Modelo de dados

## Objetivo

Este documento descreve o modelo conceitual planejado. Ele não representa schema Prisma, migrações ou tabelas já implementadas.

## Princípio multiempresa

Toda entidade operacional deve permanecer no contexto de um `Salon`. A associação pode ser direta ou garantida por uma relação pai, conforme a modelagem física futura, mas consultas e comandos devem sempre conseguir aplicar e validar o `salonId`.

O banco será compartilhado entre salões. O isolamento depende de modelagem consistente e autorização obrigatória no backend.

## Identidade e salões

### User

Representa uma conta global autenticável. Não define sozinho o acesso operacional a nenhum salão.

### Salon

Representa um salão e funciona como limite de isolamento dos dados operacionais.

### SalonMember

Representa o vínculo entre `User` e `Salon`.

Responsabilidades conceituais:

- indicar a participação do usuário no salão;
- registrar se o vínculo está ativo;
- atribuir um papel do MVP ao vínculo.

Relações:

- um `User` pode possuir vários vínculos;
- um `Salon` pode possuir vários vínculos;
- o papel pertence ao vínculo, permitindo papéis diferentes por salão.

## Funcionamento do salão

### SalonBusinessHour

Representa dias e horários regulares de funcionamento, incluindo os intervalos configurados pelo salão.

### SalonCalendarBlock

Representa dias fechados ou bloqueios de calendário definidos pelo salão.

## Profissionais

### Professional

Representa uma pessoa que presta serviços e participa da agenda. É diferente de `User` e pode existir sem login.

Possui `userId` opcional para o vínculo com uma conta quando precisar acessar o sistema.

Restrições conceituais:

- dentro do mesmo salão, um `User` pode estar associado a no máximo um `Professional`;
- o mesmo `User` pode estar associado a um `Professional` diferente em outro salão;
- o vínculo não concede acesso sem um `SalonMember` ativo e autorizado.

### ProfessionalService

Representa a relação entre profissionais e serviços:

- um profissional pode realizar vários serviços;
- um serviço pode ser realizado por vários profissionais.

### ProfessionalWorkSchedule

Representa a disponibilidade regular própria de um profissional.

### ProfessionalCalendarBlock

Representa bloqueios específicos na disponibilidade de um profissional.

## Serviços

### Service

Representa um serviço pertencente ao catálogo de um salão.

Dados conceituais conhecidos:

- nome;
- preço padrão em centavos;
- duração padrão.

Preço e duração podem receber valores diferentes no contexto de cliente ou agendamento. O cadastro atual não deve ser usado para reescrever históricos.

## Clientes

### Client

Representa uma cliente no contexto operacional do salão.

Cadastro inicialmente previsto:

- nome;
- telefone normalizado;
- e-mail;
- data de nascimento;
- tipo ou características do cabelo;
- observações;
- autorização para fotos.

O telefone auxilia a detecção de possíveis duplicidades, mas não possui unicidade obrigatória.

## Agenda

### Appointment

Representa uma reserva futura.

Relações conceituais:

- pertence ao contexto de um salão;
- referencia cliente e profissional;
- possui um ou mais serviços por meio de `AppointmentService`;
- pode originar um atendimento;
- pode ser cancelado ou resultar em ausência.

Estados previstos:

- `SCHEDULED`;
- `CONFIRMED`;
- `IN_PROGRESS`;
- `COMPLETED`;
- `CANCELED`;
- `NO_SHOW`.

Estados que ocupam horário para a regra de conflito:

- `SCHEDULED`;
- `CONFIRMED`;
- `IN_PROGRESS`.

`CANCELED` e `NO_SHOW` liberam o horário. `COMPLETED` permanece como histórico.

Transições permitidas inicialmente:

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

### AppointmentService

Representa os serviços selecionados para um agendamento. Deve comportar os valores aplicáveis ao agendamento quando preço ou duração diferirem do padrão.

## Atendimentos

### Attendance

Representa um atendimento realmente iniciado ou realizado.

Pode:

- estar relacionado a um `Appointment`;
- existir sem agendamento, no caso de atendimento avulso.

Mantém o contexto de cliente, profissional, horário real, desconto, histórico, pagamentos e retorno.

Dados financeiros decididos:

- `finalTotalInCents`;
- `paidTotalInCents`;
- `paymentStatus`.

`paidTotalInCents` corresponde à soma dos pagamentos associados. `paymentStatus` é derivado dessa soma em relação a `finalTotalInCents`.

### AttendanceService

Representa um serviço efetivamente realizado no atendimento.

Deve preservar snapshots dos dados históricos usados, incluindo:

- nome do serviço;
- preço;
- duração.

Alterações futuras em `Service` não podem modificar esses valores.

### TechnicalRecord

Representa o histórico técnico de um atendimento, podendo conter:

- fórmulas;
- cores e tonalidades;
- produtos utilizados;
- condição do cabelo;
- observações;
- cuidados recomendados.

### Payment

Representa cada pagamento individual vinculado a um atendimento.

Dados decididos:

- `attendanceId`;
- `amountInCents`;
- `method`, com valor `PIX`, `CASH`, `DEBIT_CARD`, `CREDIT_CARD` ou `OTHER`;
- `paidAt`.

Um `Attendance` pode possuir vários `Payment`, permitindo dividir o valor entre métodos.

Derivação de `paymentStatus`:

- soma dos pagamentos igual a zero → `PENDING`;
- soma menor que `finalTotalInCents` → `PARTIAL`;
- soma igual ou maior que `finalTotalInCents` → `PAID`.

Todos os valores monetários permanecem em centavos.

### AttendancePhoto

Representa os metadados e o caminho de uma foto antes ou depois do atendimento. O arquivo fica em bucket privado do Supabase Storage e depende de autorização registrada da cliente.

### ReturnRecommendation

Representa uma recomendação de retorno associada ao atendimento e à cliente no contexto do salão.

## Auditoria

### AuditLog

Representa o registro de uma ação auditável.

Deve permitir identificar:

- `salonId`;
- `userId`;
- ação;
- entidade;
- `entityId`;
- valor anterior, quando aplicável;
- valor novo, quando aplicável;
- data/hora.

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

O registro não pode ser editado por usuários comuns e nunca deve armazenar senha, token ou segredo.

## Relações principais

```text
User ──< SalonMember >── Salon
                           │
                           ├── SalonBusinessHour
                           ├── SalonCalendarBlock
                           ├── Professional
                           │    ├── ProfessionalWorkSchedule
                           │    ├── ProfessionalCalendarBlock
                           │    └── ProfessionalService >── Service
                           ├── Client
                           ├── Appointment
                           │    └── AppointmentService >── Service
                           ├── Attendance
                           │    ├── AttendanceService
                           │    ├── TechnicalRecord
                           │    ├── Payment
                           │    ├── AttendancePhoto
                           │    └── ReturnRecommendation
                           └── AuditLog

Appointment ──> Attendance (opcional)
Attendance sem Appointment = atendimento avulso
Professional ──> User (por `userId` opcional; no máximo um por salão e usuário)
```

## Lista consolidada de entidades planejadas

```text
User
Salon
SalonMember

SalonBusinessHour
SalonCalendarBlock

Professional
ProfessionalService
ProfessionalWorkSchedule
ProfessionalCalendarBlock

Service

Client

Appointment
AppointmentService

Attendance
AttendanceService
TechnicalRecord
Payment
AttendancePhoto
ReturnRecommendation

AuditLog
```

Nenhuma dessas entidades está implementada nesta etapa.

## Decisões pendentes de modelagem física

- campos técnicos, identificadores e índices;
- precedência entre horários gerais, disponibilidade profissional e bloqueios;
- política de retenção de `AuditLog`;
- detalhes de metadados de fotos.

Essas decisões devem preservar as regras descritas sem adicionar funcionalidades ao MVP.
