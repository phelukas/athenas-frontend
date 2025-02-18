## Visão Geral

- **Framework:** Angular (versão 14+ ou 15+, dependendo de sua instalação)
- **Linguagem:** TypeScript
- **Gerenciador de Pacotes:** npm (Node.js)

### Principais Funcionalidades

1. **Cadastro de Pessoa (Incluir)**  
   Permite informar dados como **nome**, **sexo**, **altura**, **peso**, etc.
2. **Pesquisa de Pessoa**  
   Busca uma pessoa pelo **ID** e exibe os dados para alteração ou exclusão.
3. **Alteração de Pessoa**  
   Atualiza os dados de uma pessoa previamente pesquisada.
4. **Exclusão de Pessoa**  
   Remove o registro do banco de dados, após confirmação do usuário.
5. **Cálculo de Peso Ideal**  
   Com base em altura e sexo, calcula o peso ideal usando a fórmula definida no back-end.

---

## Estrutura do Projeto

```
athenas-frontend/
├── src/
│   ├── app/
│   │   ├── pessoa/
│   │   │   ├── pessoa.component.ts       # Lógica do componente
│   │   │   ├── pessoa.component.html     # Template HTML
│   │   │   ├── pessoa.component.css      # Estilos específicos
│   │   │   └── pessoa.service.ts         # Serviço para acessar a API de Pessoa
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts         # Rotas (se criado)
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts               # Configurações de dev
│   │   └── environment.prod.ts          # Configurações de produção
│   ├── main.ts
│   └── styles.css
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

---

## Pré-Requisitos

- **Node.js** (versão 14+ ou 16+)
- **npm** (gerenciador de pacotes que vem com Node.js)
- **Angular CLI** (opcional, mas recomendado):

  ```bash
  npm install -g @angular/cli
  ```

---

## Instalação

1. **Clone o Repositório** (ou baixe o código fonte):

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
   cd athenas-frontend
   ```

2. **Instale as Dependências**:

   ```bash
   npm install
   ```

   Esse comando lê o arquivo `package.json` e instala todas as bibliotecas necessárias (incluindo Angular, etc.).

---

## Execução em Ambiente de Desenvolvimento

1. **Inicie o Servidor de Desenvolvimento**:

   ```bash
   ng serve
   ```

   ou

   ```bash
   npm run start
   ```

2. **Acesse a Aplicação** em [http://localhost:4200](http://localhost:4200).

3. **Integração com o Back-end**:  
   Certifique-se de que o back-end (Django) esteja rodando (geralmente em [http://localhost:8000](http://localhost:8000)).  
   No `pessoa.service.ts`, verifique a URL base do seu back-end:

   ```typescript
   private apiUrl = 'http://localhost:8000/api/pessoas/';
   ```

   Ajuste se necessário.

---

## Compilação para Produção

Para gerar uma versão otimizada (minificada) do projeto, execute:

```bash
ng build --prod
```

Isso criará uma pasta `dist/` com os arquivos prontos para deploy em um servidor web.

---

## Testes

### Testes Unitários

Para rodar os testes unitários (geralmente com Karma/Jasmine):

```bash
ng test
```

Isso abrirá um navegador e executará os testes definidos em arquivos `*.spec.ts`.  
Se desejar rodar em modo headless (sem abrir o navegador), ajuste as configurações em `karma.conf.js` ou utilize:

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Testes de Integração/E2E

Se houver testes de ponta a ponta (E2E) configurados (Cypress ou Protractor), rode:

```bash
ng e2e
```

ou conforme a configuração do seu arquivo `cypress.json` ou `protractor.conf.js`.

---

## Configurações de Ambiente

- **environment.ts**:  
  Contém variáveis de configuração para desenvolvimento, como `apiUrl: 'http://localhost:8000'`.
- **environment.prod.ts**:  
  Contém variáveis de configuração para produção, como `apiUrl: 'https://api.seusite.com'`.

No código, você pode importar:

```typescript
import { environment } from '../environments/environment';

private apiUrl = environment.apiUrl + '/pessoas/';
```

Isso facilita a troca entre dev e prod sem alterar o código-fonte principal.

---

## Boas Práticas e Melhorias

1. **Validações e Feedback:**

   - Utilize bibliotecas como `ngx-toastr` ou `MatSnackBar` (Angular Material) para mensagens de sucesso/erro.
   - Valide campos obrigatórios no formulário (por exemplo, `nome`, `cpf`, etc.) e exiba mensagens claras ao usuário.

2. **Organização em Módulos:**

   - Se o projeto crescer, considere criar um módulo `PessoaModule` para agrupar o componente e o serviço relacionados a Pessoa.

3. **Estrutura de Pastas (opcional):**

   - `core/` para serviços e guardas globais.
   - `shared/` para componentes, pipes e diretivas compartilhadas.

4. **Testes Mais Abrangentes:**
   - Cubra o `pessoa.service.ts` com testes unitários usando `HttpClientTestingModule`.
   - Teste o `pessoa.component.ts` para garantir que os métodos de inclusão, alteração, etc., funcionem como esperado.
# athenas-frontend
