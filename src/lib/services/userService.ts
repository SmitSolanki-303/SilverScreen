// src/lib/services/userService.ts
import { createClient } from '@/lib/supabase/server';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

/**
 * Get the current user's profile information
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  // Fetch additional profile data from the public.users table if it exists
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.warn('Error fetching profile:', error.message);
    // Return basic user info even if profile fetch fails
    return {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      avatar_url: user.user_metadata?.avatar_url,
      created_at: user.created_at,
    };
  }

  return {
    id: user.id,
    email: user.email,
    full_name: profileData.full_name || user.user_metadata?.full_name,
    avatar_url: profileData.avatar_url || user.user_metadata?.avatar_url,
    created_at: profileData.created_at || user.created_at,
  };
}

/**
 * Update user profile information
 */
export async function updateUserProfile(updates: Partial<UserProfile>) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Update auth user metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: updates.full_name,
      avatar_url: updates.avatar_url,
    }
  });

  if (authError) {
    throw authError;
  }

  // Update profiles table if it exists
  const { error: dbError } = await supabase
    .from('profiles')
    .update({
      full_name: updates.full_name,
      avatar_url: updates.avatar_url,
    })
    .eq('id', user.id);

  if (dbError) {
    console.warn('Error updating profile in database:', dbError.message);
    // Don't throw error here as the auth update succeeded
  }

  return { success: true };
}

/**
 * Check if the user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return !!user;
}