"use client";

import Link from 'next/link';
import { 
  COPYRIGHT_NOTICE, 
  PRIVACY_POLICY_LINK, 
  TERMS_OF_SERVICE_LINK,
  CONTACT_EMAIL,
  FCRA_COMPLIANCE,
  CROA_COMPLIANCE
} from '@/lib/compliance';

const footerLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: TERMS_OF_SERVICE_LINK, label: 'Terms of Service' },
  { href: PRIVACY_POLICY_LINK, label: 'Privacy Policy' },
];

const socialLinks = [
  { href: '#', label: 'Facebook', icon: 'facebook' },
  { href: '#', label: 'Twitter', icon: 'twitter' },
  { href: '#', label: 'LinkedIn', icon: 'linkedin' },
  { href: '#', label: 'Instagram', icon: 'instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Link href="/" className="text-xl font-bold text-white">
                CrestPad
              </Link>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered credit repair platform that helps you dispute inaccuracies and improve your credit score legally and efficiently.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-400">{FCRA_COMPLIANCE}</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-400">{CROA_COMPLIANCE}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <p className="text-gray-400 mb-4">
              BlueCrest Financial Consultant LLC
            </p>
            <a 
              href={`mailto:${CONTACT_EMAIL}`} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            
            <div className="mt-6">
              <h3 className="text-white font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={link.label}
                  >
                    <span className="sr-only">{link.label}</span>
                    {/* Simple placeholder for social icons */}
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      {link.icon.charAt(0).toUpperCase()}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            {COPYRIGHT_NOTICE}
          </p>
        </div>
      </div>
    </footer>
  );
} 