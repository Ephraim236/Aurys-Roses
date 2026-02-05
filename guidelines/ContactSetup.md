Contact form server setup

Overview
- A small express server is added at the repository root (`server.js`). It exposes a POST `/api/contact` endpoint that accepts name/email/phone/message and forwards the message to an email address using Mailjet.

Environment variables
- Copy `.env.example` to `.env` and fill the values:
  - MAILJET_API_KEY — your Mailjet API key
  - MAILJET_API_SECRET — your Mailjet API secret
  - RECIPIENT_EMAIL — where contact messages will be sent (defaults to `hello@aurysroses.com`)
  - SENDER_EMAIL — from address to appear in the email (defaults to `no-reply@aurysroses.com`)
  - PORT — server port (defaults to `4000`)

Install and run
1. Install server deps:
   npm install express cors node-mailjet dotenv

2. Run the server:
   npm run start:server

Local dev behavior
- The frontend posts to `http://localhost:4000/api/contact` (configured in `App.tsx`). If Mailjet is not configured, the server will log the message and return a simulated successful response for local testing.

Notes
- Make sure your Mailjet account can send from `SENDER_EMAIL`.
- For production, consider using a dedicated transactional email service or deploy the endpoint as a serverless function, and add rate limiting / reCAPTCHA to prevent abuse.

