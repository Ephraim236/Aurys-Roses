import { useState } from 'react';
import { toast } from 'sonner';
import { emailApiService, OrderConfirmationPayload, WelcomeEmailPayload, PasswordResetPayload } from '../services/email';

interface UseEmailNotificationReturn {
  loading: boolean;
  error: string | null;
  sendOrderConfirmation: (payload: OrderConfirmationPayload) => Promise<boolean>;
  sendWelcomeEmail: (payload: WelcomeEmailPayload) => Promise<boolean>;
  sendPasswordResetEmail: (payload: PasswordResetPayload) => Promise<boolean>;
}

export const useEmailNotification = (): UseEmailNotificationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOrderConfirmation = async (payload: OrderConfirmationPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await emailApiService.sendOrderConfirmation(payload);
      toast.success('Order confirmation sent to ' + payload.customerEmail);
      return true;
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Failed to send confirmation email';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Order confirmation error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendWelcomeEmail = async (payload: WelcomeEmailPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await emailApiService.sendWelcomeEmail(payload);
      toast.success('Welcome email sent to ' + payload.customerEmail);
      return true;
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Failed to send welcome email';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Welcome email error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetEmail = async (payload: PasswordResetPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await emailApiService.sendPasswordResetEmail(payload);
      toast.success('Password reset email sent!');
      return true;
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Failed to send password reset email';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Password reset error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendOrderConfirmation,
    sendWelcomeEmail,
    sendPasswordResetEmail,
  };
};