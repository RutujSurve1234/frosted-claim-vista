import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GlassButton from "@/components/GlassButton";
import GlassCard from "@/components/GlassCard";
import { Shield, CheckCircle, ArrowRight, FileText, Building, User } from "lucide-react";

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
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
              <img 
                src="/lovable-uploads/d1e4c840-0f5b-41ae-befe-802ead66b3cd.png" 
                alt="ClaimVista Dashboard Preview" 
                className="w-full rounded-xl shadow-2xl"
              />
            </GlassCard>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-insurance-purple/30 rounded-full filter blur-3xl animate-float -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-insurance-pink/30 rounded-full filter blur-3xl animate-float animation-delay-1000 -z-10"></div>
      </section>

      {/* Features Section */}
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

      {/* How It Works Section */}
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

      {/* Testimonials Section */}
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="glass border-t border-white/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-semibold gradient-text mb-4">ClaimVista</div>
              <p className="text-white/70">
                Simplifying insurance claims with modern technology and transparent processes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="text-white/70 hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-white/70">support@claimvista.com</li>
                <li className="text-white/70">1-800-CLAIMS</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>© 2025 ClaimVista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
