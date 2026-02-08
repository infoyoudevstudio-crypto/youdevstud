// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Autorise les requêtes depuis le frontend
app.use(express.json());

// Route API
app.post('/api/contact', contactHandler);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API YouDevStudio en ligne ✅' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
}); 