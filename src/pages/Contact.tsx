import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      setShowTopButton(scrollPosition > pageHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Envoi du formulaire
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("Envoi en cours...");

  try {
    const dataToSend = {
      nom: form.name,
      email: form.email,
      message: `Téléphone: ${form.phone}\n\n${form.message}`
    };

    const res = await fetch("https://youdevstudio-1.onrender.com/api/contact", { // ← CHANGEZ ICI
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("Message envoyé ✅");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("Erreur lors de l'envoi ❌");
    }
  } catch (err) {
    console.error(err);
    setStatus("Erreur de connexion au serveur ❌");
  }
};

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-overlay">
          <h1>Contactez-nous</h1>
          <p>Nous sommes là pour répondre à toutes vos questions</p>
        </div>
      </section>

      {/* FORMULAIRE + CONTACT DIRECT */}
      <section className="contact-section">
        <div className="contact-form-container">
          <h2>Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom *</label>
            <input
              type="text"
              id="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />

            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <label htmlFor="phone">Téléphone *</label>
            <input
              type="tel"
              id="phone"
              placeholder="Votre numéro"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
              autoComplete="tel"
            />

            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows={6}
              placeholder="Votre message"
              value={form.message}
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <button type="submit" className="btn-submit">
              Envoyer
            </button>
          </form>
          {status && <p className="form-status">{status}</p>}
        </div>

        <div className="contact-info">
          <h3>Contact direct</h3>
          <p>
            Email : <a href="mailto:info.youdevstudio@gmail.com">info.youdevstudio@gmail.com</a>
          </p>
          <p>
            Téléphone FR: <a href="tel:+33625250312">+33 6 25 25 03 12</a>
          </p>
          <p>
            Téléphone CH: <a href="tel:+41798745131">+41 7 98 74 51 31</a>
          </p>
        </div>
      </section>

      {/* BOUTON BACK TO TOP */}
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

export default Contact;
