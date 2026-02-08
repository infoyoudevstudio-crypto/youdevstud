// backend/api/contact.js
import pool from '../config/database.js';
import transporter from '../config/email.js';

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

  // Extraire le téléphone
  const phoneMatch = message.match(/Téléphone:\s*([^\n]+)/);
  const phone = phoneMatch ? phoneMatch[1].trim() : null;
  const cleanMessage = message.replace(/Téléphone:.*\n\n/, '');

  try {
    // 1. Enregistrer dans la base de données
    const query = `
      INSERT INTO contacts (name, email, phone, message, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id
    `;
    
    const result = await pool.query(query, [nom, email, phone, cleanMessage]);

    // 2. Envoyer l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Vous recevez l'email sur votre propre adresse
      subject: `🆕 Nouveau message de ${nom}`,
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Message enregistré avec l'ID : ${result.rows[0].id}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Message enregistré et email envoyé',
      id: result.rows[0].id
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      error: error.message
    });
  }
}