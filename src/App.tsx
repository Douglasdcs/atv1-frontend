import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/Navbar';
import Footer from './components/Footer';
import SobreProjeto from './components/SobreProjeto';
import CardSection from './components/CardSection';
import TrabalhosRelacionados from './components/TrabalhosRelacionados';

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <TopNavbar />
        <main className="flex-fill">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container-fluid py-4">
                  <SobreProjeto />
                  <CardSection />
                </div>
              }
            />
            <Route
              path="/trabalhos"
              element={
                // <div className="container-fluid text-center py-5">
                //   <h2>Trabalhos Relacionados</h2>
                //   <p>Trabalho 1</p>
                //   <p>Trabalho 2</p>
                //   <p>Trabalho 3</p>
                //   <p>Trabalho 4</p>
                // </div>
                <div className="container-fluid">
                  <TrabalhosRelacionados/>
                </div>
              }
            />
            <Route
              path="/contato"
              element={
                <div className="container-fluid text-center py-5">
                  <h2>Contato</h2>
                  
                  <p>Douglas: douglas@gmail.com</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
