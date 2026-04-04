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
    bio: "Helping developers transition into senior roles with 8+ years at top tech companies."
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
    bio: "Product leader passionate about building successful products and teams."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Figma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    reviews: 156,
    location: "New York, NY",
    skills: ["UI/UX Design", "Design Systems", "User Research", "Prototyping"],
    bio: "Design leader with 10+ years creating user-centered experiences."
  },
  {
    id: 4,
    name: "David Kim",
    title: "AI Engineer",
    company: "OpenAI",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 94,
    location: "Austin, TX",
    skills: ["Machine Learning", "Python", "Deep Learning", "AI Ethics"],
    bio: "AI researcher helping professionals transition into machine learning."
  }
];

export class MentorService {
  static async getAllMentors() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or('role.eq.mentor,role.eq.both');
      
      if (error) throw error;
      
      // Map database names to UI names if necessary, 
      // though we should stick to the DB schema for consistency.
      return data.map(profile => ({
        ...profile,
        name: profile.display_name,
        avatar: profile.avatar_url,
        // skills are already an array in the new schema
      }));
    } catch (error) {
      console.error('Error fetching mentors:', error);
      return []; 
    }
  }

  static async getMentorById(id: string) {
    try {
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
