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

### Agora entre na pasta do frontend:

### cd frontend-app
### npm run dev


## O frontend iniciará em:

### http://localhost:3000

## 🔐 Fluxo de Login

### O usuário acessa o frontend.

### Insere as credenciais iniciais fornecidas pelo seed:

### Login: admin

### Senha: admin123

### O frontend envia requisição para o backend.

### O backend valida usando Prisma + MySQL.

### O usuário é autenticado e liberado para o sistema.

## ✔️ Requisitos

### Node.js atualizado (LTS recomendado)

### MySQL instalado e em execução

### NPM (vem junto com Node)
