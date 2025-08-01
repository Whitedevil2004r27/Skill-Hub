import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface OnboardingRedirectProps {
  children: React.ReactNode;
}

export const OnboardingRedirect = ({ children }: OnboardingRedirectProps) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't redirect if still loading
    if (authLoading || profileLoading) return;

    // If not authenticated, let other auth guards handle it
    if (!user) return;

    // If user exists but no profile or no role, redirect to onboarding
    if (user && (!profile || !profile.role)) {
      navigate('/onboarding');
      return;
    }

    // If user has a role, they can access protected pages
    // The specific page routing will be handled by the route itself
  }, [user, profile, authLoading, profileLoading, navigate]);

  // Show loading while checking auth/profile state
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};