
import React from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-6 left-6 z-10">
        <button
          className="text-2xl font-semibold gradient-text"
          onClick={() => navigate("/")}
        >
          ClaimVista
        </button>
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="glass-card p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2 text-white">{title}</h1>
            {subtitle && <p className="text-white/70">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-insurance-purple/30 rounded-full filter blur-3xl animate-float -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-insurance-pink/30 rounded-full filter blur-3xl animate-float animation-delay-1000 -z-10" />
      <div className="absolute top-2/3 left-1/3 w-60 h-60 bg-insurance-blue/30 rounded-full filter blur-3xl animate-float animation-delay-2000 -z-10" />
    </div>
  );
};

export default AuthLayout;
