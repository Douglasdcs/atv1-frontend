import type { TrabalhoRelacionado } from "../entities/TrabalhoRelacionado";
import { Container, Row, Col, Card } from 'react-bootstrap';

interface TrabalhoRelacionadoCardProps {
    trabalho: TrabalhoRelacionado;
}

export function TrabalhoRelacionadoCard({ trabalho }: TrabalhoRelacionadoCardProps) {
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={6} className="d-flex">
      <Card className="shadow-sm flex-fill">
        <Card.Body className="d-flex flex-column">
          <Card.Title>{trabalho.title}</Card.Title>
          <Card.Subtitle className="text-secondary">{trabalho.autor}</Card.Subtitle>
          <hr />
          <Card.Text className="flex-grow-1">{trabalho.resumo}</Card.Text>
          <Card.Footer>
            <a href={`https://doi.org/${trabalho.doi}`} target="_blank" rel="noopener noreferrer">
              {trabalho.doi}
            </a>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
}
