'use server'

import { createClient } from "./supabase/server"
import { NextApiRequest, NextApiResponse } from 'next';

export async function createBlog(inputData: FormData) {
  const supabase = await createClient()

  const userResponse = await supabase.auth.getUser()
  const user_id = userResponse.data?.user?.id

  const title = inputData.get('title') as string;
  const description = inputData.get('description') as string;
  const title_ge = inputData.get('title_ge') as string;
  const description_ge = inputData.get('description_ge') as string;
  
  if (!title || !description) {
    console.log('Missing required fields');
    return { success: false, message: 'Missing required fields.' };
  }

  try {
    const {data, error} = await supabase.from('blogs').insert({
      title,
      description,
      title_ge, 
      description_ge,
      user_id
    }).single()
    
    if (error) {
      console.error('Error inserting into Supabase:', error);
      return { success: false, message: 'Failed to insert blog into the database.' };
    }
    console.log('Blog inserted into Supabase:', data);
    return { success: true, message: 'Blog created successfully!' };
  } catch(error) {
    console.log('Error', error)
    return { success: false, message: 'Error creating blog. Please try again.' };
  }
}

export async function editBlog(blogId: string, inputData: FormData) {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  const title = inputData.get('title')?.toString();
  const description = inputData.get('description')?.toString();
  const title_ge = inputData.get('title_ge')?.toString() || null;
  const description_ge = inputData.get('description_ge')?.toString() || null;

  if (!title || !description) {
    console.log('Missing required fields');
    return { success: false, message: 'Missing required fields.' };
  }

  try {
    // Verify the blog belongs to the user
    const { data: blog, error: blogError } = await supabase
      .from('blogs')
      .select('user_id')
      .eq('id', blogId)
      .single();

    if (blogError) {
      console.error('Error fetching blog:', blogError);
      return { success: false, message: 'Failed to verify blog ownership.' };
    }

    if (!blog) {
      console.error('Blog not found.');
      return { success: false, message: 'Blog not found.' };
    }

    if (blog.user_id !== user_id) {
      console.log('Unauthorized to edit this blog');
      return { success: false, message: 'Unauthorized to edit this blog.' };
    }

    const updateData = {
      title,
      description,
      title_ge,
      description_ge,
    };

    const { data, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', blogId)
      .select();

    if (error) {
      console.error('Error updating Supabase:', error);
      return { success: false, message: `Failed to update blog: ${error.message}` };
    }

    if (!data || data.length === 0) {
      console.error('Update failed: No rows were modified.');
      return { success: false, message: 'No rows updated. Check the provided data.' };
    }

    console.log('Blog updated in Supabase:', data);
    return { success: true, message: 'Blog updated successfully!' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Error updating blog. Please try again.' };
  }
}


export async function getBlog(blogId: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .single()

    if (error) {
      console.error('Error fetching blog:', error);
      return { success: false, message: 'Failed to fetch blog.', data: null };
    }

    return { success: true, message: 'Blog fetched successfully.', data: data };
  } catch(error) {
    console.error('Error:', error);
    return { success: false, message: 'Error fetching blog.', data: null };
  }
}

export async function deleteBlog(blogId: number) {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  try {
    // Validate the blog exists and belongs to the user
    const { data: blog, error: blogError } = await supabase
      .from('blogs')
      .select('user_id')
      .eq('id', blogId) // Ensure `blogId` is a number
      .single();

    if (blogError) {
      console.error('Error fetching blog:', blogError);
      return { success: false, message: 'Failed to verify blog ownership.' };
    }

    if (blog.user_id !== user_id) {
      console.log(`Unauthorized delete attempt by user: ${user_id}`);
      return { success: false, message: 'Unauthorized to delete this blog.' };
    }

    const { error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogId);

    if (deleteError) {
      console.error('Error deleting blog from Supabase:', deleteError);
      return { success: false, message: 'Failed to delete blog.' };
    }

    return { success: true, message: 'Blog deleted successfully!' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Error deleting blog. Please try again.' };
  }
}
