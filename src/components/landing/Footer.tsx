
import React from "react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
