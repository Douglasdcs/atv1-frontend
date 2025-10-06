// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type TrabalhoRelacionadoInput = Prisma.TrabalhoRelacionadoCreateManyInput // tipagem para o seed

async function main() {
  console.log('Iniciando seed do banco de dados...')

  // Limpa a tabela antes de popular
  await prisma.trabalhoRelacionado.deleteMany()

  // Cria trabalhos de exemplo
  const trabalhos = await prisma.trabalhoRelacionado.createMany({
    data: [
      {
        title: "Detecção Automática de Falhas em Aplicações Java Utilizando Mutação de Código",
        doi: "10.5678/java.test.2025.001",
        resumo: "Este trabalho investiga o uso de mutação de código para avaliar a eficácia de suítes de teste em sistemas Java, destacando sua aplicação na detecção de falhas sutis.",
        autor: "Ana Martins"
      },
      {
        title: "Otimização de Testes Unitários em Java com Base em Algoritmos Evolutivos",
        doi: "10.5678/java.test.2025.002",
        resumo: "Propõe-se um método de otimização de testes unitários em projetos Java por meio de algoritmos evolutivos, reduzindo redundância e melhorando a eficiência da execução.",
        autor: "Pedro Almeida"
      },
      {
        title: "Cobertura Estrutural em Aplicações Java: Um Estudo Comparativo de Ferramentas Open Source",
        doi: "10.5678/java.test.2025.003",
        resumo: "Este artigo analisa ferramentas de cobertura estrutural (como JaCoCo e Cobertura) em projetos Java, comparando desempenho, métricas e facilidade de integração.",
        autor: "Juliana Costa"
      },
      {
        title: "Geração Automática de Casos de Teste em Java Usando Inteligência Artificial",
        doi: "10.5678/java.test.2025.004",
        resumo: "Explora a aplicação de técnicas de aprendizado de máquina para a geração automática de casos de teste em projetos Java, visando aumentar a cobertura e reduzir esforço manual.",
        autor: "Ricardo Nunes"
      },
      {
        title: "Avaliação de Estratégias de Teste de Mutantes em Projetos Java Críticos",
        doi: "10.5678/java.test.2025.005",
        resumo: "O trabalho apresenta um estudo experimental sobre a eficácia de diferentes estratégias de teste de mutantes em sistemas Java utilizados em aplicações críticas.",
        autor: "Beatriz Moreira"
      },
      {
        title: "Métricas de Qualidade em Testes Automatizados com JUnit e TestNG",
        doi: "10.5678/java.test.2025.006",
        resumo: "Foca na análise de métricas de qualidade de código e testes automatizados utilizando frameworks Java populares (JUnit e TestNG), com recomendações de boas práticas.",
        autor: "Marcelo Vieira"
      }
    ]

  })

  console.log(` (v) ${trabalhos.count} trabalhos criados com sucesso!`)
}

main()
  .catch((e) => {
    console.error('(x) Erro ao popular o banco:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
