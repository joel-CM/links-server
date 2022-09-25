# App Link Server

This is a web application, where you can create an account and save your favorite links.

This project only the server of an application divided into two parts (server, client)

> Please note that both the server and the [client](https://github.com/joel-CM/links-client.git) are required for the operation of this web application.

---

## Technologies

- Node
- Express
- Mysql

> You need to have [Mysql](https://www.mysql.com/downloads/) and [Node](https://nodejs.org/es/) installed

---

## Install

- clone repository
- install dependencies
- run dev or start script

---

## Environment Variables

- Development mode mysql environment variables
  - dev_db_host => host database
  - dev_db_user => user database
  - dev_db_pwd => password database
  - dev_db_port => port database
  - dev_db_name => name database
- Production mode mysql environment variables

  > replace dev_ with prod_. Example: prod_db_host

- Env Json Web Token
  - JWT_SECRET => secret key. Exaple: secret_key123

> [client project link](https://github.com/joel-CM/links-client.git)
