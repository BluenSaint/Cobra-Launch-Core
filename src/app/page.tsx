import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import TrustBar from '@/components/layout/TrustBar';
import CreditScore from '@/components/layout/CreditScore';
import HowItWorks from '@/components/layout/HowItWorks';
import Features from '@/components/layout/Features';
import Testimonials from '@/components/layout/Testimonials';
import Pricing from '@/components/layout/Pricing';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen antialiased">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <CreditScore />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
} 