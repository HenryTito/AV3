# AV3 — Sistema AeroCode

##  Sistema desenvolvido para a AV3, contendo backend (Node + Express + Prisma + MySQL) e frontend (Next.js).
## Este guia explica como rodar todo o projeto do zero, incluindo configuração do banco, instalação de dependências e inicialização do servidor.



## 🚀 Como Rodar o Projeto
### 1️⃣ Instale as dependências do Backend

## Entre na pasta:

## cd backend
### npm install

## 2️⃣ Volte e Instale também as dependências do Frontend
### cd frontend-app
### npm install

## 🛠️ Configuração do Backend
## 3️⃣ Criar o arquivo .env

## Dentro de backend/ crie um arquivo chamado:

### .env


### Ele deve seguir EXATAMENTE o modelo do arquivo .envexample.txt que está no projeto, no mesmo diretório localizado.

## ⚠️ IMPORTANTE:
### Mantenha a porta do backend como:

### PORT=3001

## 🗄️ Banco de Dados MySQL
## 4️⃣ Criar o banco "aerocode"

### No MySQL, crie um banco com este nome exatamente assim:

### CREATE DATABASE aerocode;


## Esse nome é obrigatório, pois está definido no Prisma.

## 📦 Gerar tabelas com o Prisma
## 5️⃣ Rodar as migrations

### O esquema do Prisma está em:

### backend/prisma/schema.prisma


## Para gerar as tabelas no banco:

### npx prisma migrate dev


## 👤 Criar usuário inicial (admin)
### 6️⃣ Rodar o seed

### Ainda dentro de backend/:

### npm run seed


## Isso criará automaticamente para logar no site:

### Usuário: admin

### Senha: admin123

### Função: Administrador

## ▶️ Inicializar o Backend
### 7️⃣ Rodar servidor Node

### No diretório backend:

### npm run dev


### O backend estará rodando em:

### http://localhost:3001

## 💻 Inicializar o Frontend
## 8️⃣ Rodar o Next.js

### Agora entre na pasta do frontend em outro terminal:

### cd frontend-app
### npm run dev


## O frontend iniciará em:

### http://localhost:3000


### CASO QUEIRA TIRAR O BOTÃO DO NEXT, CLIQUE NELE <br>
### -> PREFERENCES -> HIDE DEV TOOLS



## 🔐 Fluxo de Login

### O usuário acessa o frontend.

### Insere as credenciais iniciais fornecidas pelo seed:

### Login: admin

### Senha: admin123

### O frontend envia requisição para o backend.

### O backend valida usando Prisma + MySQL.

### O usuário é autenticado e liberado para o sistema.

### SÓ PARA GARANTIR QUE O EXEMPLO DO .ENV SEJA SEGUIDO, VOU COLOCAR UM NO README

DATABASE_URL="mysql://root:senha@localhost:3306/aerocode" 

---> coloque sua senha no DATABASE_URL (mas mantenha o nome aerocode no banco ali no final por favor).


DB_HOST=localhost

DB_PORT=3306

DB_USER=root

DB_PASS=senha

DB_NAME=aerocode

PORT=3001

## VALE RESSALTAR QUE NA ABA DE ETAPAS, COLOQUE A DATA E O HORARIO NO CAMPO!




## ✔️ Requisitos

### Node.js atualizado (LTS recomendado)

### MySQL instalado e em execução

### NPM (vem junto com Node)


### RESUMO DOS COMANDOS

## cd frontend-app

## npm install

## volte a pasta do back

## cd backend

## npm install

## criar o .env na raiz do backend e configurar a url igual o .env example

## criar o banco de dados no mysql com o nome: aerocode
## create database aerocode;

## dentro de backend, gerar as migrations:

## npx prisma migrate dev

## dentro de backend, rodar a seed para gerar o login inicial:

## npm run seed

## agora basta rodar o back e o front

## cd backend 
## npm run dev


## abrir em outro terminal e rodar o front

## cd frontend-app

## npm run dev
