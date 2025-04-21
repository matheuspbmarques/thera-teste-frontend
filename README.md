# thera-teste-frontend

## Configuração do Projeto

Clone o repositório do projeto no seu computador:

```
git clone https://github.com/matheuspbmarques/thera-teste-frontend.git
```

Instale as dependências:

```
# npm
npm install

# yarn
yarn install
```

No projeto tem 2 arquivos JSON de exemplo para utilizar com o [json-server](#dependências), sendo eles:
- **db.empty.example.json**: para iniciar o projeto com uma API sem nenhum produto;
- **db.full.example.json**: para iniciar o projeto com uma API com produtos.

Aonde você deve apenas renomear um dos dois para db.json e assim ter o projeto como deseja.

Faça a construção do projeto:

```
# npm
npm run build

# npm
yarn build
```

E inicie o mesmo:

```
# npm
npm start

# npm
yarn start
```

E acesse http://localhost:3000 ou http://127.0.0.1:3000.

_Lembre-se de ter certeza que a porta **3000** do seru computador, deve estar disponível para que o projeto esteja o radando na mesma._

## Explicação das Escolhas

### [React](https://react.dev/)

 - **Context** ([createContext](https://react.dev/reference/react/createContext) e [useContext](https://react.dev/reference/react/useContext)): para reduzir a quantidade de dependências e utilizar tecnologias do próprio [React](https://react.dev/).

### [NextJS](https://nextjs.org/)

- [**App Router**](https://nextjs.org/docs#app-router-vs-pages-router): no NextJS permiti usar as últimas ferramentas do ReactJS, como Server Components e Streaming (ainda que ambas as tecnologias não foram usadas no projeto).

- **Estrutura de Pastas com SRC**: Para separar o projeto em si dos arquivos de configurações, dependências, builds, entre outros.

### Dependências:

- [**Jest**](https://jestjs.io/pt-BR/): está na [documentação do NextJS](https://nextjs.org/docs/app/building-your-application/testing/jest)  e é o único citando conter Snapshot Testing.

 - [**Axios**](https://axios-http.com/ptbr/docs/intro): é amplamente usado por desenvolvedores front-end (Web ou Mobile com React Native), possibilitando criar variais instâncias de API's pré-configuradas.

 - [**ESlint**](https://eslint.org/): para exibir erros em tempo de desenvolvimento, assim evitar erros na hora de fazer a construção (build) da aplicação.

 - [**React Feather**](https://github.com/feathericons/react-feather): para a utilização dos ícones [Feather](https://feathericons.com/) e assim ajudar na UI/UX.

 - [**JSON Server**](https://github.com/typicode/json-server): para simular o consumo de API.

 - [**TanStackQuery**](https://tanstack.com/query/latest): para fazer o controle das requisições. Assim evitando requisições desnecessárias para a API's e reduzindo um gasto de processamento nos servidores aonde as API's supostamente estariam.