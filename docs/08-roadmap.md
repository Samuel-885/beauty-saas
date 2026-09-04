# Roadmap

## Princípios de execução

- Cada etapa deve preservar o isolamento multiempresa.
- Regras e autorização devem permanecer no backend.
- Uma etapa não deve ser marcada como concluída antes de estar implementada e validada.
- A sequência pode ser refinada, mas qualquer mudança de escopo exige decisão explícita.
- O primeiro salão valida o produto sem receber uma arquitetura exclusiva.

## Etapas do MVP

### 1. Fundação — em andamento

Preparar repositório, monorepo, documentação, aplicações base, configurações compartilhadas, scripts e integração contínua.

O repositório, o monorepo base e a documentação estão concluídos. As aplicações iniciais de frontend com Next.js e backend com NestJS foram inicializadas. As demais configurações técnicas da fundação continuam pendentes ou em andamento conforme o backlog.

### 2. Banco e Supabase — pendente

Preparar PostgreSQL no Supabase, Prisma e a base do modelo de dados multiempresa.

### 3. Autenticação — pendente

Integrar Supabase Auth, JWT e identificação da conta global na API.

### 4. Multiempresa — pendente

Implementar salões, vínculos ativos, seleção de salão e isolamento por `salonId`.

### 5. Equipe e permissões — pendente

Implementar a matriz definida para `OWNER`, `ADMIN`, `RECEPTIONIST` e `PROFESSIONAL` no contexto de `SalonMember`.

### 6. Configurações do salão — pendente

Implementar funcionamento, horários, intervalos, dias fechados e bloqueios.

### 7. Profissionais — pendente

Implementar profissionais, `userId` opcional, unicidade da associação entre usuário e profissional por salão e disponibilidade própria.

### 8. Serviços — pendente

Implementar catálogo por salão, preço, duração e relação entre profissionais e serviços.

### 9. Clientes — pendente

Implementar cadastro, normalização de telefone, alerta de duplicidade e autorização para fotos.

### 10. Agenda — pendente

Implementar agendamentos, transições básicas definidas, disponibilidade e prevenção obrigatória de sobreposição para `SCHEDULED`, `CONFIRMED` e `IN_PROGRESS`.

### 11. Atendimentos — pendente

Implementar atendimentos originados de agendamento e atendimentos avulsos.

### 12. Pagamentos — pendente

Implementar pagamentos simples por atendimento, divisão por métodos, totais em centavos e `paymentStatus` derivado da soma dos pagamentos.

### 13. Histórico técnico e retornos — pendente

Implementar registros técnicos, snapshots de serviços e recomendações de retorno.

### 14. Fotos — pendente

Implementar autorização, metadados e armazenamento privado no Supabase Storage.

### 15. Dashboard — pendente

Implementar o dashboard inicial com agenda de hoje, próximos horários, estados dos atendimentos, cancelamentos, `NO_SHOW`, quantidade de clientes, serviços mais realizados, valores básicos de atendimentos concluídos e retornos próximos. Restringir indicadores financeiros completos a `OWNER` e `ADMIN`.

### 16. Auditoria — pendente

Implementar `AuditLog` para os eventos mínimos definidos, identificando salão, usuário, ação, entidade, registro afetado, alterações e data/hora, sem permitir edição por usuários comuns ou armazenamento de segredos.

### 17. Segurança e qualidade — pendente

Revisar autorização, isolamento, proteção de segredos, validações e qualidade técnica.

### 18. Testes — pendente

Consolidar a cobertura planejada com Jest, Supertest e Playwright para regras e fluxos relevantes.

### 19. Deploy — pendente

Definir e executar a publicação dos componentes do MVP.

### 20. Beta com primeiro salão — pendente

Validar o MVP em ambiente real com o primeiro salão e registrar os aprendizados antes da expansão.

## Depois do MVP

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

Esses itens não devem ser antecipados durante a execução do MVP sem autorização de escopo.
