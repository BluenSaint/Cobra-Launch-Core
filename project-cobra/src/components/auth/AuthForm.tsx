'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type AuthFormType = 'login' | 'signup';

interface AuthFormProps {
  type: AuthFormType;
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // This is just a placeholder - would connect to NextAuth.js in a real implementation
      if (type === 'signup') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (!formData.agreeToTerms) {
          throw new Error('You must agree to the Terms of Service');
        }
        
        // Sign up logic would go here
        console.log('Signing up with:', { ...formData, plan });
        
        // Redirect to dashboard after successful signup
        router.push('/dashboard');
      } else {
        // Login logic would go here
        console.log('Logging in with:', formData);
        
        // Redirect to dashboard after successful login
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              {type === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-gray-400">
              {type === 'login' 
                ? 'Sign in to access your dashboard' 
                : 'Start your credit repair journey today'}
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {type === 'signup' && (
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm font-medium" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {type === 'signup' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 text-sm font-medium" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-400">
                      I agree to the <Link href="/legal/terms" className="text-blue-400 hover:underline">Terms of Service</Link> and <Link href="/legal/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                </div>
              </>
            )}
            
            {type === 'login' && (
              <div className="mb-6 text-right">
                <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50"
            >
              {isLoading 
                ? 'Loading...' 
                : type === 'login' 
                  ? 'Sign In' 
                  : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">
              {type === 'login'
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link 
                href={type === 'login' ? '/auth/signup' : '/auth/login'} 
                className="text-blue-400 hover:underline"
              >
                {type === 'login' ? 'Sign Up' : 'Sign In'}
              </Link>
            </span>
          </div>
          
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px bg-gray-700 w-full"></div>
            <div className="px-4 text-sm text-gray-500">OR</div>
            <div className="h-px bg-gray-700 w-full"></div>
          </div>
          
          <div className="mt-6">
            <button className="w-full p-3 bg-gray-700 border border-gray-600 flex justify-center items-center rounded-md hover:bg-gray-600 transition-colors">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 