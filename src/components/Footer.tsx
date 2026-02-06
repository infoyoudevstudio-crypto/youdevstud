export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>a propos de</h3>
          <span className="you-text">YOU</span>
          <span className="dev-text">devstudio</span>
          <p>"Votre partenaire digital de confiance"</p>
          <p>"Du concept au succès en ligne"</p>
          <p>"Créons ensemble votre présence web"</p>
          <p>"Basé à Baume-les-Dames, disponible pour vous rencontrer en 10 minutes".</p>
          <img src="/images/logo meta google partner.jpeg"className="footer-logo" />
             
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            Email :{" "}
            <a href="mailto:info.youdevstudio@gmail.com" className="footer-link">
              info.youdevstudio@gmail.com
            </a>
          </p>
          <p>
            Téléphone FR :{" "}
            <a href="tel:+33625250312" className="footer-link">
              +33 6 25 25 03 12
            </a>
          </p>
          <p>
            Téléphone CH :{" "}
            <a href="tel:+41798745131" className="footer-link">
              +41 7 98 74 51 31
            </a>
          </p>
        </div>

        {/* REMPLACEMENT DE "SUIVEZ-NOUS" */}
        <div className="footer-section footer-logo-section">
          <h3>YOUdevstudio</h3>
          
            <img
              src="/images/mon logo transparent.png"className="footer-logo" />
              
              
           
          
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YOUdevstudio. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
