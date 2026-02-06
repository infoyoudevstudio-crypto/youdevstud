const { Pool } = require('pg');

// Configuration de la connexion PostgreSQL
const pool = new Pool({
    user: 'postgres',              // votre utilisateur PostgreSQL
    host: 'localhost',
    database: 'youdevstud',        // votre base de données
    password: 'Anissa25*', // ⚠️ REMPLACEZ par votre vrai mot de passe PostgreSQL
    port: 5432,
});

// Test de connexion
pool.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à PostgreSQL:', err);
    } else {
        console.log('✅ Connecté à PostgreSQL - Base: youdevstud');
    }
});

module.exports = pool;