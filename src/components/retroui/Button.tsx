import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "font-barrio transition-all outline-hidden cursor-pointer duration-200 font-medium flex items-center",
  {
    variants: {
      variant: {
        default:
          "shadow-[4px_4px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000] bg-[#ffd900] text-black border-2 border-black transition hover:translate-y-1 hover:bg-[#ffbf00]",
        secondary:
          "shadow-[4px_4px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000] bg-secondary shadow-primary text-secondary-foreground border-2 border-black transition hover:translate-y-1",
        outline:
          "shadow-[4px_4px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000] bg-transparent border-2 transition hover:translate-y-1",
        link: "bg-transparent hover:underline",
      },
      size: {
        sm: "px-3 py-1 text-sm shadow-[4px_4px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000]",
        md: "px-4 py-1.5 text-base",
        lg: "px-8 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => (
    <button
      ref={forwardedRef}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
