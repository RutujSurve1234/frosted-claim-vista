
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

// User roles (should match Supabase enum type if possible)
export type UserRole = "admin" | "hospital" | "agent" | "user";

// User interface aligned with profile table schema
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
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

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, avatar")
    .eq("id", session.user.id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role as UserRole,
    avatar: data.avatar || undefined,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session ?? null);
      const currentUser = await getUserFromSession(session);
      setUser(currentUser);
      setLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session ?? null);
      const currentUser = await getUserFromSession(session);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
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
    const { data, error } = await supabase.auth.signUp({
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

    // On successful sign up, user will get confirmation email (can be disabled in Supabase)
    // User is not immediately logged in until confirmed, so we don't set user here

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
