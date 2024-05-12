# AI-Mastermind

Este projeto AI-Mastermind é uma aplicação Next.js que oferece quatro funcionalidades distintas:

1. **Criação de Site Básico sobre Qualquer Tema e Assunto**: Gera os arquivos necessários para criar um site básico sobre qualquer tema e assunto.
2. **Análise de Imagens**: Analisa imagens e retorna informações como quantidade de pessoas, quantidade de homens e mulheres, idade estimada de cada pessoa e expressão facial de cada uma.
3. **Exploração de Pontos Turísticos**: Recebe um local no mundo como entrada e retorna os principais pontos turísticos desse local, juntamente com um resumo e link para o local no Google Maps.
4. **Busca de Notícias**: Realiza uma busca pelas últimas notícias de um determinado tema, retornando uma lista de notícias com resumo e link para cada uma.

## Requisitos

Antes de rodar o projeto, é necessário ter o seguinte instalado:

- Node.js (v14.0.0 ou superior)
- npm (v6.14.0 ou superior) ou Yarn (v1.22.0 ou superior)

## Configuração do Arquivo .env

Para que a funcionalidade de análise de imagens funcione corretamente, é necessário configurar a chave da API do Gemini. Adicione a seguinte linha ao seu arquivo `.env`:

NEXT_PUBLIC_API_KEY=SuaChaveDoGeminiAqui

Certifique-se de substituir `SuaChaveDoGeminiAqui` pela sua chave de API do Gemini.

## Como Rodar

Após clonar o repositório, navegue até a pasta raiz do projeto e execute os seguintes comandos no terminal:


```bash
npm install
# ou
yarn install
```

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

Isso iniciará o servidor de desenvolvimento do Next.js. Você pode acessar a aplicação em http://localhost:3000 no seu navegador para ver o resultado.

## Links

- **GitHub:** [NomeDoRepositório](https://github.com/Luiz-Cunha-Dev/ai-mastermind)
- **Perfil do GitHub:** [seu-usuario](https://github.com/Luiz-Cunha-Dev)
- **Perfil do LinkedIn:** [Seu Nome](https://www.linkedin.com/in/luizmcunha/)