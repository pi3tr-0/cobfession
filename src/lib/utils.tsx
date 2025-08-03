import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to create bobbing text animation
export function createBobbingText(text: string) {
  return text.split('').map((char, index) => (
    <span
      key={index}
      className="inline-block animate-[float_2s_linear_infinite]"
      style={{
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}
