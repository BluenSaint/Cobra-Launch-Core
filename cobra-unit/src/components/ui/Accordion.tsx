"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

export function Accordion({
  items,
  className,
  type = "single",
  defaultValue = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    type === "single"
      ? defaultValue && typeof defaultValue === "string"
        ? [defaultValue]
        : []
      : Array.isArray(defaultValue)
      ? defaultValue
      : []
  );

  const toggleItem = (itemId: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(itemId) ? [] : [itemId]);
    } else {
      setOpenItems(
        openItems.includes(itemId)
          ? openItems.filter((id) => id !== itemId)
          : [...openItems, itemId]
      );
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div
            key={item.id}
            className="border border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className={cn(
                "flex justify-between items-center w-full p-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors",
                isOpen && "bg-gray-700"
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="text-white font-medium">{item.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 bg-gray-800 border-t border-gray-700 text-gray-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
} 