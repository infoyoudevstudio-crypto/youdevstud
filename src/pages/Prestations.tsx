import React, { useEffect, useState } from "react";
import "./Prestations.css";


const Prestations: React.FC = () => {
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
      <div className="prestations-page">
        <header className="prestations-header">
          <h1>Créons ensemble votre présence web</h1>
        </header>

        <section className="prestations-list reveal">
          <div className="prestation-card">
            <h3>Conception de site web</h3>
            <p>Création de sites modernes, responsive et optimisés pour le référencement.</p>
          </div>

          <div className="prestation-card">
            <h3>Développement sur mesure</h3>
            <p>Applications web et fonctionnalités personnalisées selon vos besoins.</p>
          </div>

          <div className="prestation-card">
            <h3>Maintenance et Support</h3>
            <p>Suivi, mises à jour et support technique pour assurer la performance.</p>
          </div>

          <div className="prestation-card">
            <h3>Rénovation de votre site</h3>
            <p>Remise au gout du jour de votre ancien site, avec de nouvelles fonction.</p>
          </div>
        </section>

        <section className="financial-aid-section reveal">
          <div className="financial-aid-content">
            <div className="logos">
              <img
                src="/images/republique-francaise.png"
                alt="République Française"
                className="financial-logo"
              />
              <img
                src="/images/logo France Num.jpg"
                alt="France Num"
                className="financial-logo-b"
              />
            </div>
            <div className="text">
              <h3>Aide financière disponible</h3>
              <p>
                Saviez-vous que vous pouvez bénéficier d'une aide financière de
                l'État pour la création ou la modernisation de votre site internet ?
                Cela peut couvrir une partie de vos dépenses pour votre projet
                digital et booster votre présence en ligne.
              </p>
              <a
                href="https://www.francenum.gouv.fr/aides-financieres/trouver-une-aide-financiere"
                target="_blank"
                rel="noopener noreferrer"
                className="financial-link"
              >
                Découvrez les aides disponibles ICI
              </a>
            </div>
          </div>
        </section>

        <section className="portfolio-section reveal">
          <h2 className="portfolio-title">Nos Réalisations</h2>
          <p className="portfolio-subtitle">
            Découvrez quelques-uns de nos projets web
          </p>

          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-image">
                <img src="/images/portfolio emgrenov.jpg" alt="Projet 1" />
                <div className="portfolio-overlay">
                  <a
                    href="https://votresite1.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    Voir le site
                  </a>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img src="/images/portfolio bouger-loger.jpg" alt="Projet 2" />
                <div className="portfolio-overlay">
                  <a
                    href="https://votresite2.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    Voir le site
                  </a>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img src="/images/portfolio pressor.jpg" alt="Projet 3" />
                <div className="portfolio-overlay">
                  <a
                    href="https://votresite3.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    Voir le site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="workflow-section reveal">
          <div className="workflow-header">
            <h2 className="workflow-title">Notre Mode de Fonctionnement</h2>
            <div className="workflow-line"></div>
            <p className="workflow-subtitle">
              De l'idée à la réalisation, nous vous accompagnons à chaque étape
            </p>
          </div>

          <div className="workflow-horizontal">
            <div className="workflow-step-h">
              <div className="step-number-h">1</div>
              <div className="step-icon-h">💬</div>
              <h3>Rendez-vous découverte</h3>
              <p>Échangeons sur votre projet, vos besoins et vos ambitions.</p>
            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step-h">
              <div className="step-number-h">2</div>
              <div className="step-icon-h">🎯</div>
              <h3>Analyse de votre activité</h3>
              <p>Présentez-moi votre univers, votre marché et vos objectifs.</p>
            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step-h">
              <div className="step-number-h">3</div>
              <div className="step-icon-h">⚡</div>
              <h3>Conception créative</h3>
              <p>Mon imagination se met au service de vos idées pour un design unique.</p>
            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step-h">
              <div className="step-number-h">4</div>
              <div className="step-icon-h">✅</div>
              <h3>Validation et mise en ligne</h3>
              <p>Maquette interactive, modifiez ou ajoutez avant le lancement de votre site.</p>
            </div>
          </div>
        </section>
      </div>

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

      {/* ===== FOOTER ===== */}
      
    </>
  );
};

export default Prestations;
