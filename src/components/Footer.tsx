import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 w-100 mt-auto">
      <div className="container-fluid text-center">
        <p>Douglas de Castro Santos | 1º Semestre</p>
        <p>Curso Desenvolvimento Web e Mobile</p>
        <p>Email: douglas@email.com</p>
        <p><a href="https://github.com/seuusuario/seurepositorio" target="_blank" rel="noopener noreferrer" className="text-light">Ver código no GitHub</a></p>
      </div>
    </footer>
  );
}


// <footer className="bg-dark text-light py-4 w-100">
//   <div className="container text-center">
//   </div>
// </footer>