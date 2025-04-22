
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const GlassCard = ({
  children,
  className,
  hoverEffect = false,
  glowEffect = false,
  ...props
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hoverEffect && "hover:bg-white/20 hover:scale-[1.02]",
        glowEffect && "relative after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:bg-gradient-to-r after:from-insurance-purple/50 after:to-insurance-pink/50 after:blur-xl after:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
