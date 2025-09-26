import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();

const prisma = new PrismaClient();

const PORT = 3001;

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Olá mundo'});
});

app.listen(PORT, () => {
    console.log('♪♫♪♫ Servidor rodando ')
});

const mockProd = [
    {
        id: 1,
        title: "Notebook",
        descricao: "notebook muito bom",
        preco: 4500.56
    },
    {
        id: 2,
        title: "Notebook Ruim",
        descricao: "notebook muito ruim",
        preco: 1000.99
    }
]

app.get('/api/produtos', (req: Request, res: Response) => {
    res.json(mockProd);
});

// Middleware para JSON
app.use(express.json());

// Rota para pegar todos os produtos
app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Rota para pegar produto pelo ID
app.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id); // pega o ID da URL
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

  res.json(product);
});
