import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const usePostLoginRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
          navigate('/join-learner');
        } else {
          if (profile.role === 'learner') {
            navigate('/dashboard/learner'); // or any main learner page
          } else if (profile.role === 'mentor') {
            navigate('/dashboard/mentor');
          } else {
            navigate('/join-learner');
          }
        }
      };

      fetchProfile();
    }
  }, [user, loading, navigate]);
};
