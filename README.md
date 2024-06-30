# Trilha FullStack Jr - JUN15

![Código Certo Coders](https://utfs.io/f/3b2340e8-5523-4aca-a549-0688fd07450e-j4edu.jfif)

### Link do Projeto On-line:
https://trilha-full-stack-jr-jun-15.vercel.app/

## Descrição do Projeto
Este projeto é uma aplicação web completa para gerenciamento de projetos, desenvolvida como parte da Trilha FullStack Jr. A aplicação permite aos usuários listar, cadastrar, editar e excluir projetos, cada um contendo um título e uma descrição.

## Funcionalidades
- Listar projetos cadastrados
- Adicionar novos projetos
- Editar projetos existentes
- Excluir projetos

## Tecnologias Utilizadas
### Frontend
- **HTML**: Utilizado para estruturar a página.
- **CSS**: Utilizado para estilização da página.
- **JavaScript**: Utilizado para manipulação de DOM e interações com o servidor.
- **Fetch API**: Utilizada para realizar requisições HTTP assíncronas.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework web para Node.js.
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js.
- **SQLite**: Banco de dados SQL leve e autônomo.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **body-parser**: Middleware para analisar o corpo das requisições.

## Estrutura do Projeto
```plaintext
trilha-fullstackjr-jun15/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── projectController.js
│   ├── models/
│   │   └── Project.js
│   ├── routes/
│   │   └── projectRoutes.js
│   ├── database.sqlite
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── index.html
│
├── .gitignore
└── README.md
```
## Configuração do Ambiente
### Pré-requisitos
- Node.js e npm instalados
- Conta no Vercel para deploy do frontend
- Conta no Render para deploy do backend

### Passo a Passo
1. Clone o repositório
```plaintext
git clone https://github.com/usuario/trilha-fullstackjr-jun15.git
cd trilha-fullstackjr-jun15
```
2. Configuração do Backend

    - Navegue até o diretório do backend:
        ```plaintext
        cd backend
        ```
    - Instale as dependências:
        ```plaintext
        npm install
        ```
    - Inicie o servidor:
        ```plaintext
        node server.js
        ```
3. Configuração do Frontend

    - Navegue até o diretório do frontend:
        ```plaintext
        cd ../frontend
        ```
    - Instale as dependências:
        ```plaintext
        npm install
        ```
    - Abra o arquivo **js/app.js** e ajuste a URL da API para o seu backend hospedado no Render.

4. Deploy
    - **Backend:** Siga as instruções para fazer o deploy no Render.
    - **Frontend:** Siga as instruções para fazer o deploy no Vercel.

## Uso
- Abra o navegador e navegue até o URL do frontend hospedado.
- Utilize a interface para gerenciar seus projetos (listar, adicionar, editar e excluir).

## Contribuição
- Fork o projeto.
- Crie uma nova branch (git checkout -b feature/nova-feature).
- Faça commit das suas alterações (git commit -am 'Adiciona nova feature').
- Faça push para a branch (git push origin feature/nova-feature).
- Abra um Pull Request.

## Contato
Se você tiver dúvidas ou sugestões, entre em contato pelo email: claudio@cjservices.com.br