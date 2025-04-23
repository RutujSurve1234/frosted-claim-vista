
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

// User roles (should match Supabase enum type if possible)
export type UserRole = "admin" | "hospital" | "agent" | "user";

// User interface aligned with profile table schema
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Removed avatar because it doesn't exist in DB schema
}

// Context interface
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to map Supabase user + profile data to our User interface
const getUserFromSession = async (session: Session | null): Promise<User | null> => {
  if (!session?.user) return null;

  // Fetch profile data without selecting avatar (which doesn't exist)
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role")
    .eq("id", session.user.id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role as UserRole,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST (removing async on callback)
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);

      // Fetch current user asynchronously, but do not make callback async
      if (session) {
        getUserFromSession(session).then(setUser).finally(() => setLoading(false));
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // THEN check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      if (session) {
        getUserFromSession(session).then(setUser).finally(() => setLoading(false));
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setLoading(false);
      throw new Error(error?.message || "Failed to log in");
    }

    // The onAuthStateChange will update user state
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);

    // Sign up user with additional user metadata for name and role
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      setLoading(false);
      throw new Error(error.message);
    }

    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
      throw new Error(error.message);
    }
    setUser(null);
    setSession(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

