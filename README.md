# API REST Nestjs

## Introdução
  Esse projeto se trata de uma API REST que serve de base para criação de novos projetos. Feito com o framework Nest; Typeorm para interação com banco dados, lidando com migrations e seeders; bcrypt para hashear senhas; e um sistema de autenticação básico com JWT.

## Como rodar
### Geral
Criar uma arquivo ```.env``` na raíz do projeto e preencher com as variáveis que estão no ```.env.example```. Para usar o banco postgres criado no Docker deve-se usar o host "db" indicado no exemplo.

### No Docker
- Para testar o projeto no Docker tenha o docker e o docker-compose instalados e rode ```docker compose up --build```. O projeot vai iniciar usando a porta 3000.

### Localmente
- Tenha o Node. js (versão >= 20) isntalado. E tenha acesso a um banco de dados relacional
- Preencha os dados no .env corretamente
- Rode ```npm run start:dev```
- O projeto rodará na porta 3000

## Funcionalidades
O projeto tem o objetivo de ser básico, então só possui funcionalidades básicas de CRUD de usuários e autenticação de usuários.

### Autenticação

1. Primeiro crie um novo usuário mandando uma requisição POST para ```http://localhost:3000/auth/register``` com um json com as propriedades "email" e "password" no corpo, tal como no exemplo abaixo:

      ```json
      {
        "email": "john.doe@email.com",
        "password": "password"
      }
      ```

2. Depois mande as mesma informações para o endpoint ```http://localhost:3000/auth/login``` e isso erá retornar um token

3. Use o token retornado no cabeçalho Autorization das requisições protegidas

4. Por padrão todas as rotas são protegidas, exceto as que tem o decorator ```@Public```

### Usuários
1. Buscar todos os usuários cadastrados: mande um requisição GET autenticada para ```http://localhost:3000/user```

2. Buscar uma usuários pelo ID: mande um requisição GET autenticada para ```http://localhost:3000/user/:id```

