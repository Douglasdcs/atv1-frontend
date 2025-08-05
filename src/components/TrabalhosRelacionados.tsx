import { Container, Row, Col, Card } from 'react-bootstrap';
import type { TrabalhoRelacionado } from '../entities/TrabalhoRelacionado';
import { TrabalhoRelacionadoCard } from './TrabalhoRelacionadoCard';
import React, {useState} from 'react';

export default function TrabalhosRelacionados() {
  const [trabalhos, setTrabalhos] = useState<TrabalhoRelacionado[]>([
    {
      id: 1,
      title: "Automated Unit Test Case Generation: A Systematic Literature Review",
      doi: "https://doi.org/10.48550/arXiv.2504.20357",
      resumo: "A automação de testes de software tem ganhado destaque pela necessidade de reduzir custos e evitar falhas graves. Esta revisão analisa lacunas nos algoritmos evolutivos — como Algoritmo Genético e Particle Swarm — e propõe melhorias com redes neurais, testes de mutação e combinações híbridas. Também discute desafios como legibilidade e uso de mocks.",
      autor: "Jason Wang, Basem Suleiman, Muhammad Johan Alibasa"
    },
    {
      id: 2,
      title: "Automatic Generation of Test Cases Based on Genetic Algorithm and RBF Neural Network",
      doi: "https://doi.org/10.1155/2022/1489063",
      resumo: "Para melhorar a objetividade e cobertura dos testes de software, foi proposto um método automático de geração de casos de teste baseado em algoritmo genético e rede neural RBF (GAR). O algoritmo simula a função de fitness para selecionar melhores testes. Testado com 7 códigos em C, o método superou abordagens tradicionais como PDGA, SGA e testes aleatórios, oferecendo maior cobertura de ramificações com menos iterações.",
      autor: "Liu, Zhenpeng and Yang, Xianwei and Zhang, Shichen and Liu, Yi and Zhao, Yonggang and Zheng, Weihua and D'Mello, Demian"
    },
    {
      id: 3,
      title: "Benefícios e DiferenciaisAdaptive Genetic Algorithm (AGA) Based Optimal Directed Random Testing for Reducing Interactive Faults",
      doi: "https://doi.org/10.21817/indjcse/2021/v12i2/211202170",
      resumo: "O objetivo dos testes de software é identificar erros e garantir o funcionamento correto dos programas. Para melhorar a eficiência dos testes aleatórios, foi proposta uma abordagem baseada em teste dirigido com Algoritmo Genético Adaptativo (AGA) e modelo de dependência de comportamento dos objetos. Essa técnica gera entradas mais relevantes, evita dados inválidos e melhora a cobertura e escalabilidade dos testes.",
      autor: "K. Koteswara Rao, Y. Saroja, N. Ramesh Babu, G. Lalitha Kumari, Y. Surekha"
    },
    {
      id: 4,
      title: "Kotsuite: Unit Test Generation for Kotlin Programs in Android Applications",
      doi: "https://doi.org/10.1109/ICPC66645.2025.00032",
      resumo: "A ferramenta KotSuite foi criada para automatizar testes unitários em aplicativos Android desenvolvidos com Kotlin, uma linguagem que tem ganhado espaço pela sua segurança e integração com Java. Diferente de ferramentas tradicionais, KotSuite usa análise estática e algoritmo genético para gerar testes eficazes, superando limitações de ferramentas como EvoSuite e Randoop. Nos testes realizados, atingiu em média 66% de cobertura de linhas e 60,4% de cobertura de ramificações.",
      autor: "F. Yang, Q. Xin, Z. Ren and J. Xuan"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Em mudanças, faz busca e seta setSearchTerm
  const handleSearchChange = ( event : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const trabalhosFiltrados = trabalhos.filter (trabalho => 
    trabalho.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // adiciona novo trabalho
  const addNovoTrabalho = () => {
    const novoTrabalho: TrabalhoRelacionado = {
      id: trabalhos.length + 1,
      title: "Novo Trabalho Relacionado",
      doi: "https://doi.org/10.1234/novo.trabalho",
      resumo: "Este é um resumo do novo trabalho relacionado.",
      autor: "Autor Desconhecido"
    };
    //cria novo array de trabalhos e adiciona o novo trabalho
    setTrabalhos([...trabalhos, novoTrabalho]);
  }

    return (
      <Container fluid className="mt-5">
        
        {/* BARRA DE BUSCA - AULA 4 */}
        <section className="my-4">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <span className="input-group-text">
                  🔍
                </span>
              </div>
            </div>
          </div>
        </section>
         
        <Row className="g-3">
          {trabalhosFiltrados.length === 0 ? (
            <Col>
              <div className="text-center text-muted">Nenhum trabalho encontrado.</div>
            </Col>
          ) : (
            trabalhosFiltrados.map(trabalho => (
              <TrabalhoRelacionadoCard 
                key={trabalho.id}
                trabalho={trabalho} 
              />
            ))
          )}
        </Row>
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={addNovoTrabalho}>
            Adicionar Novo Trabalho Relacionado
          </button>
        </div>
      </Container>
      
    );
}
