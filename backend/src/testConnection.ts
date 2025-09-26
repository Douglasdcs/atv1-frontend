import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function test() {
  const products = await prisma.product.findMany();

  products.forEach(element => {
    console.log(`${element.title} - R$ ${element.price}`)
  });
}

test()
