"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Mail, Lock, User, Github, Users, BookOpen, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import BackgroundCanvas from "@/components/animations/BackgroundCanvas";
import Magnet from "@/components/animations/Magnet";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "learner";
  
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      await signUp(formData.email, formData.password, {
        display_name: `${formData.firstName} ${formData.lastName}`,
        role: formData.role
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#030303]">
      <BackgroundCanvas />
      
      <div className="w-full max-w-lg relative z-10 py-12">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">SkillHub</span>
          </Link>
        </motion.div>

        {/* Register Card */}
        <TiltCard>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Ambient glows */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-600/20 rounded-full blur-[100px] -z-10" />

            <Card className="bg-white/5 border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-2xl">
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-fit px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-medium uppercase tracking-wider mb-2">
                  Join the Community
                </div>
                <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
                <CardDescription className="text-gray-400">
                  Start your journey with expert mentorship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-4">
                {/* Role Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-300 ml-1">Select your path</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange("role", "learner")}
                      className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 ${
                        formData.role === "learner"
                          ? "border-violet-500 bg-violet-500/10 text-white"
                          : "border-white/5 bg-white/5 text-gray-500 hover:border-white/10"
                      }`}
                    >
                      <BookOpen className={`h-6 w-6 ${formData.role === "learner" ? "text-violet-400" : ""}`} />
                      <div className="text-sm font-bold">I want to Learn</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("role", "mentor")}
                      className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 ${
                        formData.role === "mentor"
                          ? "border-violet-500 bg-violet-500/10 text-white"
                          : "border-white/5 bg-white/5 text-gray-500 hover:border-white/10"
                      }`}
                    >
                      <Users className={`h-6 w-6 ${formData.role === "mentor" ? "text-violet-400" : ""}`} />
                      <div className="text-sm font-bold">I want to Mentor</div>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="bg-transparent px-4 text-gray-500">Registration Details</span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-300 ml-1">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-300 ml-1">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300 ml-1">Confirm</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-500 text-center leading-relaxed">
                    By joining, you agree to our <Link href="/terms" className="text-violet-400">Terms</Link> and <Link href="/privacy" className="text-violet-400">Privacy Policy</Link>.
                  </div>

                  <Magnet>
                    <Button type="submit" disabled={loading} className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </Magnet>
                </form>

                <div className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold ml-1">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TiltCard>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
