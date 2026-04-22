// src/hooks/useAuth.tsx
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: (redirectPath?: string) => Promise<void>;
  signInWithGitHub: (redirectPath?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize session and set up listener
    const initSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      });

      return subscription;
    };

    const subscriptionPromise = initSession();

    return () => {
      subscriptionPromise.then(sub => sub.unsubscribe());
    };
  }, []);

  const signInWithGoogle = useCallback(async (redirectPath: string = '/auth/callback') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message || 'An unexpected error occurred during login',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const signInWithGitHub = useCallback(async (redirectPath: string = '/auth/callback') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An unexpected error occurred during GitHub login",
        variant: "destructive",
      });
    }
  }, [toast]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: 'Welcome Back',
        description: 'Successfully signed in with email',
      });
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const signUp = useCallback(async (email: string, password: string, metadata: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      toast({
        title: 'Account Created',
        description: 'Please check your email to confirm your registration',
      });
    } catch (error: any) {
      toast({
        title: 'Registration Error',
        description: error.message || 'An unexpected error occurred during registration',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out',
      });
    } catch (error: any) {
      toast({
        title: 'Sign Out Error',
        description: error.message || 'An unexpected error occurred during sign out',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmail,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

