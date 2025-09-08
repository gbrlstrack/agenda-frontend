# 📓 Agenda (Front-end)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)


Interface de usuário para a aplicação "Agenda", construída com React (Vite) e Material-UI.

Este projeto consome a API RESTful do repositório [agenda-backend](https://github.com/gbrlstrack/agenda-backend) para permitir o cadastro, visualização, edição e exclusão de contatos.

## ✨ Funcionalidades

* **Interface Limpa:** Construída com componentes React e Material-UI (MUI).
* **Gerenciamento de Contatos (CRUD):** Formulário para criar novos contatos e tabela para listar, editar e deletar contatos existentes.
* **Notificações Globais:** Utiliza a Context API do React para um `SnackbarProvider` global, exibindo mensagens de sucesso e erro para todas as ações do usuário (criado, deletado, erro de validação).
* **Hooks Customizados:** Centraliza a lógica de dados (fetch, create, delete) em hooks customizados (ex: `useUsers`).
* **Validação de Formulário:** Exibe erros de validação vindos da API diretamente nos campos do formulário (ex: "Telefone inválido").

## 🚀 Tecnologias Utilizadas

* **React.js:** Biblioteca para construção da interface de usuário.
* **Vite:** Ferramenta de build e servidor de desenvolvimento front-end.
* **Material-UI (MUI):** Biblioteca de componentes UI React.
* **React Context:** Para gerenciamento de estado global (especificamente o provedor de notificações).

## 🛠️ Pré-requisitos

* [Node.js](https://nodejs.org/en/) (v18 ou superior recomendado).
* O back-end (`agenda-backend`) **deve estar instalado e rodando** antes de iniciar o front-end.

## ⚙️ Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gbrlstrack/agenda-frontend.git](https://github.com/gbrlstrack/agenda-frontend.git)
    cd agenda-frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure a Conexão com a API:**
    * Este projeto espera que a API do `agenda-backend` esteja rodando (por exemplo, em `http://localhost:3001`).
    * Verifique os arquivos de serviço da API (ex: `src/api/userApi.js` ou uma instância centralizada do Axios) e garanta que o `baseURL` aponta para o endereço correto onde seu back-end está sendo executado.

    *(Se você estiver usando o mock que criamos, este passo pode ser ignorado, mas para a aplicação real, a configuração do Axios é essencial).*

4.  **Execute o servidor de desenvolvimento (Vite):**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada pelo Vite no seu terminal).

---
