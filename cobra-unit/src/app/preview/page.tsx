import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Design Preview | CrestPad',
  description: 'A preview of the CrestPad design components',
};

export default function PreviewPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-white mb-4">Design Preview</h1>
          <p className="text-gray-300">
            This page showcases the key components of the CrestPad UI.
          </p>
        </div>
        
        <div className="mb-16">
          <div className="bg-gray-800 rounded-lg p-4 mb-2">
            <h2 className="text-lg font-medium text-white">Navbar Component</h2>
          </div>
          {/* Navbar is already at the top */}
        </div>
        
        <div className="mb-16">
          <div className="bg-gray-800 rounded-lg p-4 mb-2">
            <h2 className="text-lg font-medium text-white">Hero Component</h2>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Hero />
          </div>
        </div>
        
        <div className="mb-16">
          <div className="bg-gray-800 rounded-lg p-4 mb-2">
            <h2 className="text-lg font-medium text-white">CTA Component</h2>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <CTA />
          </div>
        </div>
        
        <div className="mb-16">
          <div className="bg-gray-800 rounded-lg p-4 mb-2">
            <h2 className="text-lg font-medium text-white">Footer Component</h2>
          </div>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
} 