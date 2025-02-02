'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Product } from '../../../../types/product';
import { useRouter } from '../../../../i18n/routing';
import { IoIosArrowDropdown } from "react-icons/io";
import { createProduct } from '../../../../utils/productAdd';

interface FormData extends Omit<Product, 'id' | 'price'> {
  price: string;
}

export default function CreateProduct() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    brand: '',
    image: '',
    title_ge: '',
    description_ge: ''
  });

  const [addGeorgian, setAddGeorgian] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState({ success: '', error: '' });
  
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? (!isNaN(+value) ? +value : value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  

  const validateForm = (): boolean => {
    const newErrors:  Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (formData.image && !formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = 'Please enter a valid URL';
    }

    // Georgian validation
    if (addGeorgian) {
      if (!formData.title_ge?.trim()) newErrors.title_ge = 'Georgian title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const inputData = new FormData(e.target as HTMLFormElement);
      const response = await createProduct(inputData);

      if (response.success) {
        setMessages({ success: response.message, error: '' });
        setTimeout(() => router.push('/products'), 2000);
      } else {
        setMessages({ success: '', error: response.message });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setMessages({ success: '', error: 'An unexpected error occurred. Please try again.' });
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
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Create Product</h2>
      
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
            data-cy='create-product-title'
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
            rows={4}
            className={inputClasses(errors.description)}
            data-cy='create-product-description'
          />
          {errors.description && <p className="text-red dark:text-red text-sm">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Price <span className="text-red dark:text-red">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={inputClasses(errors.price)}
            data-cy='create-product-price'
          />
          {errors.price && <p className="text-red dark:text-red text-sm">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Brand <span className="text-red dark:text-red">*</span>
          </label>
          <input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={inputClasses(errors.brand)}
            data-cy='create-product-brand'
          />
          {errors.brand && <p className="text-red dark:text-red text-sm">{errors.brand}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Image URL <span className="text-red dark:text-red">*</span>
          </label>
          <input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={inputClasses(errors.image)}
            data-cy='create-product-image'
          />
          {errors.image && <p className="text-red dark:text-red text-sm">{errors.image}</p>}
        </div>

        {/* Optional Fields */}
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
              // required={addGeorgian}
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
              rows={4}
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
                   data-cy='create-product-button'
        >
          Create Product
        </button>
      </form>

      {/* Success Message */}
      {messages.success && <div className="mt-4 p-4 text-green-800 bg-green-100 rounded-md" data-cy='create-product-success-message'>{messages.success}</div>}
      {messages.error && <div className="mt-4 p-4 text-red-800 bg-red-100 rounded-md" data-cy='create-product-error-message'>{messages.error}</div>}
    </div>
  );
}
