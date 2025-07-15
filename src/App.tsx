import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/Navbar';
import Footer from './components/Footer';
import SobreProjeto from './components/SobreProjeto';
import CardSection from './components/CardSection';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <TopNavbar />
        <div className="flex-grow-1 container-fluid">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SobreProjeto />
                  <CardSection />
                </>
              }
            />
            <Route
              path="/trabalhos"
              element={
                <h2 className="text-center mt-5">Trabalhos Relacionados (em breve)</h2>
              }
            />
            <Route
              path="/contato"
              element={<h2 className="text-center mt-5">Contato (em breve)</h2>}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}