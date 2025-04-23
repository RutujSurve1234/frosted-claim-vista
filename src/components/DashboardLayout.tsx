import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import GlassButton from "@/components/GlassButton";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Claims", to: "/claims" },
    // Add more navigation items as needed
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (!user) {
    // Ideally redirect or render nothing if no user - for safety
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-insurance-background to-insurance-purple">
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold gradient-text">ClaimVista</div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-white/80">Welcome, {user.name}</div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center text-white border-2 border-white/30">
                {user.name.charAt(0)}
              </div>
            </div>
            <GlassButton variant="ghost" onClick={() => {
              logout().then(() => navigate("/login"));
            }}>
              Log Out
            </GlassButton>
          </div>

          <button
            className="md:hidden glass-button p-2 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {/* icon */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-b border-white/20 animate-fade-in">
          <div className="container mx-auto py-4 px-2">
            <div className="flex items-center space-x-4 px-4 py-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center text-white border-2 border-white/30">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="text-white/80 font-medium">{user.name}</div>
                <div className="text-white/60 text-sm">{user.email}</div>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.to}
                  className="text-white/70 hover:text-white text-left px-4 py-2 rounded-md"
                  onClick={() => {
                    navigate(item.to);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 p-4 border-r border-white/10">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white/70 hover:text-white px-3 py-2 rounded-md block"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
