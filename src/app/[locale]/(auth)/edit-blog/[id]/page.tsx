'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";
import { useRouter } from '../../../../../i18n/routing';
import { editBlog, getBlog } from '../../../../../utils/blogAdd';
import { BlogType } from '../../../../../types/blogs';

interface FormErrors {
  title?: string;
  description?: string;
  title_ge?: string;
  description_ge?: string;
  submit?: string;
}

interface EditBlogProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function EditBlog({ params }: EditBlogProps) {
  const [formData, setFormData] = useState<BlogType>({
    id: 0,
    title: '',
    description: '',
    title_ge: '',
    description_ge: ''
  });

  const [addGeorgian, setAddGeorgian] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const { id, locale } = params;

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await getBlog(id);
        if (response.success && response.data) {
          setFormData(response.data);
          // If Georgian fields have data, show the Georgian section
          if (response.data.title_ge || response.data.description_ge) {
            setAddGeorgian(true);
          }
        } else {
          setErrors({ submit: 'Failed to load blog data' });
        }
      } catch (error) {
        setErrors({ submit: 'Error loading blog data' });
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (addGeorgian) {
      if (!formData.title_ge.trim()) newErrors.title_ge = 'Georgian title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const inputData = new FormData(e.target as HTMLFormElement);
        const response = await editBlog(id, inputData);
  
        if (response.success) {
          setSuccessMessage(response.message);
          
          setTimeout(() => {
            router.push(`/blogs`);
          }, 2000);
        } else {
          setSuccessMessage('');
          setErrors(prev => ({
            ...prev,
            submit: response.message
          }));
        }
      } catch (error) {
        console.error('Error updating blog:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'An unexpected error occurred. Please try again later.'
        }));
      }
    }
  };

  const inputClasses = (errorKey?: string) => `
    w-full px-3 py-2 border rounded-md 
    ${errorKey ? 'border-red dark:border-red' : 'border-gray-300 dark:border-gray-600'} 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    transition-colors
  `;

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 my-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Edit Blog</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Fields */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Title <span className="text-red dark:text-red">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClasses(errors.title)}
          />
          {errors.title && <p className="text-red dark:text-red text-sm">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Description <span className="text-red dark:text-red">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className={inputClasses(errors.description)}
          />
          {errors.description && <p className="text-red dark:text-red text-sm">{errors.description}</p>}
        </div>

        {/* Toggle for Georgian Description */}
        <div className="space-y-2">
          <div
            className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer flex items-center gap-2 underline"
            onClick={() => setAddGeorgian(prev => !prev)}
          >
            Do you want Georgian Description?
            <IoIosArrowDropdown />
          </div>
        </div>

        {/* Optional Georgian Fields */}
        <div
          className={`space-y-2 transition-all ${
            addGeorgian
              ? 'max-h-screen opacity-100 duration-500'
              : 'max-h-0 opacity-0 duration-500'
          } overflow-hidden`}
        >
          <div className="space-y-2">
            <label htmlFor="title_ge" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title (Georgian) <span className="text-red dark:text-red">*</span>
            </label>
            <input
              id="title_ge"
              name="title_ge"
              value={formData.title_ge}
              onChange={handleChange}
              className={inputClasses(errors.title_ge)}
            />
            {errors.title_ge && <p className="text-red dark:text-red text-sm">{errors.title_ge}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description_ge" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description (Georgian)
            </label>
            <textarea
              id="description_ge"
              name="description_ge"
              value={formData.description_ge}
              onChange={handleChange}
              rows={6}
              className={inputClasses(errors.description_ge)}
            />
            {errors.description_ge && <p className="text-red dark:text-red text-sm">{errors.description_ge}</p>}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 dark:hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                     focus:ring-offset-2 dark:focus:ring-offset-gray-900 
                     transition-colors"
          >
            Update Blog
          </button>
          
          <button
            type="button"
            onClick={() => router.push(`/blogs`)}
            className="flex-1 bg-gray-500 dark:bg-gray-600 text-white py-2 px-4 rounded-md 
                     hover:bg-gray-600 dark:hover:bg-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 
                     focus:ring-offset-2 dark:focus:ring-offset-gray-900 
                     transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-md">
          {errors.submit}
        </div>
      )}
    </div>
  );
}