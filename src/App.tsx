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
import { fetchTrabalhos } from './services/api';

export default function App() {
  const [trabalhos, setTrabalhos] = useState<TrabalhoRelacionado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFromApi = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchTrabalhos(); // Chamada
      setTrabalhos(data); // Armazena no estado de trabalhos
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Falha ao carregar trabalhos: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {  // removi efeito falso
    loadFromApi();  //chama API real
  }, []);

  const handleRetry = () => {
    loadFromApi();  //chama API real
  }

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

  if (error) {
    return (
      <div className="container py-5 text-center text-danger">
        <h2>Ops!</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={handleRetry}>
          Tentar novamente
        </button>
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
