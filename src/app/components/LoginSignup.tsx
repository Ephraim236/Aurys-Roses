import { useState, FormEvent } from 'react';
import { Mail, Lock, X } from 'lucide-react';

interface LoginSignupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { id: string; email: string }) => void;
}

export function LoginSignup({ isOpen, onClose, onLoginSuccess }: LoginSignupProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setSuccess(null);
  };

  const handleToggle = () => {
    resetForm();
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const res = await fetch(`https://aurys-roses-production.up.railway.app${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        if (data.user) {
          onLoginSuccess(data.user);
          resetForm();
          setTimeout(() => {
            setIsSignup(false);
            onClose();
          }, 1000);
        }
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 animate-pop-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-rose-200 transition-colors"
        >
          <X size={28} />
        </button>

        {/* Main card */}
        <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-8 shadow-2xl">
          {/* Header with animation */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="font-serif text-3xl text-rose-900 mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-rose-700/70 text-sm">
              {isSignup
                ? 'Join Aurys Roses today'
                : 'Login to your account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <label className="block text-rose-900 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-rose-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200/50 text-rose-900 placeholder-rose-700/40 transition-all"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className="block text-rose-900 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-rose-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200/50 text-rose-900 placeholder-rose-700/40 transition-all"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="animate-pop-in bg-red-50/80 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="animate-pop-in bg-green-50/80 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {isSignup ? 'Signing up...' : 'Logging in...'}
                </span>
              ) : isSignup ? (
                'Sign Up'
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Toggle button */}
          <div className="text-center mt-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <p className="text-rose-700/70 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={handleToggle}
                className="ml-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
