import { Container, Row, Col, Card } from 'react-bootstrap';

export default function CardSection() {
  const cards = [
    {
      title: "Funcionalidades Principais",
      text: "Geração de casos de teste com base em métricas evolutivas e cobertura de código.",
    },
    {
      title: "Tecnologias Utilizadas",
      text: "React, TypeScript, Bootstrap, Algoritmos Genéticos, Ferramentas de Teste Automatizado.",
    },
    {
      title: "Benefícios e Diferenciais",
      text: "Aumenta a confiabilidade do software, reduz o esforço manual e explora técnicas inovadoras.",
    }
  ];

  return (
    <Container className="mt-5">
      <Row>
        {cards.map((card, idx) => (
          <Col md={4} key={idx}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}