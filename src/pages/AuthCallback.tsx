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
    if (authLoading || profileLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    if (user && (!profile || !profile.role)) {
      const redirectPath = localStorage.getItem('post_login_redirect');
      if (redirectPath) {
        localStorage.removeItem('post_login_redirect');
        navigate(redirectPath);
      } else {
        navigate('/onboarding');
      }
      return;
    }

    if (profile && profile.role) {
      toast({
        title: 'Welcome back!',
        description: 'You have been successfully logged in.',
      });
      navigate('/dashboard');
      return;
    }
  }, [user, profile, authLoading, profileLoading, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-white/80">Completing your login...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
