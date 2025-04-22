
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";
import GlassInput from "@/components/GlassInput";
import GlassButton from "@/components/GlassButton";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general: "Invalid email or password",
      });
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login info helper
  const handleDemoLogin = (userType: string) => {
    let demoEmail = "";
    
    switch (userType) {
      case "admin":
        demoEmail = "admin@example.com";
        break;
      case "hospital":
        demoEmail = "hospital@example.com";
        break;
      case "agent":
        demoEmail = "agent@example.com";
        break;
      case "user":
        demoEmail = "user@example.com";
        break;
    }
    
    setEmail(demoEmail);
    setPassword("password");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-white text-sm">
            {errors.general}
          </div>
        )}
        
        <GlassInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        
        <GlassInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        
        <div className="pt-2">
          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Log In
          </GlassButton>
        </div>
        
        <div className="text-center text-white/70 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-insurance-pink hover:text-white transition-colors"
          >
            Sign up
          </Link>
        </div>
        
        <div className="border-t border-white/10 pt-4 mt-4">
          <p className="text-center text-white/70 text-sm mb-3">
            Demo accounts (password: "password")
          </p>
          <div className="grid grid-cols-2 gap-2">
            <GlassButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("admin")}
            >
              Admin Demo
            </GlassButton>
            <GlassButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("hospital")}
            >
              Hospital Demo
            </GlassButton>
            <GlassButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("agent")}
            >
              Agent Demo
            </GlassButton>
            <GlassButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("user")}
            >
              User Demo
            </GlassButton>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
