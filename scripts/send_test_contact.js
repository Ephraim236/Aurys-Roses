// Simple test script to POST a contact message (no web3 required)
const payload = {
  name: 'E2E Test',
  email: 'test@example.com',
  phone: '+100000000',
  message: 'This is a test message sent to Mailjet endpoint',
};

(async () => {
  const res = await fetch('http://localhost:4000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log('status', res.status, 'response', data);
})();