"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = "text", ...props }, ref) => {
    const uniqueId = React.useId();
    const id = props.id || props.name || uniqueId;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            id={id}
            className={cn(
              "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            aria-invalid={error ? true : false}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p 
            id={`${id}-error`} 
            className="mt-1 text-xs text-red-500"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={`${id}-helper`} 
            className="mt-1 text-xs text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input }; 