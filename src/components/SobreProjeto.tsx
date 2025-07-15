import { Container, Row, Col } from 'react-bootstrap';
import projImage from '../assets/proj.png';

export default function SobreProjeto() {
  return (
    <Container className="mt-4 px-4">
      <h1>Geração Automática de Casos de Teste</h1>
      <h4 className="text-muted">Explorando a aplicação de algoritmos genéticos na engenharia de software</h4>
      <p>
        Este Trabalho de Conclusão de Curso investiga a utilização de algorítmos genéticos aplicados à geração automática de casos de testes de software.
        A proposta é aumentar a cobertura dos testes utilizando estratégias baseadas em algoritmos genéticos.
      </p>
      <div className="text-center my-3">
        <img
            src={projImage}
            alt="Ilustração teste"
            className="img-fluid rounded"
            style={{ maxWidth: '400px' }}
        />
        </div>

    </Container>
  );
}