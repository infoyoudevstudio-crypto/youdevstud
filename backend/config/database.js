// src/config/database.js
import pg from 'pg';
import dotenv from 'dotenv';

// Charge le .env du dossier backend
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test de connexion (optionnel, pour déboguer)
pool.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à PostgreSQL:', err);
  } else {
    console.log('✅ Connecté à PostgreSQL');
  }
});

export default pool;