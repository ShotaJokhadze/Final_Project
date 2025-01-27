'use server'

import { createClient } from "./supabase/server"

export async function addRating ({ name, rating, feedback }: { name: string; rating: number; feedback: string }) {
 const supabase = await createClient();

 const userResponse = await supabase.auth.getUser()
 const user_id = userResponse.data?.user?.id

  console.log(name, rating, feedback)

 if (!name || !rating || !feedback) {
  console.log('Missing required fields');
  return { success: false, message: 'Missing required fields.' };
 }

 try {
  const {data, error} = await supabase.from('testimonials').insert({
    name,
    rating,
    feedback,
    user_id
  }).single()

  if (error) {
    console.error('Error inserting into Supabase:', error);
    return { success: false, message: 'Failed to get the rating, please try again' };
  }
  console.log('Rating inserted into Supabase:', data);
    return { success: true, message: 'Thank you for trusting us' };
 } catch (err) {
    console.log('Error', err)
    return { success: false, message: 'Error creating rating. Please try again.' };
 }
} 