# Projeto de Trabalhos Relacionados (Backend + Frontend)

Este projeto consiste em uma API em Node.js/Express com banco de dados PostgreSQL (via Prisma e Docker) e frontend em React, que mostra algumas informações sobre testes de software.

---

## Instruções para execução

### 1️⃣ Rodar o Docker Compose
Inicia o container do PostgreSQL:

docker-compose up -d

### 2️⃣ Inicializar o banco de dados com dados mockados
Popula a base de dados com registros iniciais:

npx prisma db seed

### 3️⃣ Verificar se os dados foram inseridos corretamente
Abre o Prisma Studio para inspeção visual do banco:

npx prisma studio

### 4️⃣ Testar a conexão com o banco
Executa um script de teste da API:

npx tsx src/testConnection.ts

### 5️⃣ Executar o backend
Inicia o servidor Node.js:

npm run dev

### OBS: Criar arquivo .env com configurações de acesso ao banco
Arquivo base inserido. Atualizar dados se necessário!

---

## Apresentação

- API: https://youtu.be/ULD_or9U_rw  
- Integração Frontend + Backend: https://youtu.be/LMIj9VX4uHM
- Autenticação e Middleware: 

---

## Política de CORS

O backend utiliza o pacote `cors` para permitir requisições do frontend.  

- **Origens permitidas:** `http://localhost:5173` (frontend em desenvolvimento)  
- **Métodos permitidos:** `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`  
- **Headers permitidos:** `Content-Type`, `Authorization`  

Essa configuração garante que apenas o frontend autorizado possa acessar a API, evitando bloqueios de CORS.  

> ⚠️ Em produção, recomenda-se atualizar as origens permitidas para o domínio real do frontend.


## Pacotes usados e comandos úteis

- npm install @prisma/client
- npm install cors
- npm install -D @types/cors
- npx prisma migrate dev
- npx prisma db seed