import { Container, Row, Col, Card } from 'react-bootstrap';
import type { TrabalhoRelacionado } from '../entities/TrabalhoRelacionado';
import { TrabalhoRelacionadoCard } from './TrabalhoRelacionadoCard';
import React, {useState} from 'react';
import type { TrabalhoRelacionadoData } from './TrabalhoRelacionadoForm';

interface TrabalhosRelacionadosProps {
  trabalhos: TrabalhoRelacionado[];
  setTrabalhos: React.Dispatch<React.SetStateAction<TrabalhoRelacionado[]>>;
}

export default function TrabalhosRelacionados({ trabalhos, setTrabalhos }: TrabalhosRelacionadosProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Em mudanças, faz busca e seta setSearchTerm
  const handleSearchChange = ( event : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const trabalhosFiltrados = trabalhos.filter (trabalho => 
    trabalho.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleAddTrabalho = (newTrabalho: TrabalhoRelacionadoData) => {
  //   const newTrabalhoWithId: TrabalhoRelacionado = {
  //     ...newTrabalho,
  //     id: trabalhos.length > 0 ? Math.max(...trabalhos.map(p => p.id)) + 1 : 1,
  //   };
  //   setTrabalhos(prevTrabalhos => [...prevTrabalhos, newTrabalhoWithId]);
  // };


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
