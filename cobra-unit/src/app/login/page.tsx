import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Login | CrestPad',
  description: 'Login to your CrestPad account',
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-900 min-h-[calc(100vh-64px)]">
        <div className="max-w-md mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome back</h1>
              <p className="text-gray-400 mt-2">Sign in to your account</p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Email address"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:text-blue-400">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Password"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                  aria-label="Remember me"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                  aria-label="Sign in"
                >
                  Sign in
                </button>
              </div>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary hover:text-blue-400 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 