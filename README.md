Intruções para execução.

1. Rodar o docker-compose
docker-compose up -d

2. Inicializar banco de dados com dados mockados
npx prisma db seed

3. Verificar se dados foram inseridos corretamente
npx prisma studio

4. Testar conexão
npx tsx src/testConnection.ts

5. Executar
npm run dev

Apresentação:
https://youtu.be/ULD_or9U_rw
