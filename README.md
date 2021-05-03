# Stefanini Challenge

Teste técnico para a vaga de desenvolvedor backend

## Como executar o projeto em homologação:

Url de homologação: https://pq0sq4s4lj.execute-api.sa-east-1.amazonaws.com/dev

## Como executar o projeto localmente:

- Precisa ter instalado na máquina o serverless framework
- Precisa ter instalado na máquina a CLI da AWS
- Precisa adicionar as credenciais da aws

```bash
# Execute no terminal para instalar as dependências
$ yarn

# Para executar offline, execute:
$ sls offline
```

## Rotas

| Rotas           |   Tipo   | Parâmetros |           Descrição           |
| --------------- | :------: | :--------: | :---------------------------: |
| /employers      |  `GET`   |     ❌     |  Lista todos os funcionários  |
| /employers/{id} |  `GET`   |    `id`    |  Lista funcionário por `id`   |
| /employers      |  `POST`  |     ❌     |   Cria um novo funcionário    |
| /employers/{id} |  `PUT`   |    `id`    | Atualiza um único funcionário |
| /employers/{id} | `Delete` |    `id`    |  Deleta um único funcionário  |
