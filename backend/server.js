import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', contactHandler);

app.get('/', (req, res) => {
  res.json({ message: 'API YouDevStudio en ligne ✅' });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});