import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/Navbar';
import Footer from './components/Footer';
import SobreProjeto from './components/SobreProjeto';
import CardSection from './components/CardSection';
import TrabalhosRelacionados from './components/TrabalhosRelacionados';
import TrabalhoRelacionadoForm from './components/TrabalhoRelacionadoForm';
import type { TrabalhoRelacionadoData } from './components/TrabalhoRelacionadoForm';
import { useEffect, useState } from "react";
import type { TrabalhoRelacionado } from './entities/TrabalhoRelacionado';


export default function App() {
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTrabalho = (newTrabalho: TrabalhoRelacionadoData) => {
    const newTrabalhoWithId: TrabalhoRelacionado = {
      ...newTrabalho,
      id: trabalhos.length > 0 ? Math.max(...trabalhos.map(p => p.id)) + 1 : 1,
    };
    setTrabalhos((prev) => [...prev, newTrabalhoWithId]);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid #ccc',
          borderTop: '6px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#555' }}>Carregando...</p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <TopNavbar />
        <main className="flex-fill overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container-fluid py-4">
                  <SobreProjeto />
                  <CardSection />
                </div>
              }
            />
            <Route
              path="/trabalhos"
              element={
                <div className="container-fluid py-5">
                  <h2 className="mb-4">Trabalhos Relacionados</h2>
                  <TrabalhoRelacionadoForm
                    onAddTrabalho={(trabalho) => {
                      console.log("Trabalho adicionado:", trabalho);
                      handleAddTrabalho(trabalho);
                    }}
                  />
                  <TrabalhosRelacionados trabalhos={trabalhos} setTrabalhos={setTrabalhos} />
                </div>
              }
            />
            <Route
              path="/contato"
              element={
                <div className="container-fluid text-center py-5">
                  <h2>Contato</h2>
                  <p>Douglas: douglas@gmail.com</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}