import { PrismaClient, Prisma } from '@prisma/client';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { z, ZodError } from 'zod'

const app = express();

const prisma = new PrismaClient();

const PORT = 3001;

app.get('/', (req: Request, res: Response) => {
    res.json({message: '♪♫♪♫ Servidor rodando'});
});

app.listen(PORT, () => {
    console.log('♪♫♪♫ Servidor rodando ')
});

// Middleware para JSON
app.use(express.json());

// Rota para pegar todos os produtos
app.get('/api/produtos', async (req: Request, res: Response) => {
  try{
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json( {error: "Erro ao listar os produtos"} )
  }
});

// Rota para pegar produto pelo ID
app.get('/api/produtos/:id', async (req, res) => {
  const id = Number(req.params.id); // converte o ID para number
  
  if  (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json( {error: 'ID inválido! Utilize valores inteiros positivos.'} );
  }

  try {
    const product = await prisma.product.findUnique({
    where: { id },
    });

    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json( {error: "Erro ao buscar o produto"} )
  }
});

// Schema de criação de produto
export const createProductSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  // coerce: tenta converter "2800" (string) em número antes de validar positive()
  price: z.coerce.number().positive('Preço deve ser maior que zero'),
  imageUrl: z.string().min(1, 'imageUrl não pode ser vazio'),
  isFeatured: z.coerce.boolean().optional().default(false), // true/false/"true"/"false"
})

// Rota para criação de produto
app.post('/api/produtos', async (req: Request, res: Response) => {
  try {

    const data = createProductSchema.parse(req.body) // Validações
    const newProduct = await prisma.product.create({ data })
    return res.status(201).json(newProduct)

  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Payload inválido',
        issues: error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      })

    }

    console.error('POST /api/products error:', error)
    return res.status(500).json({ error: 'Erro interno no servidor ao criar produto' })
  }
})

// Schema de atualização de produto
export const updateProductSchema = createProductSchema.partial();

// Rota para atualização de produto
app.put('/api/produtos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido. Use um inteiro positivo.' })
  }

  try {
    // const parsedData  = updateProductSchema.parse(req.body)
    // const updated = await prisma.product.update({ where: { id }, data })
    const parsedData = updateProductSchema.parse(req.body);

    // Remove chaves undefined
    const data = Object.fromEntries(
      Object.entries(parsedData).filter(([_, v]) => v !== undefined)
    );

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return res.status(200).json(updated);

  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Payload inválido',
        issues: error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      })

    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }

    console.error(`PUT /api/products/${req.params.id} error:`, error)
    return res.status(500).json({ error: 'Erro interno ao atualizar produto' })
  }
})

// Rota para deletar produto
app.delete('/api/produtos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido. Use um inteiro positivo.' });
  }

  try {

    await prisma.product.delete({ where: { id } });
    return res.status(204).send();

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    console.error(`DELETE /api/products/${req.params.id}`, error);
    return res.status(500).json({ error: 'Erro interno ao deletar produto.' });
  }
});
