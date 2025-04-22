
import React, { createContext, useState, useContext, useEffect } from "react";

// User roles
export type UserRole = "admin" | "hospital" | "agent" | "user";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/lovable-uploads/d1e4c840-0f5b-41ae-befe-802ead66b3cd.png",
  },
  {
    id: "2",
    name: "Hospital Staff",
    email: "hospital@example.com",
    role: "hospital",
  },
  {
    id: "3",
    name: "Insurance Agent",
    email: "agent@example.com",
    role: "agent",
  },
  {
    id: "4",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is stored in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function - simulates API call
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === "password") { // Simple mock password check
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function - simulates API call
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("User already exists");
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        role,
      };
      
      // In a real app, this would be done on the server
      mockUsers.push(newUser);
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
