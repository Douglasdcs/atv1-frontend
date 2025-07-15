import { Container, Row, Col, Card } from 'react-bootstrap';

export default function CardSection() {
  const cards = [
    {
      title: "Funcionalidades Principais",
      text: "Geração de casos de teste com base em algoritmos evolutivos com foco em cobertura de código.",
    },
    {
      title: "Tecnologias Utilizadas",
      text: "Java 21",
    },
    {
      title: "Benefícios e Diferenciais",
      text: "Aumenta a confiabilidade do software, reduz o esforço manual e diminui os custos com correção de falhas.",
    }
  ];
    return (
    <Container className="mt-5">
        <Row className="g-3">
        {cards.map((card, idx) => (
            <Col md={4} key={idx} className="d-flex">
            <Card className="shadow-sm flex-fill">
                <Card.Body className="d-flex flex-column">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text className="flex-grow-1">{card.text}</Card.Text>
                {/* Se tiver um botão ou footer no card, coloque com mt-auto para ficar embaixo */}
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </Container>
    );

}