import pool from '../config/database.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont requis'
    });
  }

  try {
    // 1️⃣ Enregistrement en base
    await pool.query(
      `INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)`,
      [nom, email, message]
    );

    // 2️⃣ Envoi de l’email
    await transporter.sendMail({
      from: `"Formulaire YouDevStudio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // tu reçois le mail
      replyTo: email,
      subject: `Nouveau message de ${nom}`,
      html: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
}
