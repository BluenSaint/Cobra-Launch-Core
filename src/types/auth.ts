export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  plan?: 'shield' | 'elite' | 'infinity' | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  error: string | null;
} 