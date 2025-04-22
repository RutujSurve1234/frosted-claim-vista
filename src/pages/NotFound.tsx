
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-6 left-6 z-10">
        <Link to="/" className="text-2xl font-semibold gradient-text">
          ClaimVista
        </Link>
      </div>
      
      <GlassCard className="max-w-md text-center p-8">
        <div className="mx-auto bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-white/80 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <GlassButton variant="primary">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </GlassButton>
        </Link>
      </GlassCard>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-insurance-purple/30 rounded-full filter blur-3xl animate-float -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-insurance-pink/30 rounded-full filter blur-3xl animate-float animation-delay-1000 -z-10" />
    </div>
  );
};

export default NotFound;
