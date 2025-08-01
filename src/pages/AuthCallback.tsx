<<<<<<< HEAD
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { toast } = useToast();

  useEffect(() => {
    // Don't do anything while loading
    if (authLoading || profileLoading) return;

    // If not authenticated, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // If user exists but no profile or no role, redirect to onboarding
    if (user && (!profile || !profile.role)) {
      navigate('/onboarding');
      return;
    }

    // If user has a role, redirect to dashboard
    if (profile && profile.role) {
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      navigate('/dashboard');
      return;
    }
  }, [user, profile, authLoading, profileLoading, navigate, toast]);

  // Show loading while checking auth/profile state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-white/80">Completing your login...</p>
=======
// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      const redirectPath = localStorage.getItem("post_login_redirect") || "/";
      localStorage.removeItem("post_login_redirect");
      navigate(redirectPath, { replace: true });
    }
  }, [loading, user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">Signing you in...</p>
>>>>>>> 5c673d4 (new ione)
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AuthCallback;
=======
export default AuthCallback;
>>>>>>> 5c673d4 (new ione)
