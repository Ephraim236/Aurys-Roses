import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

@Injectable()
export class AuthService {
  private users: Map<string, User> = new Map();
  private emailIndex: Set<string> = new Set();

  /**
   * Hash password using SHA-256
   */
  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  /**
   * Register a new user
   */
  signup(email: string, password: string): { success: boolean; message: string; user?: { id: string; email: string } } {
    // Check if email already exists
    if (this.emailIndex.has(email.toLowerCase())) {
      return {
        success: false,
        message: 'Email already registered. Please login or use a different email.',
      };
    }

    // Validate inputs
    if (!email || !password) {
      return {
        success: false,
        message: 'Email and password are required.',
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long.',
      };
    }

    // Create new user
    const userId = crypto.randomUUID();
    const passwordHash = this.hashPassword(password);
    const user: User = {
      id: userId,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date(),
    };

    this.users.set(userId, user);
    this.emailIndex.add(email.toLowerCase());

    return {
      success: true,
      message: 'Signup successful! You can now login.',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  /**
   * Login user
   */
  login(email: string, password: string): { success: boolean; message: string; user?: { id: string; email: string } } {
    if (!email || !password) {
      return {
        success: false,
        message: 'Email and password are required.',
      };
    }

    const normalizedEmail = email.toLowerCase();
    let foundUser: User | null = null;

    // Find user by email
    for (const user of this.users.values()) {
      if (user.email === normalizedEmail) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return {
        success: false,
        message: 'Email or password is incorrect.',
      };
    }

    // Verify password
    const passwordHash = this.hashPassword(password);
    if (foundUser.passwordHash !== passwordHash) {
      return {
        success: false,
        message: 'Email or password is incorrect.',
      };
    }

    return {
      success: true,
      message: 'Login successful!',
      user: {
        id: foundUser.id,
        email: foundUser.email,
      },
    };
  }
}
