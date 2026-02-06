import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const location = useLocation(); // Pour savoir sur quelle page on est

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;

      // La navbar disparaît après 30% du scroll
      setHidden(scrollY > pageHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${hidden ? "hidden" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
        <img src="/images/mon logo transparent.png" alt="YOUdevstudio" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/prestations" className={location.pathname === "/prestations" ? "active" : ""}>
            Prestations
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
