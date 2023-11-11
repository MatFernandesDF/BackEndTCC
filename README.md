# Back End do TCC

Este é o back end do meu Trabalho de Conclusão de Curso (TCC), que faz parte do meu projeto acadêmico. O back end é desenvolvido usando Yarn, TypeScript, Express, Prisma Client e PostgreSQL para gerenciar a lógica de negócios e os dados do meu aplicativo.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado as seguintes ferramentas:

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
- [Yarn](https://yarnpkg.com/) - Gerenciador de pacotes para instalar as dependências.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript que permite tipagem estática.
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gerenciamento de banco de dados.
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) - ORM para interagir com o PostgreSQL.
- Outras dependências específicas do projeto (listadas no arquivo `package.json`).

## Instalação

1. Clone este repositório:


Acesse a pasta do projeto:
cd back-end-tcc
Instale as dependências com o Yarn:
yarn install
Configuração
Certifique-se de configurar todas as variáveis de ambiente necessárias. Você pode criar um arquivo .env na raiz do projeto e definir as variáveis necessárias lá.

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:admin@localhost:5432/tcc?schema=public"

#Secret JWT
JWT_SECRET=

# STRIPE PAGAMENTOS
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_API_KEY=
STRIPE_SUCCESS_URL=http://localhost:3000/finalizarPedido
STRIPE_CANCEL_URL=http://localhost:3000/formadeconsumo

STRIPE_WEBHOOK_SECRET=


Uso
Inicie o servidor do back end com o seguinte comando:

yarn dev
O servidor estará disponível em http://localhost:3001 por padrão, mas você pode configurar a porta conforme necessário.

Projeto sob a licença MIT 
