
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GlassButton from "@/components/GlassButton";

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold gradient-text">ClaimVista</div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
          <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonials</a>
        </nav>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <GlassButton variant="primary">
                Dashboard
              </GlassButton>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-white/80 hover:text-white transition-colors">
                Log in
              </Link>
              <Link to="/register">
                <GlassButton variant="primary">
                  Sign up
                </GlassButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
