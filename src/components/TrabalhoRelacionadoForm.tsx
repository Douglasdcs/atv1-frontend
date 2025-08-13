import React, {useState} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import type { TrabalhoRelacionado } from "../entities/TrabalhoRelacionado";
// import {TrabalhoRelacionado} from "../entities/TrabalhoRelacionado";


export type TrabalhoRelacionadoData = Omit<TrabalhoRelacionado, 'id'>;

interface TrabalhoRelacionadoFormProps {
    onAddTrabalho: (trabalho: TrabalhoRelacionadoData) => void;
}

function TrabalhoRelacionadoForm({ onAddTrabalho }: TrabalhoRelacionadoFormProps) {
  const [title, setTitle] = useState<string>('');
  const [doi, setDoi] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autor, setAutor] = useState<string>('');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Valida os campos do formulário
    if (!title || !doi || !resumo || !autor) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Cria um novo trabalho relacionado com os dados do formulário
    onAddTrabalho({ title, doi, resumo, autor });
    
    // Limpa os campos do formulário após adicionar o trabalho
    setTitle('');
    setDoi('');
    setResumo('');
    setAutor('');
    
  };

  return (
    <Container className="mt-4">
        <form onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Col md={6}>
            <label className="form-label">Título</label>
            <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título"
            />
            </Col>
            <Col md={6}>
            <label className="form-label">DOI</label>
            <input
                type="text"
                className="form-control"
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                placeholder="Digite o DOI"
            />
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
            <label className="form-label">Autor</label>
            <input
                type="text"
                className="form-control"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Digite o nome do autor"
            />
            </Col>
            <Col md={6}>
            <label className="form-label">Resumo</label>
            <textarea
                className="form-control"
                rows={3}
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                placeholder="Digite o resumo"
            />
            </Col>
        </Row>

        <Row>
            <Col className="text-end">
            <button type="submit" className="btn btn-primary">
                Adicionar Trabalho
            </button>
            </Col>
        </Row>
        </form>
    </Container>
    );
}

export default TrabalhoRelacionadoForm;
