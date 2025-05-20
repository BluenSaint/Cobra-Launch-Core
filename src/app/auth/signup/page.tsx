import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Project Cobra',
  description: 'Create a Project Cobra account to start repairing your credit with our AI-powered tools.',
};

export default function SignupPage() {
  return <AuthForm type="signup" />;
} 