import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Mailjet from 'node-mailjet';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const RECIPIENT = process.env.RECIPIENT_EMAIL || 'hello@aurysroses.com';
const SENDER = process.env.SENDER_EMAIL || 'no-reply@aurysroses.com';

const MJ_API_KEY = process.env.MAILJET_API_KEY || '';
const MJ_API_SECRET = process.env.MAILJET_API_SECRET || '';
let mailjetClient = null;
if (MJ_API_KEY && MJ_API_SECRET) {
  // node-mailjet v3 exposes Client.apiConnect
  mailjetClient = Mailjet.Client && Mailjet.Client.apiConnect
    ? Mailjet.Client.apiConnect(MJ_API_KEY, MJ_API_SECRET)
    : null;
} else {
  console.warn('Mailjet API keys not set — emails will be simulated (check .env).');
}

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  const html = `
    <p><strong>Name:</strong> ${name || '—'}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '—'}</p>
    <p><strong>Message:</strong></p>
    <p>${(message || '').replace(/\n/g, '<br/>')}</p>
  `;

  if (!mailjet) {
    console.log('Mailjet not configured — simulated email:');
    console.log({ to: RECIPIENT, from: SENDER, subject: `New contact form message from ${name || 'Website Visitor'}`, html });
    return res.json({ ok: true, simulated: true });
  }

  try {
    const request = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: { Email: SENDER, Name: 'Aurys roses' },
          To: [{ Email: RECIPIENT }],
          Subject: `New contact form message from ${name || 'Website Visitor'}`,
          HTMLPart: html,
        },
      ],
    });

    return res.json({ ok: true, result: request.body });
  } catch (err) {
    console.error('Mailjet error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Contact server listening on port ${PORT}`));
