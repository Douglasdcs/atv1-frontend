import { Container, Row, Col, Card } from 'react-bootstrap';

export default function TrabalhosRelacionados() {
  const cards = [
    {
      title: "Automated Unit Test Case Generation: A Systematic Literature Review",
      doi: "https://doi.org/10.48550/arXiv.2504.20357",
      resumo: "A automação de testes de software tem ganhado destaque pela necessidade de reduzir custos e evitar falhas graves. Esta revisão analisa lacunas nos algoritmos evolutivos — como Algoritmo Genético e Particle Swarm — e propõe melhorias com redes neurais, testes de mutação e combinações híbridas. Também discute desafios como legibilidade e uso de mocks.",
      autor: "Jason Wang, Basem Suleiman, Muhammad Johan Alibasa"
    },
    {
      title: "Automatic Generation of Test Cases Based on Genetic Algorithm and RBF Neural Network",
      doi: "https://doi.org/10.1155/2022/1489063",
      resumo: "Para melhorar a objetividade e cobertura dos testes de software, foi proposto um método automático de geração de casos de teste baseado em algoritmo genético e rede neural RBF (GAR). O algoritmo simula a função de fitness para selecionar melhores testes. Testado com 7 códigos em C, o método superou abordagens tradicionais como PDGA, SGA e testes aleatórios, oferecendo maior cobertura de ramificações com menos iterações.",
      autor: "Liu, Zhenpeng and Yang, Xianwei and Zhang, Shichen and Liu, Yi and Zhao, Yonggang and Zheng, Weihua and D'Mello, Demian"
    },
    {
      title: "Benefícios e DiferenciaisAdaptive Genetic Algorithm (AGA) Based Optimal Directed Random Testing for Reducing Interactive Faults",
      doi: "https://doi.org/10.21817/indjcse/2021/v12i2/211202170",
      resumo: "O objetivo dos testes de software é identificar erros e garantir o funcionamento correto dos programas. Para melhorar a eficiência dos testes aleatórios, foi proposta uma abordagem baseada em teste dirigido com Algoritmo Genético Adaptativo (AGA) e modelo de dependência de comportamento dos objetos. Essa técnica gera entradas mais relevantes, evita dados inválidos e melhora a cobertura e escalabilidade dos testes.",
      autor: "K. Koteswara Rao, Y. Saroja, N. Ramesh Babu, G. Lalitha Kumari, Y. Surekha"
    },
    {
      title: "Kotsuite: Unit Test Generation for Kotlin Programs in Android Applications",
      doi: "https://doi.org/10.1109/ICPC66645.2025.00032",
      resumo: "A ferramenta KotSuite foi criada para automatizar testes unitários em aplicativos Android desenvolvidos com Kotlin, uma linguagem que tem ganhado espaço pela sua segurança e integração com Java. Diferente de ferramentas tradicionais, KotSuite usa análise estática e algoritmo genético para gerar testes eficazes, superando limitações de ferramentas como EvoSuite e Randoop. Nos testes realizados, atingiu em média 66% de cobertura de linhas e 60,4% de cobertura de ramificações.",
      autor: "F. Yang, Q. Xin, Z. Ren and J. Xuan"
    }
  ];
    return (
    <Container fluid className="mt-5">
        <Row className="g-3">
        {cards.map((card, idx) => (
            <Col xs={12} sm={6} md={6} lg={6} xl={6} key={idx} className="d-flex">
            <Card className="shadow-sm flex-fill">
                <Card.Body className="d-flex flex-column">
                <Card.Title>{card.title}</Card.Title>
                <Card.Subtitle className="text-secondary">{card.autor}</Card.Subtitle>
                <hr/>
                <Card.Text className="flex-grow-1">{card.resumo}</Card.Text>
                <Card.Footer>
                    <a href={`https://doi.org/${card.doi}`} target="_blank" rel="noopener noreferrer">
                        {card.doi}
                    </a>
                </Card.Footer>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </Container>
    );
}
