"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, GraduationCap, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import Magnet from "@/components/animations/Magnet";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  return (
    <header className="fixed top-0 w-full glass z-50">
      <div className="w-full px-6 md:px-12 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">SkillHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {["Home", "Explore", "Courses", "Community"].map((item) => (
              <Link 
                key={item} 
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10">
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-violet-600 text-white text-xs">
                      {(profile?.display_name || user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-white/90">
                    {profile?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => signOut()}
                  variant="ghost"
                  className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Magnet>
                  <Link href="/register">
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </Magnet>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-6 border-t border-white/10"
          >
            <nav className="flex flex-col space-y-5">
              {["Home", "Explore", "Courses", "Community"].map((item) => (
                <Link 
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                  className="text-lg font-medium text-gray-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-white/5 text-white border border-white/10 rounded-xl">Dashboard</Button>
                    </Link>
                    <Button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="w-full bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-white rounded-xl">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-violet-600 text-white rounded-xl">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};
