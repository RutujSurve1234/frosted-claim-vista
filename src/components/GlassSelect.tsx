
import React from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface GlassSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  error?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const GlassSelect = React.forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ label, options, error, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "glass-input w-full transition-all focus:outline-none focus:ring-2 focus:ring-insurance-purple/50 appearance-none",
            "bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')] bg-no-repeat bg-right-1 pr-10",
            error && "border-red-500/70 focus:ring-red-500/50",
            className
          )}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    );
  }
);

GlassSelect.displayName = "GlassSelect";

export default GlassSelect;
