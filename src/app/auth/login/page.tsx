import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In - Project Cobra',
  description: 'Log in to your Project Cobra account to access your credit repair dashboard.',
};

export default function LoginPage() {
  return <AuthForm type="login" />;
} 