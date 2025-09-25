# API de Notas do Projeto Node.js

Este projeto é uma API robusta para gerenciar notas, construída com Node.js, Express e com foco em uma arquitetura limpa. Ele fornece funcionalidades para autenticação de usuários, criação e gerenciamento de notas, associação de tags a notas e upload de avatares de usuários.

## Funcionalidades

*   **Gerenciamento de Usuários:**
    *   Registro de usuários
    *   Atualização de perfil de usuário
    *   Upload de avatar de usuário
*   **Autenticação:**
    *   Gerenciamento de sessão de usuário (login)
    *   Middleware de autenticação baseado em JWT
*   **Gerenciamento de Notas:**
    *   Criar, ler, atualizar e excluir notas
    *   Pesquisar notas por título e tags
*   **Gerenciamento de Tags:**
    *   Criar e listar tags associadas a notas
*   **Banco de Dados:**
    *   SQLite para desenvolvimento/testes
    *   Knex.js para migrações de banco de dados e construção de consultas

## Tecnologias Utilizadas

*   **Backend:** Node.js, Express.js
*   **Banco de Dados:** SQLite3
*   **ORM/Query Builder:** Knex.js
*   **Autenticação:** JWT (jsonwebtoken), bcryptjs
*   **Upload de Arquivos:** Multer
*   **Testes:** Jest
*   **Variáveis de Ambiente:** dotenv

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos:

*   Node.js (versão LTS recomendada)
*   npm (Node Package Manager) ou Yarn

## Instalação

Para colocar este projeto em funcionamento em sua máquina local, siga estas etapas:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/your-username/node-project-notes.git
    cd node-project-notes
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

    ```
    # Exemplo de conteúdo .env
    PORT=3333
    AUTH_SECRET=default_secret
    # Adicione outras variáveis de ambiente conforme necessário
    ```

4.  **Execute as Migrações do Banco de Dados:**
    Isso criará as tabelas necessárias em seu banco de dados SQLite.

    ```bash
    npx knex migrate:latest
    ```

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A API estará rodando em `http://localhost:3333` (ou na porta especificada em seu arquivo `.env`).

## Endpoints da API

A API fornece as seguintes rotas principais:

*   **Usuários:** `/users`
    *   `POST /users`: Registra um novo usuário.
    *   `PUT /users`: Atualiza o perfil do usuário.
    *   `PATCH /users/avatar`: Atualiza o avatar do usuário.
*   **Sessões:** `/sessions`
    *   `POST /sessions`: Autentica o usuário e cria uma sessão (login).
*   **Notas:** `/notes`
    *   `POST /notes`: Cria uma nova nota.
    *   `GET /notes`: Lista todas as notas (com pesquisa opcional por título/tags).
    *   `GET /notes/:id`: Mostra uma nota específica.
    *   `DELETE /notes/:id`: Exclui uma nota.
*   **Tags:** `/tags`
    *   `GET /tags`: Lista todas as tags para o usuário autenticado.

Consulte os diretórios `src/routes` e `src/controllers` para implementações detalhadas dos endpoints.

## Testes

Este projeto utiliza Jest para testes.

Para executar os testes:

```bash
npm test
# ou
yarn test
```

## Estrutura do Projeto

```
.
├── .env.example
├── .gitignore
├── ecosystem.config.js
├── jest.config.js
├── knexfile.js
├── package.json
├── src/                 
│   ├── configs/             # Configurações da aplicação (autenticação, upload)
│   ├── controllers/         # Lida com requisições de entrada e envia respostas
│   ├── database/            # Configuração do banco de dados, migrações e conexão
│   ├── middlewares/         # Middlewares do Express (ex: autenticação)
│   ├── provider/            # Provedores de armazenamento (ex: DiskStorage para uploads)
│   ├── repositories/        # Camada de acesso a dados
│   ├── routes/              # Definições de rotas da API
│   ├── services/            # Lógica de negócios e casos de uso
│   └── utils/               # Funções utilitárias (ex: tratamento de erros personalizado)
└── tmp/                     # Arquivos temporários, incluindo avatares enviados
```