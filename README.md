# api-crud-jwt

API REST CRUD com JWT.

## Install

`npm install`

## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais usuários. |
| `POST` | Utilizado para criar um novo usuário. |
| `PUT` | Atualiza dados de um usuário ou altera sua situação. |
| `DELETE` | Remove um usuário do sistema. |

## Executando

0. Crie um arquivo `.env` , com sua configuração, você tem exemplo em `.env.example`.

```.env
    DB = "mongodb://localhost:27017/test-api"
    JWTPRIVATEKEY = "secretKey"
    SALT = 10
```

1. Se você deseja executar a API REST em modo de produção, deve executar no terminal `npm run production`.

2. Caso queira monitorar como está o processo da api, deve executar no terminal `pm2 monit`.

## Executando Teste

0.Se você deseja executar o teste, você deve executar no terminal `npm run test`.

## Criando usuário [POST]

+ Request: POST /api/users/

    + Body

            {
                    "name": "teste",
                    "email": "teste@teste.com",
                    "password": "123456"
            }

+ Response 200 79.217 ms

    + Body

            {
                    "name": "teste",
                    "email": "teste@teste.com",
                    "password": "$2b$10$GODuClqXPmWt0erU5rylsOfaGOxFglOkEiNDPVyYsoQIXDJQ432JS",
                    "_id": "61a39ba787556c8cc536fbd1",
                    "__v": 0
            }

## Fazendo login de usuário [POST]

+ Request: POST /api/login/

    + Body

            {
                    "email": "teste@teste.com",
                    "password": "123456"
            }

+ Response 200 67.951 ms
    + Body

            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzOWJhNzg3NTU2YzhjYzUzNmZiZDEiLCJpYXQiOjE2MzgxMTI2ODh9.n0BwoNhy5FMXifvTC7xrUODDM_tuHc5owc8OoKh_5D4

## Verificando autenticação [GET]

+ Request: GET /api/login/ 
    
    + Header

            x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzOWJhNzg3NTU2YzhjYzUzNmZiZDEiLCJpYXQiOjE2MzgxMTI2ODh9.n0BwoNhy5FMXifvTC7xrUODDM_tuHc5owc8OoKh_5D4

+ Response 200 3.599 ms

    + Body

            "you are authenticated."

## Buscar usuário por ID [GET]

+ Request: GET /api/users/61a3984f884a356d1d1b9d26
    
    + Header

            x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzOWJhNzg3NTU2YzhjYzUzNmZiZDEiLCJpYXQiOjE2MzgxMTI2ODh9.n0BwoNhy5FMXifvTC7xrUODDM_tuHc5owc8OoKh_5D4

    + Body

            {
                    "email": "teste@teste.com",
                    "password": "[Senha utilizada]"
            }

+ Response 200 23.361 ms

    + Body

            {
                    "_id": "61a39ba787556c8cc536fbd1",
                    "name": "teste",
                    "email": "teste@teste.com"
            }

## Buscar todos os usuários [GET]

+ Request: GET /api/users/
  
    + Header

            x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzOWJhNzg3NTU2YzhjYzUzNmZiZDEiLCJpYXQiOjE2MzgxMTI2ODh9.n0BwoNhy5FMXifvTC7xrUODDM_tuHc5owc8OoKh_5D4

+ Response 200 5.476 ms

    + Body

            [
                    {
                            "_id": "61a39ba787556c8cc536fbd1",
                            "name": "teste",
                            "email": "teste@teste.com",
                            "__v": 0
                    },
                    {
                            "_id": "61a39d9c87556c8cc536fbd3",
                            "name": "teste2",
                            "email": "teste2@teste.com",
                            "__v": 0
                    }
            ]

## Alterando dados do usuário [PUT]

+ Request: PUT /api/users/61a39ba787556c8cc536fbd1
    
    + Header

            x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzOWJhNzg3NTU2YzhjYzUzNmZiZDEiLCJpYXQiOjE2MzgxMTI2ODh9.n0BwoNhy5FMXifvTC7xrUODDM_tuHc5owc8OoKh_5D4

    + Body:

            {
                    "name": "testeAlterado",
                    "email": "alterado@teste.com",
                    "password": "[Senha Alterada]"
            }

+ Response 204 199.364 ms

    + Body

            No Content

## Deletando um usuário [DELETE]

+ Request: DELETE /api/users/61a39ba787556c8cc536fbd1 
    
    + Header

            x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEzOWJhNzg3NTU2YzhjYzUzNmZiZDEiLCJpYXQiOjE2MzgxMTI2ODh9.n0BwoNhy5FMXifvTC7xrUODDM_tuHc5owc8OoKh_5D4

+ Response 204 2.280 ms

    +Body

            No Content



