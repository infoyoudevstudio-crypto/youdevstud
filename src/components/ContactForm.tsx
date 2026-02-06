import { useState } from "react";
import type { FormEvent } from "react";
import './ContactForm.css'; // Assure-toi de créer ce fichier pour le style

export default function ContactForm() {
  const [nom, setNom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, message }),
      });

      if (res.ok) {
        setStatus("Message envoyé !");
        setNom("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Erreur serveur, réessayez.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Impossible de se connecter au backend");
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

