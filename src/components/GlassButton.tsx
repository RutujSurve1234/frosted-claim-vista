
import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
  isLoading?: boolean;
}

const GlassButton = ({
  children,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  ...props
}: GlassButtonProps) => {
  const baseClass = "glass-button inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-70 disabled:pointer-events-none";
  
  const variantClass = {
    default: "bg-white/20 hover:bg-white/30",
    primary: "bg-insurance-purple/70 hover:bg-insurance-purple/80 text-white",
    secondary: "bg-insurance-pink/70 hover:bg-insurance-pink/80 text-white",
    outline: "bg-transparent border border-white/40 hover:bg-white/10",
    ghost: "bg-transparent hover:bg-white/10",
    destructive: "bg-red-500/70 hover:bg-red-500/80 text-white",
  }[variant];
  
  const sizeClass = {
    sm: "text-sm h-8 px-3 py-1 rounded-md",
    default: "h-10 px-4 py-2 rounded-lg",
    lg: "text-lg h-12 px-6 py-3 rounded-xl",
  }[size];

  return (
    <button
      className={cn(
        baseClass,
        variantClass,
        sizeClass,
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default GlassButton;
