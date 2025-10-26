# 📚 API para Sistema de Gerenciamento de Biblioteca 

## 1. Autora

* Pâmela Évelim Silva

## 2. Visão Geral

Esta API RESTful foi desenvolvida para gerenciar o funcionamento de uma biblioteca, permitindo:

Cadastro e consulta de autores, livros, usuários e empréstimos.

Controle automático de disponibilidade dos livros e datas de devolução.

A persistência dos dados é feita com MongoDB e Mongoose, enquanto o servidor é construído com Fastify, garantindo alta performance e simplicidade.

## 3. Tecnologias Utilizadas 

* **Mongoose**: Modelagem e comunicação com o MongoDB.
* **Fastify**: Framework web para construção das rotas da API.
* **MongoDB**: Banco de dados não relacional.
* **Dotenv**: Gerenciamento seguro de variáveis de ambiente.
* **Node.js**: Ambiente de execução JavaScript.

## 4. Estrutura e organização

/TRABALHO-MONGODB
├── src/
│   ├── database/         
│   ├── http/
│   │   ├── controllers/   
│   │   └── routes/        
│   ├── models/            
│   ├── scripts/           
│   └── server.js          
├── .env                   
├── .env.example           
├── package.json           
├── routes.http            


## 5. Instalação e Configuração

* Pré-requisitos

Node.js versão 18 ou superior

MongoDB (local ou via MongoDB Atlas)

### 5.2 Instale as dependências:

1.  **Instale as dependências:**
   
    npm install

2.  **Variáveis de Ambiente:**
    Crie um arquivo .env com base no .env.example:
    ```
    MONGO_URL=mongodb://localhost:27017/ (MongoDB Compass) ou 
    MONGO_URL=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/ (MongoDB Atlas)
    MONGO_DATABASE=nome do seu banco
    MONGO_OPTIONS=?retryWrites=true&w=majority (Caso usado o MongoDB Atlas)
    PORT=3333
    ```

3.  **Iniciar o Servidor:**
   
    ```bash
    npm run dev
    # A API estará acessível em http://localhost:3333/
    ```
## 6. Endpoints da API

| Recurso | Método | Rota | Descrição |
| :--- | :--- | :--- | :--- |
| **Usuários** | `POST` | `/api/users` | Cadastra um novo usuário (nome não pode ser duplicado). |
| | `GET` | `/api/users` | Lista todos os usuários cadastrados. |
| **Autores** | `POST` | `/api/authors` | Cadastra um novo autor (nome não pode ser duplicado). |
| | `GET` | `/api/authors` | Lista todos os autores cadastrados. |
| **Livros** | `POST` | `/api/books` | Cadastra um livro vinculado a um autor existente. |
| | `GET` | `/api/books` | Lista todos os livros cadastrados. |
| **Empréstimos** | `POST` | `/api/loans` | Cria um registro de empréstimo. Requer o ID do livro e do usuário. |

## 7. Regra de Negócio de Empréstimo

A rota `POST /loans` aplica as seguintes regras:

* **🔍 Verificação de Disponibilidade**:O empréstimo é permitido se isAvailable for `true`.
* **⏰ Exceção de Atraso**: Se isAvailable for `false`, mas expectedReturnDate for anterior à data atual, o empréstimo é liberado.
* **✅ Empréstimo Concedido**: O campo isAvailable do livro é atualizado para false.
expectedReturnDate é definido como 3 dias a partir da data atual.
É criado um novo registro na coleção Loans.
* **🚫 Empréstimo Negado**: Se o livro ainda estiver emprestado e o prazo não expirou, o empréstimo é rejeitado.

## 8. 🧹 Script de Manutenção

Para redefinir o estado do banco de dados:

### `npm run collections`

## 9. 💡 Observações

-A aplicação segue o padrão ES Modules ("type": "module").
-A modelagem dos dados utiliza Mongoose Schemas com validações e índices únicos para evitar duplicidade.
-Todas as respostas da API seguem o padrão JSON com mensagens de status descritivas.

## 10. 📬 Contato

# Desenvolvido por Pâmela Évelim Silva
# 💻 Projeto: API de Gerenciamento de Biblioteca