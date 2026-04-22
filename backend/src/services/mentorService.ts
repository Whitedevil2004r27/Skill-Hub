import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

export type Profile = Database['public']['Tables']['profiles']['Row'];

// Static mock data from the original UI
const mockMentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b367?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "System Design", "Mentoring"],
    bio: "Helping developers transition into senior roles with 8+ years at top tech companies.",
    hourlyRate: 120
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Product Manager",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    location: "Seattle, WA",
    skills: ["Product Strategy", "Data Analysis", "Leadership", "Agile"],
    bio: "Product leader passionate about building successful products and teams.",
    hourlyRate: 150
  }
];

export class MentorService {
  static async getAllMentors() {
    try {
      console.log('Fetching mentors from database...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or('role.eq.mentor,role.eq.both');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log(`Found ${data?.length || 0} mentors in database.`);

      // If no data in DB, return mock data for demonstration
      if (!data || data.length === 0) {
        console.log('Returning fallback mock mentors.');
        return mockMentors.map(m => ({
          ...m,
          display_name: m.name,
          avatar_url: m.avatar,
          hourly_rate: m.hourlyRate,
          availability: 'Weekdays, 6pm - 9pm'
        }));
      }

      return data.map(profile => ({
        ...profile,
        name: profile.display_name,
        avatar: profile.avatar_url,
      }));
    } catch (error) {
      console.error('Error fetching mentors:', error);
      return mockMentors.map(m => ({
        ...m,
        display_name: m.name,
        avatar_url: m.avatar,
        hourly_rate: m.hourlyRate,
        availability: 'Weekdays, 6pm - 9pm'
      }));
    }
  }

  static async getMentorById(id: string) {
    try {
      // Check if it's a mock ID (numeric)
      const mock = mockMentors.find(m => m.id.toString() === id);
      if (mock) {
        return {
          ...mock,
          display_name: mock.name,
          avatar_url: mock.avatar,
          hourly_rate: mock.hourlyRate,
          availability: mock.availability || 'Weekdays, 6pm - 9pm'
        };
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return {
        ...data,
        name: data.display_name,
        avatar: data.avatar_url
      };
    } catch (error) {
      console.error(`Error fetching mentor ${id}:`, error);
      return null;
    }
  }

}
