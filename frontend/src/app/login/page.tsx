"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Mail, Lock, Github, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import BackgroundCanvas from "@/components/animations/BackgroundCanvas";
import Magnet from "@/components/animations/Magnet";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithGitHub, signInWithEmail, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    try {
      await signInWithGitHub();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#030303]">
      <BackgroundCanvas />
      
      <div className="w-full max-w-md relative z-10">
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

        {/* Login Card */}
        <TiltCard>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Ambient glows */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-600/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-[80px] -z-10" />
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-2xl">
              <CardHeader className="text-center space-y-2">
                <div className="mx-auto w-fit px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-medium uppercase tracking-wider mb-2">
                  Member Access
                </div>
                <CardTitle className="text-3xl font-bold text-white">Welcome back</CardTitle>
                <CardDescription className="text-gray-400">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-4">
                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
                    onClick={handleGitHubLogin}
                    disabled={loading}
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="bg-transparent px-4 text-gray-500">Or email</span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-violet-500/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center space-x-2 text-xs text-gray-400 cursor-pointer group">
                      <input type="checkbox" className="rounded-md border-white/10 bg-white/5 text-violet-600" />
                      <span className="group-hover:text-gray-300 transition-colors">Keep me signed in</span>
                    </label>
                    <Link href="/forgot-password" px-1 className="text-xs text-violet-400 hover:text-violet-300 font-medium">
                      Forgot?
                    </Link>
                  </div>

                  <Magnet>
                    <Button type="submit" className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                      Sign In to SkillHub
                    </Button>
                  </Magnet>
                </form>

                <div className="text-center text-sm text-gray-500">
                  New to the platform?{" "}
                  <Link href="/register" className="text-violet-400 hover:text-violet-300 font-bold ml-1">
                    Create account
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
