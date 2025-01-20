'use server'

import { createClient } from "./supabase/server"

export async function createBlog(inputData: FormData) {
  const supabase = await createClient()

  const userResponse = await supabase.auth.getUser()
  const user_id = userResponse.data?.user?.id

  const title = inputData.get('title') as string;
  const description = inputData.get('description') as string;
  const title_ge = inputData.get('title_ge') as string;  // Fixed typo in 'title_ge'
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

  // Verify user authorization
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  console.log('Authenticated user ID:', user_id);

  // Get form data
  const title = inputData.get('title')?.toString();
  const description = inputData.get('description')?.toString();
  const title_ge = inputData.get('title_ge')?.toString() || null;
  const description_ge = inputData.get('description_ge')?.toString() || null;

  console.log('Blog ID:', blogId);
  console.log('Input Data:', { title, description, title_ge, description_ge });

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

    // Prepare update data
    const updateData = {
      title,
      description,
      title_ge,
      description_ge,
    };

    console.log('Data to be updated:', updateData);

    // Update the blog
    const { data, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', blogId)
      .select(); // Select the updated rows to confirm

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

    // Ensure all fields are strings before returning
    const sanitizedData = {
      ...data,
      title: data.title || '',
      description: data.description || '',
      title_ge: data.title_ge || '',
      description_ge: data.description_ge || ''
    };

    return { success: true, message: 'Blog fetched successfully.', data: sanitizedData };
  } catch(error) {
    console.error('Error:', error);
    return { success: false, message: 'Error fetching blog.', data: null };
  }
}