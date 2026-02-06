import { useState, useEffect } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [tokenInput, setTokenInput] = useState("");
  const [token, setToken] = useState("");

  const BACKEND_URL = "http://localhost:3001"; // <-- important

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Non autorisé ou erreur serveur");
      const data = await res.json();
      setMessages(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogin = () => {
    setToken(tokenInput.trim());
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur suppression");
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  if (!token)
    return (
      <div style={{ padding: "50px" }}>
        <h2>Connexion Admin</h2>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Messages Admin</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Message</th>
            <th>Envoyé le</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.nom}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteMessage(msg.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
