import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function test() {
  const trabalhos = await prisma.trabalhoRelacionado.findMany();

  trabalhos.forEach(element => {
    console.log(`${element.title} - ${element.autor}`)
  });
}

test()
