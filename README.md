# Votação App Front-end

## Introdução
Esta documentação descreve a estrutura e funcionamento da nossa aplicação frontend, que é uma interface para interagir com a API [API Votação App](https://github.com/Pedro-Cecilio/votacao-react-java-Backend). O objetivo principal desta aplicação é fornecer uma interface amigável e intuitiva para que os usuários possam gerenciar suas pautas, explorar pautas com sessão de votação aberta e votar nas mesmas.

## Tecnologias utilizadas:

- React
- Chakra UI
- Axios
- React Hook Form
- Zod
- Zustand
- Testing Library React
- Typescript
- Vite
- Jest


## Como Executar Localmente

Siga as etapas abaixo para executar a aplicação frontend em sua máquina local:

### Pré-requisitos

- Certifique-se de possuir a ultima versão latest do Node.js instalada em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/en).

### Passos

1. Clone o repositório da aplicação frontend:

   ```bash
   git clone https://github.com/Pedro-Cecilio/votacao-react-java-Frontend.git
   
2. Acesse o diretório do projeto.
3. Instale as depencências>
     ``` bash
     npm install

4. Crie um arquivo .env com base no arquivo .env.examplo
     ``` dotenv
    VITE_API_URL= Insira a url da  [API Votação App](https://github.com/Pedro-Cecilio/votacao-react-java-Backend)
     
5. Execute a aplicação:
   ``` bash
   npm run dev
   ```


## Fluxo de Usuário

1. **Acesso à Aplicação:**
   - O usuário acessa a aplicação através do endereço `http://localhost:5173/`.

2. **Autenticação:**
   - O usuário é direcionado para a página de login.
   - Após fornecer suas credenciais, o usuário realiza o login.

3. **Redirecionamento pós-login:**
   - Após o login bem-sucedido, o usuário é redirecionado para a página de exploração de pautas.

4. **Exploração de Pautas:**
   - Na página de exploração (`/explorar`), o usuário pode:
     - Visualizar pautas com sessão de votação ativa.
     - Votar nas pautas disponíveis.

5. **Recursos do Administrador:**
   - Se o usuário for um administrador, terá acesso a funcionalidades adicionais:
     - Criar novos usuários.
     - Criar novas pautas.
     - Visualizar todas as pautas criadas pelo administrador.
     - Ver detalhes de uma pauta que foi aberta para votação.
     - Compartilhar o link de uma pauta com sessão de votação aberta para que um usuário possa votar externamente.

6. **Voto Externo:**
   - A página é acessada através de um link compartilhado pelo dono da pauta.
   - Permite a votação de usuários cadastrados e não cadastrados sem a necessidade de estarem logados na aplicação.



## Execução de Testes

Para garantir a qualidade do código, é importante executar os testes regularmente. Siga as etapas abaixo para executar os testes da aplicação:

### Passos

1. Certifique-se de que todas as dependências foram instaladas corretamente executando o comando:

   ```bash
   npm install

2. Execute os testes:
    ```bash
    npm run test
    ```
    Ou
    ```bash
    npm run test:cov
    ```
