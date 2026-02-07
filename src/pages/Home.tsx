import React, { useEffect, useState } from "react";
import "./Home.css";
import "../components/Footer.css";

const Home: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const offset = 120;

      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const bottom = el.getBoundingClientRect().bottom;

        if (top < windowHeight - offset && bottom > offset) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      setShowTopButton(scrollPosition > pageHeight * 0.9);
      revealOnScroll();
    };

    window.addEventListener("scroll", handleScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== HERO (VIDEO) ===== */}
      <div className="home-video">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/animation.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ===== CARTES PRESTATIONS ===== */}
      <section className="prestations">
        <div className="prestation reveal">
          <div className="prestation-image from-right">
            <img src="/images/vitrine.jpg" alt="Site vitrine" />
          </div>
          <div className="prestation-text from-left">
            <h2>Site vitrine</h2>
            <p>Site moderne, rapide et optimisé.</p>
            <a 
              href="mailto:info.youdevstudio@gmail.com?subject=Demande%20de%20devis%20Site%20Vitrine" 
              className="btn-devis"
            >
              Demander un devis
            </a>
          </div>
        </div>

        <div className="prestation reverse reveal">
          <div className="prestation-image from-left">
            <img src="/images/ecommerce.png" alt="E-commerce" />
          </div>
          <div className="prestation-text from-right">
            <h2>E-commerce</h2>
            <p>Boutique en ligne performante et sécurisée.</p>
            <a 
              href="mailto:info.youdevstudio@gmail.com?subject=Demande%20de%20devis%20E-commerce" 
              className="btn-devis"
            >
              Demander un devis
            </a>
          </div>
        </div>

        <div className="prestation reveal">
          <div className="prestation-image from-right">
            <img src="/images/marketing.webp" alt="SEO" />
          </div>
          <div className="prestation-text from-left">
            <h2>SEO & marketing</h2>
            <p>Visibilité Google et acquisition clients.</p>
            <a 
              href="mailto:info.youdevstudio@gmail.com?subject=Demande%20de%20devis%20SEO%20%26%20Marketing" 
              className="btn-devis"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </section>

      {/* ===== PARALLAX ===== */}
      <section className="parallax-separator">
        <div className="parallax-overlay">
          <div className="parallax-content">
            <h2 className="parallax-title">
              Votre présence digitale mérite l'excellence
            </h2>
            <p className="parallax-subtitle">
              Nous créons des expériences web sur mesure qui captivent vos clients
              et propulsent votre croissance.
            </p>
            <a 
              href="mailto:info.youdevstudio@gmail.com?subject=Demande%20de%20devis" 
              className="parallax-cta"
            >
              Démarrer votre projet
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION SCINTILLEMENT ===== */}
      <section className="sparkle-section">
        <div className="sparkle-overlay">
          <div className="sparkle-content">
            <div className="logo-container">
              <img
                src="/images/mon logo transparent.png"
                alt="YOUdevstudio logo"
                className="sparkle-logo"
              />
            </div>

            <h2 className="sparkle-title">
              <span className="you-text">YOU</span>
              <span className="dev-text">devstudio</span>
            </h2>

            <p className="sparkle-tagline">
              Créons ensemble votre présence web
            </p>

            <p className="sparkle-text">
              Plus qu'une agence web, nous sommes vos partenaires
              de réussite digitale.
            </p>

            <p className="sparkle-highlight">
              Innovation • Performance • Excellence
            </p>

            <a 
              href="mailto:info.youdevstudio@gmail.com?subject=Demande%20de%20devis" 
              className="sparkle-cta"
            >
              Créons ensemble votre succès
            </a>
          </div>
        </div>

        <div className="sparkles">
          {[...Array(50)].map((_, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* ===== BOUTON BACK TO TOP ===== */}
      {showTopButton && (
        <button 
          className="back-to-top" 
          onClick={() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
        >
          ↑ Top
        </button>
      )}
    </>
  );
};

export default Home;
