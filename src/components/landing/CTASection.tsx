
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";

const CTASection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 md:py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <GlassCard className="p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify your insurance claims?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have streamlined their insurance claim process with ClaimVista
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <GlassButton variant="primary" size="lg">
                {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
              </GlassButton>
            </Link>
          </div>
          
          {/* Background gradient for the CTA */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-insurance-purple/40 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-insurance-pink/40 rounded-full filter blur-3xl"></div>
        </GlassCard>
      </div>
    </section>
  );
};

export default CTASection;
