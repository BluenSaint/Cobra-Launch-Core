'use client';

import React from 'react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Real results from real people who used Project Cobra to improve their credit.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 space-x-6">
            {/* Testimonial 1 */}
            <div className="testimonial-card bg-gray-800 p-6 rounded-xl flex-shrink-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold mr-4">JD</div>
                <div>
                  <h4 className="font-medium">James D.</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "I went from a 580 to 720 in just 4 months with Project Cobra. The AI found errors I never would have noticed. Worth every penny!"
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Houston, TX</span>
                <span>2 months ago</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="testimonial-card bg-gray-800 p-6 rounded-xl flex-shrink-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold mr-4">SM</div>
                <div>
                  <h4 className="font-medium">Sarah M.</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The CFPB escalation feature got 3 collections removed that had been haunting me for years. I finally qualified for a mortgage!"
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Chicago, IL</span>
                <span>1 month ago</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="testimonial-card bg-gray-800 p-6 rounded-xl flex-shrink-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold mr-4">RK</div>
                <div>
                  <h4 className="font-medium">Robert K.</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "As a financial advisor, I was embarrassed by my own credit mistakes. Project Cobra helped me clean up 7 incorrect items and raise my score 85 points!"
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Atlanta, GA</span>
                <span>3 months ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 