import { Container, Row, Col } from 'react-bootstrap';
import projImage from '../assets/proj.png';

export default function SobreProjeto() {
  return (
    <Container className="mt-4 px-4">
      <h1>Geração Automática de Casos de Teste</h1>
      <h4 className="text-muted">Explorando algoritmos genéticos na engenharia de software</h4>
      <p>
        Este projeto investiga métodos evolutivos aplicados à geração inteligente de testes de software.
        A proposta é aumentar a cobertura e eficiência dos testes utilizando estratégias baseadas em algoritmos genéticos.
      </p>
      <img src={projImage} alt="Ilustração do projeto" className="img-fluid rounded" />
    </Container>
  );
}