import type React from "react"
import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-2 w-full text-center border-2 transition focus:outline-none bg-white font-barrio ${
        props["aria-invalid"]
          ? "border-red-500 text-red-500 shadow-[2px_2px_0px_0px_#dc2626]"
          : "shadow-[4px_4px_0px_0px_#000000] focus:shadow-[0px_0px_0px_0px_#000000]"
      } ${className}`}
      {...props}
    />
  )
}
