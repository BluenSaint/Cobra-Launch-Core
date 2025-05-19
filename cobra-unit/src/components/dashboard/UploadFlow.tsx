"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface UploadFlowProps {
  onComplete?: (result: any) => void;
}

export function UploadFlow({ onComplete }: UploadFlowProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  const totalSteps = 3;
  
  // Simulate AI scan progress
  React.useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setScanProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            // Simulate scan completion after 100%
            setTimeout(() => {
              if (onComplete) {
                onComplete({
                  success: true,
                  errorsFound: 12,
                  file: file,
                });
              }
            }, 1000);
            return 100;
          }
          return prevProgress + 2;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [step, file, onComplete]);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
  };
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl">Upload Your Credit Report</CardTitle>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className="flex items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index + 1 
                    ? 'bg-primary text-white'
                    : step === index + 1
                    ? 'bg-primary text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step > index + 1 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={`w-12 h-1 ${
                    step > index + 1 ? 'bg-primary' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={step}
          className="min-h-[300px] flex flex-col justify-center"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 ${
                  isDragging ? 'border-primary bg-blue-900/20' : 'border-gray-600'
                } transition-colors duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center space-y-4">
                  <svg
                    className={`mx-auto h-12 w-12 ${isDragging ? 'text-primary' : 'text-gray-400'}`}
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
                  
                  <div className="text-lg font-medium text-white">
                    {file ? file.name : 'Drag and drop your credit report, or click to browse'}
                  </div>
                  
                  {!file && (
                    <div>
                      <p className="text-gray-400">Accepted file formats: PDF, JPG, PNG</p>
                      <label 
                        htmlFor="file-upload" 
                        className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-blue-700"
                      >
                        Browse Files
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  )}

                  {file && (
                    <div className="mt-2 flex justify-center space-x-4">
                      <Badge variant="success" className="text-xs">
                        File Selected
                      </Badge>
                      <button 
                        onClick={() => setFile(null)} 
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center text-gray-400 text-sm">
                <p>Your file is securely encrypted during upload.</p>
                <p>We support all three major credit bureau reports.</p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white text-center mb-4">
                Connect directly to a credit bureau
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Experian', 'TransUnion', 'Equifax'].map((provider) => (
                  <div 
                    key={provider}
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-colors hover:bg-gray-800 ${
                      selectedProvider === provider ? 'border-primary' : 'border-gray-600'
                    }`}
                    onClick={() => handleProviderSelect(provider)}
                  >
                    <div className="h-12 w-12 mx-auto bg-gray-700 rounded-full mb-3" />
                    <div className="font-medium text-white">{provider}</div>
                    {selectedProvider === provider && (
                      <Badge variant="primary" className="mt-2">Selected</Badge>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center text-gray-400 text-sm mt-4">
                <p>We use secure OAuth connections. Your credentials are never stored.</p>
                <p>Note: You must have an existing account with the bureau.</p>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white text-center mb-4">
                AI Analysis in Progress
              </h3>
              
              <div className="space-y-4">
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    className="bg-primary h-4 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="text-center text-white font-medium">
                  {scanProgress < 100 ? `${scanProgress}% Complete` : "Scan Complete!"}
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Detecting accounts...</span>
                      <span className="text-green-400">Done</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Analyzing payment history...</span>
                      <span className="text-green-400">Done</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Checking for inaccuracies...</span>
                      <span>{scanProgress >= 70 ? (
                        <span className="text-green-400">Done</span>
                      ) : (
                        <span className="text-yellow-400">In Progress</span>
                      )}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Generating recommendations...</span>
                      <span>{scanProgress >= 90 ? (
                        <span className="text-green-400">Done</span>
                      ) : scanProgress >= 70 ? (
                        <span className="text-yellow-400">In Progress</span>
                      ) : (
                        <span className="text-gray-500">Pending</span>
                      )}</span>
                    </p>
                  </div>
                </div>
                
                {scanProgress === 100 && (
                  <div className="text-center text-green-400 font-medium animate-pulse">
                    Scan completed successfully! Preparing your results...
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={
            (step === 1 && !file) || 
            (step === 2 && !selectedProvider) || 
            step === totalSteps
          }
        >
          {step < totalSteps ? "Continue" : "Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
} 