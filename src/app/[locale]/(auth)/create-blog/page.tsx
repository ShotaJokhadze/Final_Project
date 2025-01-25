'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from '../../../../i18n/routing';
import { IoIosArrowDropdown } from "react-icons/io";
import { createBlog } from '../../../../utils/blogAdd';
import { BlogType } from '../../../../types/blogs';

interface FormErrors {
  title?: string;
  description?: string;
  title_ge?: string;
  tag?: string;
  description_ge?: string;
  submit?: string;
}

export default function CreateBlog() {
  const [formData, setFormData] = useState<BlogType>({
    id: 0,
    title: '',
    description: '',
    tag: '',
    title_ge: '',
    description_ge: ''
  });

  const [addGeorgian, setAddGeorgian] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const router = useRouter();

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
    if (!formData.tag.trim()) newErrors.tag = 'Tag is required';

    // Georgian validation
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
        const response = await createBlog(inputData);
  
        if (response.success) {
          setSuccessMessage(response.message);
          
          setTimeout(() => {
            router.push('/blogs');
          }, 2000);
        } else {
          setSuccessMessage('');
          setErrors(prev => ({
            ...prev,
            submit: response.message
          }));
        }
      } catch (error) {
        console.error('Error creating blog:', error);
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

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 my-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Create Blog</h2>
      
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

        <div className="space-y-2">
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Tag <span className="text-red dark:text-red">*</span>
          </label>
          <input
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className={inputClasses(errors.tag)}
          />
          {errors.title && <p className="text-red dark:text-red text-sm">{errors.tag}</p>}
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

        <button
          type="submit"
          className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-600 dark:hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                   focus:ring-offset-2 dark:focus:ring-offset-gray-900 
                   transition-colors"
        >
          Create Blog
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 p-4 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  );
}