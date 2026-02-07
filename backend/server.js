require('dotenv').config(); // <-- Charge les variables d'environnement
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// ⚡ Configuration Nodemailer via .env
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Le serveur fonctionne !' });
});

// Route pour recevoir les messages du formulaire
app.post('/api/contact', async (req, res) => {
    try {
        const { nom, email, message } = req.body;

        if (!nom || !email || !message) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Insertion dans PostgreSQL
        const result = await pool.query(
            'INSERT INTO messages_contact (nom, email, message) VALUES ($1, $2, $3) RETURNING *',
            [nom, email, message]
        );

        console.log('✅ Message enregistré dans la DB:', result.rows[0]);

        // Envoi email
        await transporter.sendMail({
            from: `"YouDevStudio" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Nouveau message de ${nom}`,
            text: `Nom: ${nom}\nEmail: ${email}\n\n${message}`,
        });

        console.log('📧 Email envoyé !');

        res.status(201).json({
            success: true,
            message: 'Message envoyé avec succès !',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du message ou de l'envoi de l'email" });
    }
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

