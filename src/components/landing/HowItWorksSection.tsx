
import React from "react";
import GlassCard from "@/components/GlassCard";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 relative">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Our streamlined process makes insurance claims simple and efficient
        </p>
      </div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="relative">
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-1 bg-white/20 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex mb-12">
              <div className="flex-shrink-0 w-16 h-16 md:w-32 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
              </div>
              <div className="flex-grow">
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-3">Submit Your Claim</h3>
                  <p className="text-white/70">
                    Create an account, fill in your claim details, and upload necessary documentation such as medical reports and bills.
                  </p>
                </GlassCard>
              </div>
            </div>
            
            <div className="flex mb-12">
              <div className="flex-shrink-0 w-16 h-16 md:w-32 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
              </div>
              <div className="flex-grow">
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-3">Hospital Verification</h3>
                  <p className="text-white/70">
                    The hospital reviews your claim and medical documentation to verify the treatment and related expenses.
                  </p>
                </GlassCard>
              </div>
            </div>
            
            <div className="flex mb-12">
              <div className="flex-shrink-0 w-16 h-16 md:w-32 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
              </div>
              <div className="flex-grow">
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-3">Insurance Review</h3>
                  <p className="text-white/70">
                    Your insurance agent reviews the claim against your policy coverage and approves eligible expenses.
                  </p>
                </GlassCard>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-16 h-16 md:w-32 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
              </div>
              <div className="flex-grow">
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-3">Claim Resolution</h3>
                  <p className="text-white/70">
                    Once approved by both hospital and insurance, your claim is processed for payment. You can track status throughout.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-insurance-blue/30 rounded-full filter blur-3xl animate-float -z-10"></div>
    </section>
  );
};

export default HowItWorksSection;
