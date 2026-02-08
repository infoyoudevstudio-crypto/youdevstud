// backend/api/contact.js
import supabase from '../src/config/supabaseClient.js';
import transporter from '../config/email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Méthode non autorisée',
    });
  }

  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont requis',
    });
  }

  // 🔹 Extraire le téléphone depuis le message
  const phoneMatch = message.match(/Téléphone:\s*([^\n]+)/);
  const phone = phoneMatch ? phoneMatch[1].trim() : null;
  const cleanMessage = message.replace(/Téléphone:.*(\n|\r|\r\n)?/, '').trim();

  try {
    // 1️⃣ Enregistrement dans Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: nom,
          email,
          phone,
          message: cleanMessage,
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l’enregistrement',
      });
    }

    const contactId = data.id;

    // 2️⃣ Envoi de l’email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🆕 Nouveau message de ${nom}`,
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Message enregistré avec l'ID : ${contactId}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Message enregistré et email envoyé',
      id: contactId,
    });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
}
