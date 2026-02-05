import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { useEmailNotification } from '../../hooks/emailnotification';
import { WelcomeEmailPayload } from '../../services/email';
import { Card } from './ui/card';

export const NewsletterSignup = () => {
  const { loading, sendWelcomeEmail } = useEmailNotification();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !name) {
      alert('Please enter your email and name');
      return;
    }

    const payload: WelcomeEmailPayload = {
      customerEmail: email,
      customerName: name,
    };

    const success = await sendWelcomeEmail(payload);
    if (success) {
      setEmail('');
      setName('');
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
      <div className="flex items-start gap-4">
        <Mail className="text-rose-600 mt-1" size={24} />
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-rose-900 mb-2">Join Our Newsletter</h3>
          <p className="text-rose-800/80 mb-6">Get updates on new flowers and special offers</p>

          <div className="space-y-3">
            <div>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                disabled={loading || subscribed}
                className="border-rose-200 focus:ring-rose-500 bg-white/50"
              />
            </div>
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={loading || subscribed}
                className="border-rose-200 focus:ring-rose-500 bg-white/50"
              />
            </div>
            {subscribed && (
              <div className="flex items-center gap-2 text-green-600 p-2 bg-green-50 rounded">
                <CheckCircle size={18} />
                <span className="text-sm">Welcome email sent! Check your inbox.</span>
              </div>
            )}
            <Button
              onClick={handleSubscribe}
              disabled={loading || subscribed}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : subscribed ? (
                '✓ Welcome Email Sent!'
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};