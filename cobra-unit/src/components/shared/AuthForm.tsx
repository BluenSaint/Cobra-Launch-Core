"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit?: (data: any) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    agreeToTerms: false,
    profilePhoto: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (type === "signup") {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      console.log("Form data:", formData);
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "login" ? "Welcome back" : "Create an account"}</CardTitle>
        <CardDescription>
          {type === "login" 
            ? "Sign in to your account to continue" 
            : "Get started with your credit repair journey"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              aria-label="Full name"
              autoComplete="name"
            />
          )}
          
          <Input
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            aria-label="Email address"
            autoComplete={type === "login" ? "email" : "new-email"}
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            aria-label="Password"
            autoComplete={type === "login" ? "current-password" : "new-password"}
            helperText={type === "signup" ? "Must be at least 8 characters with 1 uppercase, 1 number, and 1 special character" : undefined}
          />
          
          {type === "signup" && (
            <>
              <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
                aria-label="Confirm password"
                autoComplete="new-password"
              />
              
              <div className="space-y-2">
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-300">
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
                        htmlFor="profilePhoto"
                        className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-primary hover:text-blue-400"
                      >
                        <span className="px-2 py-1 rounded">Upload a file</span>
                        <input 
                          id="profilePhoto" 
                          name="profilePhoto" 
                          type="file" 
                          className="sr-only" 
                          onChange={handleChange}
                          accept="image/*"
                        />
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
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                    aria-label="Accept terms and conditions"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label htmlFor="agreeToTerms" className={`text-gray-300 ${errors.agreeToTerms ? "text-red-500" : ""}`}>
                    I agree to the <Link href="/legal/terms-of-service" className="text-primary hover:text-blue-400">Terms of Service</Link> and <Link href="/legal/privacy-policy" className="text-primary hover:text-blue-400">Privacy Policy</Link>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {type === "login" && (
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-primary hover:text-blue-400">
                Forgot password?
              </Link>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full"
          >
            {type === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-400">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:text-blue-400 font-medium">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-blue-400 font-medium">
                Sign in
              </Link>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
} 