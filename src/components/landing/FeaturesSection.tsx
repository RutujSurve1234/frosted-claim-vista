
import React from "react";
import GlassCard from "@/components/GlassCard";
import { Shield, FileText, Building } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 px-4">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Features</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Our platform offers everything you need to manage insurance claims efficiently
        </p>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard hoverEffect glowEffect>
          <div className="bg-insurance-gradient w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
          <p className="text-white/70">
            Your medical and insurance data is encrypted and protected with industry-leading security standards.
          </p>
        </GlassCard>
        
        <GlassCard hoverEffect glowEffect>
          <div className="bg-insurance-gradient w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Easy Claim Submission</h3>
          <p className="text-white/70">
            Submit claims with a few clicks, upload documents, and track status in real-time.
          </p>
        </GlassCard>
        
        <GlassCard hoverEffect glowEffect>
          <div className="bg-insurance-gradient w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Hospital Integration</h3>
          <p className="text-white/70">
            Direct connection with hospitals streamlines verification and speeds up the approval process.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default FeaturesSection;
