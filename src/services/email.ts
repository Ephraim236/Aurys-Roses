import axios from 'axios';

const API_BASE_URL = 'aurys-roses-production.up.railway.app/api'; // Update with your actual backend URL
export const emailApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface OrderConfirmationPayload {
  customerEmail: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  deliveryDate: string;
  notes?: string;
}

export interface WelcomeEmailPayload {
  customerEmail: string;
  customerName: string;
  activationLink?: string;
  referralCode?: string;
}

export interface PasswordResetPayload {
  email: string;
  resetLink: string;
  expiryMinutes?: number;
  userFirstName?: string;
}

export interface NewsletterPayload {
  subscriberEmail: string;
  subscriberName?: string;
  contentSections: Array<{
    title: string;
    description: string;
  }>;
  campaignId?: string;
  includeAnalyticsPixel?: boolean;
}

export const emailApiService = {
  sendOrderConfirmation: (payload: OrderConfirmationPayload) =>
    emailApi.post('/email/send/order-confirmation', payload),

  sendWelcomeEmail: (payload: WelcomeEmailPayload) =>
    emailApi.post('/email/send/welcome', payload),

  sendPasswordResetEmail: (payload: PasswordResetPayload) =>
    emailApi.post('/email/send/password-reset', payload),

  sendNewsletterEmail: (payload: NewsletterPayload) =>
    emailApi.post('/email/send/newsletter', payload),

  sendAdminNotification: (payload: any) =>
    emailApi.post('/email/send/admin-notification', payload),
};