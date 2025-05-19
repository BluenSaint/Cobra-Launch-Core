import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LEGAL_DISCLAIMER } from '@/lib/compliance';

export const metadata: Metadata = {
  title: 'Sign Up | CrestPad',
  description: 'Create your CrestPad account',
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-900 min-h-[calc(100vh-64px)]">
        <div className="max-w-md mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Create an account</h1>
              <p className="text-gray-400 mt-2">Get started with your credit repair journey</p>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Password"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Must be at least 8 characters with 1 uppercase, 1 number, and 1 special character
                </p>
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Confirm password"
                />
              </div>
              
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-300 mb-1">
                  Profile photo (optional)
                </label>
                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-primary hover:text-blue-400 focus-within:outline-none"
                      >
                        <span className="px-2 py-1 rounded">Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                    aria-label="Accept terms and conditions"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the <Link href="/terms" className="text-primary hover:text-blue-400">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:text-blue-400">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                  aria-label="Create account"
                >
                  Create account
                </button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-gray-700 rounded-md">
              <p className="text-xs text-gray-400 whitespace-pre-line">
                {LEGAL_DISCLAIMER}
              </p>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-blue-400 font-medium">
                  Sign in
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