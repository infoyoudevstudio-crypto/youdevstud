import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Prestations from "./pages/Prestations";
import Contact from "./pages/Contact";
import { useInertiaScroll } from "./hooks/useInertiaScroll";

function App() {
  useInertiaScroll(0.85, 0.18);

  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prestations" element={<Prestations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
