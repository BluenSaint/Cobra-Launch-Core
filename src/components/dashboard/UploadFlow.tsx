'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UploadResult {
  success: boolean;
  errorsFound: number;
  file: File | null;
}

interface UploadFlowProps {
  onComplete?: (result: UploadResult) => void;
}

export default function UploadFlow({ onComplete }: UploadFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    errorsFound: number;
    severity: 'low' | 'medium' | 'high';
  } | null>(null);
  
  const creditProviders = [
    'TransUnion',
    'Equifax',
    'Experian',
    'Credit Karma',
    'Annual Credit Report',
    'Other',
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
  };
  
  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleUpload();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleUpload = async () => {
    // Simulating upload and analysis
    setIsUploading(true);
    
    // In a real app, you would upload the file to your server here
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setUploadComplete(true);
    
    // Simulate analysis results
    const result = {
      errorsFound: Math.floor(Math.random() * 10) + 3,
      severity: Math.random() > 0.5 ? 'high' : 'medium',
    } as const;
    
    setAnalysisResult(result);
    
    if (onComplete) {
      onComplete({
        success: true,
        errorsFound: result.errorsFound,
        file: selectedFile,
      });
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Upload Your Credit Report</h3>
      
      {/* Progress indicators */}
      <div className="flex mb-8">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex-1 flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                step === currentStep 
                  ? 'bg-blue-600 text-white' 
                  : step < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
              }`}
            >
              {step < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : step}
            </div>
            {step < 3 && (
              <div className={`flex-1 h-1 mx-2 ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      {/* Step content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-medium mb-4">Select Your Credit Provider</h4>
            <div className="grid grid-cols-2 gap-4">
              {creditProviders.map(provider => (
                <div
                  key={provider}
                  onClick={() => handleProviderSelect(provider)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedProvider === provider
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="font-medium text-white">{provider}</div>
                  {selectedProvider === provider && (
                    <div className="mt-2 text-xs text-blue-400">Selected</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-medium mb-4">Upload Your Credit Report</h4>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                {selectedFile 
                  ? `Selected: ${selectedFile.name}`
                  : 'Drag & drop your credit report PDF or click to browse'}
              </div>
              <input
                type="file"
                id="credit-report"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="credit-report"
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded cursor-pointer"
              >
                Select File
              </label>
              <div className="mt-4 text-xs text-gray-500">
                Accepted formats: PDF, JPG, PNG (max 10MB)
              </div>
            </div>
          </motion.div>
        )}
        
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-medium mb-4">Review & Submit</h4>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Credit Provider:</span>
                <span className="font-medium">{selectedProvider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Selected File:</span>
                <span className="font-medium">{selectedFile?.name || 'None'}</span>
              </div>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-4">
              <h5 className="text-md font-medium mb-3">What Happens Next?</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">1.</span>
                  <span>Our AI will scan your report for inaccuracies and FCRA violations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">2.</span>
                  <span>We'll identify issues that could be negatively impacting your score</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">3.</span>
                  <span>You'll receive a detailed analysis and recommended dispute actions</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
        
        {uploadComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Analysis Complete!</h4>
            <div className="text-gray-300 mb-4">
              We found {analysisResult?.errorsFound} potential issues with your credit report.
            </div>
            <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
              View Detailed Report
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Navigation buttons */}
      {!uploadComplete && (
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={
              (currentStep === 1 && !selectedProvider) ||
              (currentStep === 2 && !selectedFile) ||
              isUploading
            }
            className={`px-4 py-2 rounded ${
              (currentStep === 1 && !selectedProvider) ||
              (currentStep === 2 && !selectedFile) ||
              isUploading
                ? 'bg-blue-600/50 text-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isUploading 
              ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) 
              : currentStep === 3 
                ? 'Upload & Analyze' 
                : 'Continue'
            }
          </button>
        </div>
      )}
    </div>
  );
} 