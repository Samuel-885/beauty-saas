# Papéis e permissões

## Modelo de acesso

`User` representa a conta global. `Salon` representa um salão. `SalonMember` representa o vínculo entre ambos e contém o papel do usuário naquele salão.

Um usuário pode participar de vários salões e ter um papel diferente em cada vínculo. Permissões nunca são globais por conta: elas devem ser avaliadas no contexto do salão solicitado.

## Regras permanentes de autorização

- todo acesso operacional exige um `salonId` válido;
- o backend deve verificar identidade, vínculo ativo, salão e papel;
- um vínculo com um salão não concede acesso a outro;
- esconder botões no frontend não substitui autorização;
- consultas e alterações devem permanecer limitadas ao salão autorizado;
- ações ausentes da matriz não recebem autorização presumida.

## Matriz de permissões do MVP

| Papel | Permissões | Limites explícitos |
| --- | --- | --- |
| `OWNER` | Acesso completo ao salão; configurações; equipe; serviços; clientes; agenda; atendimentos; pagamentos; dashboard; auditoria; gerenciamento de papéis. | Nenhum limite operacional adicional foi definido para o MVP. |
| `ADMIN` | Operação completa do salão; equipe; profissionais; serviços; clientes; agenda; atendimentos; pagamentos; dashboard. | Não pode remover ou substituir o `OWNER`; não possui ações reservadas à propriedade do SaaS. |
| `RECEPTIONIST` | Visualizar agenda geral; cadastrar e editar dados básicos de clientes; criar, confirmar, reagendar e cancelar agendamentos; registrar `NO_SHOW`; iniciar atendimento na chegada; iniciar atendimento avulso; registrar pagamentos; visualizar histórico operacional. | Não gerencia equipe, permissões ou configurações gerais; não altera registros técnicos de atendimentos concluídos; não acessa dashboard financeiro completo nem auditoria completa. |
| `PROFESSIONAL` | Visualizar agenda geral; criar e alterar seus próprios agendamentos; iniciar atendimento próprio; iniciar atendimento avulso próprio; concluir atendimento próprio; registrar fórmulas, produtos, observações e fotos autorizadas; registrar recomendação de retorno; alterar sua própria disponibilidade quando permitido. | Não altera agendamentos de outros profissionais; não gerencia usuários, serviços ou configurações gerais; não acessa dashboard financeiro completo nem auditoria completa. |

Indicadores financeiros completos ficam restritos a `OWNER` e `ADMIN`.

## Professional não é User

`Professional` representa quem presta serviços e participa da agenda. `User` representa quem possui uma conta de acesso.

Um profissional pode existir sem login. Quando precisar acessar o sistema, poderá ser vinculado a um usuário. A existência na agenda, portanto, não concede automaticamente credenciais ou permissões.

`Professional` possui `userId` opcional. Dentro do mesmo salão, um `User` pode estar associado a no máximo um `Professional`. O mesmo `User` pode possuir um `Professional` diferente em outro salão.

Esse vínculo não substitui `SalonMember`: o backend continua obrigado a validar a conta, o vínculo ativo, o papel e o `salonId`.

## Aplicação da matriz

Toda autorização deve ser validada no backend. O frontend pode ocultar ou desabilitar ações para melhorar a experiência, mas nunca é a autoridade de acesso.
