
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import GlassButton from "./GlassButton";
import {
  ChevronRight,
  User,
  Building,
  FileText,
  UserCheck,
  Home,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const navItems = getNavItemsByRole(user.role);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className="text-xl font-semibold gradient-text cursor-pointer"
              onClick={() => navigate("/")}
            >
              ClaimVista
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-white/80">
              Welcome, {user.name}
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center text-white border-2 border-white/30">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
            </div>
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </GlassButton>
          </div>
          
          <button
            className="md:hidden glass-button p-2 rounded-md"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-b border-white/20 animate-fade-in">
          <div className="container mx-auto py-4 px-2">
            <div className="flex items-center space-x-4 px-4 py-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-insurance-gradient flex items-center justify-center text-white border-2 border-white/30">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div>
                <div className="text-white/80 font-medium">{user.name}</div>
                <div className="text-white/60 text-sm">{user.email}</div>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left text-red-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 glass border-r border-white/20">
          <div className="p-4 h-full">
            <div className="flex flex-col h-full">
              <nav className="space-y-1 flex-1 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="pt-4 border-t border-white/10">
                <button
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Content */}
        <main className="flex-1 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function getNavItemsByRole(role: UserRole) {
  const items = [
    { label: "Dashboard", path: "/dashboard", icon: Home },
  ];

  switch (role) {
    case "admin":
      return [
        ...items,
        { label: "Users", path: "/users", icon: User },
        { label: "Hospitals", path: "/hospitals", icon: Building },
        { label: "Agents", path: "/agents", icon: UserCheck },
        { label: "Claims", path: "/claims", icon: FileText },
      ];
    case "hospital":
      return [
        ...items,
        { label: "Claims", path: "/claims", icon: FileText },
      ];
    case "agent":
      return [
        ...items,
        { label: "Claims", path: "/claims", icon: FileText },
      ];
    case "user":
      return [
        ...items,
        { label: "My Claims", path: "/claims", icon: FileText },
        { label: "New Claim", path: "/claims/new", icon: FileText },
        { label: "Profile", path: "/profile", icon: User },
      ];
    default:
      return items;
  }
}

export default DashboardLayout;
