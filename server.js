import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Mailjet from 'node-mailjet';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- MAILJET SETUP ---------------- */

const RECIPIENT = process.env.RECIPIENT_EMAIL || 'hello@aurysroses.com';
const SENDER = process.env.SENDER_EMAIL || 'no-reply@aurysroses.com';

const MJ_API_KEY = process.env.MAILJET_API_KEY || '';
const MJ_API_SECRET = process.env.MAILJET_API_SECRET || '';

let mailjetClient = null;

if (MJ_API_KEY && MJ_API_SECRET) {
  mailjetClient = Mailjet.Client.apiConnect(MJ_API_KEY, MJ_API_SECRET);
} else {
  console.warn('Mailjet API keys not set — emails will be simulated.');
}

/* ---------------- AUTH ROUTES ---------------- */

// TEMP fake database (replace later with MongoDB etc.)
const users = [];

/**
 * SIGNUP
 */
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  users.push({ email, password });

  res.json({
    ok: true,
    message: 'Signup successful',
  });
});

/**
 * LOGIN
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    ok: true,
    message: 'Login successful',
  });
});

/* ---------------- CONTACT ROUTE ---------------- */

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

  // ✅ FIXED BUG HERE
  if (!mailjetClient) {
    console.log('Simulated email:', html);
    return res.json({ ok: true, simulated: true });
  }

  try {
    const request = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: { Email: SENDER, Name: 'Aurys Roses' },
            To: [{ Email: RECIPIENT }],
            Subject: `New contact form message from ${name || 'Visitor'}`,
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

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
