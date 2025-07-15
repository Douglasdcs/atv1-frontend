import { Container } from 'react-bootstrap';

function obterDataFormatada() {
  const hoje = new Date();
  return hoje.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container fluid className="text-center">
        <p>Douglas de Castro Santos | 1º Semestre</p>
        <p>Curso Desenvolvimento Web e Mobile</p>
        <p>Email: douglas@email.com</p>
        <p>
          <a
            href="https://github.com/Douglasdcs/atv1-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            GitHub
          </a>
        </p>
        <p className="mt-3">
          {obterDataFormatada().replace(/^./, c => c.toUpperCase())}
        </p>
      </Container>
    </footer>
  );
}
