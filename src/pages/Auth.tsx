
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";
import GlassInput from "@/components/GlassInput";
import GlassSelect from "@/components/GlassSelect";
import GlassButton from "@/components/GlassButton";

type AuthMode = "login" | "register";

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, loading } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");

  // Errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  // Redirect logged-in users to dashboard
  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  // Validate form fields
  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (mode === "register") {
      if (!name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email address";
      }
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else {
      // login mode
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email address";
      }
      if (!password) {
        newErrors.password = "Password is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === "login") {
        await login(email, password);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      } else {
        await register(name, email, password, role);
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      setErrors({ general: errorMessage });
      toast({
        title: "Authentication failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout
      title={mode === "login" ? "Welcome Back" : "Create Account"}
      subtitle={mode === "login" ? "Log in to your account to continue" : "Sign up to get started with ClaimVista"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-white text-sm">
            {errors.general}
          </div>
        )}

        {mode === "register" && (
          <>
            <GlassInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              disabled={loading}
            />

            <GlassSelect
              label="Account Type"
              options={[
                { value: "user", label: "User" },
                { value: "hospital", label: "Hospital" },
                { value: "agent", label: "Insurance Agent" },
                { value: "admin", label: "Administrator" },
              ]}
              value={role}
              onChange={(value) => setRole(value as UserRole)}
              disabled={loading}
            />
          </>
        )}

        <GlassInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={loading}
        />

        <GlassInput
          label="Password"
          type="password"
          placeholder={mode === "login" ? "Enter your password" : "Create a password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={loading}
        />

        {mode === "register" && (
          <GlassInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={loading}
          />
        )}

        <div className="pt-2">
          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
            disabled={loading}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </GlassButton>
        </div>

        <div className="text-center text-white/70 text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-insurance-pink hover:text-white transition-colors underline"
                onClick={() => {
                  setErrors({});
                  setMode("register");
                }}
                disabled={loading}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-insurance-pink hover:text-white transition-colors underline"
                onClick={() => {
                  setErrors({});
                  setMode("login");
                }}
                disabled={loading}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Auth;

