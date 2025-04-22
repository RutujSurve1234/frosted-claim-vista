
import React from "react";
import { cn } from "@/lib/utils";

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const GlassTextarea = React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "glass-input w-full min-h-24 transition-all focus:outline-none focus:ring-2 focus:ring-insurance-purple/50",
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

GlassTextarea.displayName = "GlassTextarea";

export default GlassTextarea;
