
import React from "react";
import GlassCard from "@/components/GlassCard";
import { CheckCircle } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Hear from people who have simplified their insurance claim process
        </p>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-insurance-gradient flex items-center justify-center mr-3">
                S
              </div>
              <div>
                <h4 className="font-semibold">Sarah Johansen</h4>
                <p className="text-sm text-white/70">Patient</p>
              </div>
            </div>
            
            <p className="text-white/80 flex-grow">
              "ClaimVista made my insurance claim process so much easier. I was able to track everything in one place and get updates in real-time."
            </p>
            
            <div className="flex items-center mt-4">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-sm text-white/70">Verified User</span>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-insurance-gradient flex items-center justify-center mr-3">
                M
              </div>
              <div>
                <h4 className="font-semibold">Dr. Mark Thompson</h4>
                <p className="text-sm text-white/70">Hospital Administrator</p>
              </div>
            </div>
            
            <p className="text-white/80 flex-grow">
              "This platform has streamlined our claim verification process. The clear interface and document management saves us hours of work."
            </p>
            
            <div className="flex items-center mt-4">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-sm text-white/70">Verified Hospital</span>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-insurance-gradient flex items-center justify-center mr-3">
                L
              </div>
              <div>
                <h4 className="font-semibold">Lisa Chen</h4>
                <p className="text-sm text-white/70">Insurance Agent</p>
              </div>
            </div>
            
            <p className="text-white/80 flex-grow">
              "ClaimVista has improved our efficiency in processing claims by 40%. The direct hospital verification feature is a game-changer."
            </p>
            
            <div className="flex items-center mt-4">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-sm text-white/70">Verified Agent</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default TestimonialsSection;
