import { PrismaClient, Prisma } from '@prisma/client';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { z, ZodError } from 'zod'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();

const prisma = new PrismaClient();

const PORT = 3001;

app.listen(PORT, () => {
    console.log('♪♫♪♫ Servidor rodando ')
});

// Middleware para JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

const registerSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Password deve ter pelo menos 6 caracteres'),
  name: z.string().optional()
});

const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(1, 'Password é obrigatório')
});

const JWT_SECRET = 'seu_segredo_jwt_aqui'; // Em produção, use variáveis de ambiente

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string | null;
  };
}

// Middleware de autenticação
const authMiddleware = async (req: AuthRequest, res: Response, next: any) => {
  try {
    // Pega o token do header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token de autenticação ausente' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação inválido' });
    }

    // Verifica o token
    const decoded: any = jwt.verify(token, JWT_SECRET) as {userId: number};

    // Busca o usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true }
    });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Anexa o usuário à requisição
    req.user = user;
  
    // Continua para a próxima função middleware ou rota
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token de autenticação expirado' });
    }
    return res.status(500).json({ error: 'Erro interno no servidor de autenticação' });
  }
}


app.get('/', (req: Request, res: Response) => {
    res.json({message: '♪♫♪♫ Servidor rodando'});
});

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

// Rota para criação de usuário
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    // Valida dados
    const { email, password, name } = registerSchema.parse(req.body);

    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    // Cria hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cria usuário
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name ?? null   // undefined para null
      },
    });

    // Gerar token JWT
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1d' });

    // Retornar sucesso
    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });

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

    console.error('POST /api/auth/register:', error)
    return res.status(500).json({ error: 'Erro interno no servidor ao criar usuário' })
  }
})

// Rota para login de usuário
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    // Valida dados
    const { email, password } = registerSchema.parse(req.body);

    // Buscar usuário no banco
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Comparar senha fornecida com a hash armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    // Retornar sucesso
    return res.status(201).json({
      message: 'Usuário logado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

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

    console.error('POST /api/auth/login:', error)
    return res.status(500).json({ error: 'Erro interno no servidor ao logar usuário' })
  }
})

// Rota protegida para verificar funcionamento do middleware
app.get('/api/auth/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  return res.status(200).json({ 
    message: 'Usuário autenticado com sucesso',
    user: req.user
  });
});