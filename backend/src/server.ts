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

// Rota para pegar todos os trabalhos relacionados
app.get('/api/trabalhos', async (req: Request, res: Response) => {
  try{
    const trabalhos = await prisma.trabalhoRelacionado.findMany();
    return res.status(200).json(trabalhos);
  } catch (err) {
    return res.status(500).json( {error: "Erro ao listar os trabalhos"} )
  }
});

// Rota para pegar trabalho pelo ID
app.get('/api/trabalhos/:id', async (req, res) => {
  const id = Number(req.params.id); // converte o ID para number
  
  if  (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json( {error: 'ID inválido! Utilize valores inteiros positivos.'} );
  }

  try {
    const trabalho = await prisma.trabalhoRelacionado.findUnique({
      where: { id },
    });

    if (!trabalho) return res.status(404).json({ message: 'Trabalho não encontrado' });

    return res.status(200).json(trabalho)
  } catch (error) {
    return res.status(500).json( {error: "Erro ao buscar o trabalho"} )
  }
});

// Schema de criação de trabalho
export const createTrabalhoSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  doi: z.string().min(5, 'DOI deve ter pelo menos 5 caracteres'),
  resumo: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
  autor: z.string().min(3, 'Autor deve ter pelo menos 3 caracteres'),
})

// Rota para criação de trabalho
app.post('/api/trabalhos', async (req: Request, res: Response) => {
  try {

    const data = createTrabalhoSchema.parse(req.body) // Validações
    const newTrabalho = await prisma.trabalhoRelacionado.create({ data })
    return res.status(201).json(newTrabalho)

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

    console.error('POST /api/trabalhos error:', error)
    return res.status(500).json({ error: 'Erro interno no servidor ao criar trabalho' })
  }
})

// Schema de atualização de trabalho
export const updateTrabalhoSchema = createTrabalhoSchema.partial();

// Rota para atualização de trabalho
app.put('/api/trabalhos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido. Use um inteiro positivo.' })
  }

  try {
    const parsedData = updateTrabalhoSchema.parse(req.body);

    // Remove chaves undefined
    const data = Object.fromEntries(
      Object.entries(parsedData).filter(([_, v]) => v !== undefined)
    );

    const updated = await prisma.trabalhoRelacionado.update({
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
      return res.status(404).json({ error: 'Trabalho não encontrado' })
    }

    console.error(`PUT /api/trabalhos/${req.params.id} error:`, error)
    return res.status(500).json({ error: 'Erro interno ao atualizar trabalho' })
  }
})

// Rota para deletar trabalho
app.delete('/api/trabalhos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido. Use um inteiro positivo.' });
  }

  try {
    await prisma.trabalhoRelacionado.delete({ where: { id } });
    return res.status(204).send();

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Trabalho não encontrado' });
    }

    console.error(`DELETE /api/trabalhos/${req.params.id}`, error);
    return res.status(500).json({ error: 'Erro interno ao deletar trabalho.' });
  }
});
