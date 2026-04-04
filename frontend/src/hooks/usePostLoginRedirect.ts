import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase';

export const usePostLoginRedirect = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const fetchProfile = async () => {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error || !profile) {
          // No profile yet — new user
          router.push('/join-learner');
        } else {
          if (profile.role === 'learner') {
            router.push('/dashboard/learner'); // or any main learner page
          } else if (profile.role === 'mentor') {
            router.push('/dashboard/mentor');
          } else {
            router.push('/join-learner');
          }
        }
      };

      fetchProfile();
    }
  }, [user, loading, router]);
};
