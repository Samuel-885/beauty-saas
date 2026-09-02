# Visão do produto

## Produto

Beauty SaaS é uma plataforma SaaS multiempresa para gestão de salões de beleza. O produto deve centralizar informações operacionais hoje distribuídas entre agendas, anotações e ferramentas isoladas, preservando o contexto de cada salão.

O sistema nasce preparado para vários salões e vários usuários. O primeiro salão será o ambiente real de validação do produto, sem transformar sua operação em uma exceção arquitetural.

## Problema central

A operação de um salão depende da relação entre agenda, clientes, profissionais, serviços e atendimentos. Quando essas informações não compartilham o mesmo contexto, o histórico técnico se perde, conflitos de agenda ficam mais prováveis e retornos de clientes são difíceis de acompanhar.

O Beauty SaaS busca reunir esse contexto em uma única plataforma, com isolamento entre salões e autorização coerente com o papel de cada usuário.

## Objetivo do MVP

Validar, em uso real, uma base operacional capaz de centralizar:

- agenda;
- clientes;
- profissionais;
- serviços;
- atendimentos;
- histórico técnico;
- pagamentos simples vinculados a atendimentos;
- recomendações de retorno.

O MVP não pretende cobrir toda a gestão financeira ou comercial de um salão. Seu objetivo é validar o fluxo operacional essencial e a utilidade do histórico para o atendimento.

## Princípios do produto

### Multiempresa desde a origem

Toda informação operacional pertence ao contexto de um salão. Um usuário somente pode acessar um salão por meio de vínculo ativo e pode possuir papéis diferentes em salões diferentes.

### Backend como autoridade

O frontend pode adaptar a interface ao papel do usuário, mas a autorização deve ser verificada pelo backend. Esconder ações na interface não é uma medida de segurança suficiente.

### Histórico preservado

Um atendimento representa o que realmente aconteceu. Alterações posteriores no catálogo de serviços não podem modificar o histórico registrado.

### Operação antes de automação

O primeiro objetivo é tornar os fluxos essenciais consistentes. Automações e integrações serão adicionadas somente após a validação dessa base.

### Evolução simples e modular

O produto começará como monólito modular em monorepo. Soluções distribuídas e abstrações antecipadas não fazem parte da etapa inicial.

## Evolução posterior ao MVP

Estão planejados para depois do MVP:

- onboarding comercial;
- planos e assinaturas;
- cobrança da assinatura;
- agendamento público;
- WhatsApp;
- automações;
- financeiro completo;
- comissões;
- estoque;
- inteligência artificial.

Esses itens não fazem parte do escopo funcional inicial.

## Restrições iniciais

Não serão utilizados inicialmente:

- microserviços;
- Kubernetes;
- Redis;
- GraphQL;
- banco de dados separado por salão;
- aplicativo nativo.

## Critério de direção

As decisões do MVP devem favorecer a validação segura da operação do primeiro salão sem comprometer a capacidade multiempresa. Funcionalidades não descritas no escopo devem ser discutidas antes de entrar no backlog.
