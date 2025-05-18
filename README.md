# DTM - Gerenciador de Tarefas

Um aplicativo de gerenciamento de tarefas com autenticação de usuários, desenvolvido com React e integrado a um backend Express com JWT.

![DTM Logo](/public/logo.png)

## Características

- **Design Moderno**: Interface com tema escuro e paleta de cores verde/preto
- **Autenticação Completa**: Sistema de registro e login com JWT
- **Gerenciamento de Tarefas**: Criar, visualizar, editar e excluir tarefas
- **Categorização**: Organize suas tarefas por categorias
- **Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Feedback Visual**: Notificações toast para todas as ações
- **Tratamento de Erros**: Interface amigável para tratamento de erros

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface
- **React Router**: Gerenciamento de rotas e navegação
- **React Toastify**: Sistema de notificações visuais
- **Tailwind CSS**: Framework de estilização
- **Fetch API**: Para comunicação com o backend
- **LocalStorage**: Armazenamento do token JWT

## Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Backend Express em execução (incluído no projeto)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/dtm-task-manager.git
cd dtm-task-manager
```

2. Instale as dependências do frontend:
```bash
cd react-frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../express-backend-main
npm install
```

4. Configure o arquivo .env do backend:
```bash
cp .env.example .env
```
Edite o arquivo .env conforme necessário.

## Executando o Projeto

1. Inicie o backend:
```bash
cd express-backend-main
npm start
```

2. Em outro terminal, inicie o frontend:
```bash
cd react-frontend
npm start
```

3. Acesse o aplicativo em seu navegador:
```
http://localhost:3000
```

## Estrutura do Projeto Frontend

```
react-frontend/
├── public/
│   ├── logo.png
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ConfirmationModal.js
│   │   ├── EmptyState.js
│   │   ├── ErrorBoundary.js
│   │   ├── Header.js
│   │   ├── LoadingSpinner.js
│   │   ├── ProtectedRoute.js
│   │   ├── TaskForm.js
│   │   └── TaskList.js
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Tasks.js
│   ├── services/
│   │   └── ApiService.js
│   ├── utils/
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Funcionalidades

### Públicas
- **Registro de Usuário**: Crie uma nova conta com nome, email e senha
- **Login**: Acesse sua conta com email e senha

### Protegidas (Requer Autenticação)
- **Visualização de Tarefas**: Veja todas as suas tarefas
- **Filtragem por Categoria**: Filtre tarefas por categoria
- **Criação de Tarefas**: Adicione novas tarefas com título, descrição e categoria
- **Edição de Tarefas**: Modifique tarefas existentes
- **Exclusão de Tarefas**: Remova tarefas que não são mais necessárias
- **Logout**: Encerre sua sessão com segurança

## Personalização

O tema e as cores podem ser facilmente personalizados editando o arquivo `tailwind.config.js`.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato através do email: exemplo@email.com
