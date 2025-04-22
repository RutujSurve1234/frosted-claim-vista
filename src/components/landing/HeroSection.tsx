
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GlassButton from "@/components/GlassButton";
import GlassCard from "@/components/GlassCard";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const {
    isAuthenticated
  } = useAuth();
  
  return <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
          Insurance Claims Made Simple
        </h1>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Streamline your insurance claims with our secure, transparent platform. Connect with hospitals and insurance agents for faster approvals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <GlassButton variant="primary" size="lg">
              {isAuthenticated ? "Go to Dashboard" : "Get Started"} 
              <ArrowRight className="ml-2 h-5 w-5" />
            </GlassButton>
          </Link>
          <a href="#how-it-works">
            <GlassButton variant="outline" size="lg">
              Learn How It Works
            </GlassButton>
          </a>
        </div>
        <div className="mt-16 relative">
          <GlassCard className="p-0 overflow-hidden">
            {/* Add some content here to satisfy the children prop requirement */}
            <div className="p-6">
              <img 
                src="/placeholder.svg" 
                alt="Insurance claim dashboard preview" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </GlassCard>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-insurance-purple/30 rounded-full filter blur-3xl animate-float -z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-insurance-pink/30 rounded-full filter blur-3xl animate-float animation-delay-1000 -z-10"></div>
    </section>;
};

export default HeroSection;
