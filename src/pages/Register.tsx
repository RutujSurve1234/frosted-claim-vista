
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";
import GlassInput from "@/components/GlassInput";
import GlassSelect from "@/components/GlassSelect";
import GlassButton from "@/components/GlassButton";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name) {
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await register(name, email, password, role);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      
      setErrors({
        general: errorMessage,
      });
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to get started with ClaimVista"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-white text-sm">
            {errors.general}
          </div>
        )}
        
        <GlassInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        
        <GlassInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
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
        />
        
        <div className="pt-2">
          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Create Account
          </GlassButton>
        </div>
        
        <div className="text-center text-white/70 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-insurance-pink hover:text-white transition-colors"
          >
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
