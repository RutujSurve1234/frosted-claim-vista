
import React from "react";
import { cn } from "@/lib/utils";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "glass-input w-full transition-all focus:outline-none focus:ring-2 focus:ring-insurance-purple/50",
            error && "border-red-500/70 focus:ring-red-500/50",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

export default GlassInput;
