'use client'

import { FormEvent, useState } from "react";
import { Star } from "lucide-react";
import { addRating } from "../../../../utils/addRating";
import { useRouter } from "../../../../i18n/routing";

type FormData = {
  name: string;
  rating: number;
  feedback: string;
};

export default function RateUs() {
  const router = useRouter();
  const [messages, setMessages] = useState({ success: '', error: '' });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    rating: 0,
    feedback: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (newRating: number) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await addRating(formData)
      if (response.success) {
        setMessages({ success: response.message, error: '' });
        setTimeout(() => router.push('/'), 1500);
      }
      else {
        setMessages({ success: '', error: response.message });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setMessages({ success: '', error: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className="w-1/2 relative">
      <div className="w-full p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 transition-colors duration-200"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Rate Us
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We value your feedback
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       focus:border-transparent outline-none transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Rating
            </label>
            <div className="flex justify-start space-x-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors duration-200 
                    ${star <= (hoveredRating || formData.rating)
                      ? "text-yellow-400 dark:text-yellow-300 fill-current"
                      : "text-gray-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-300 hover:fill-current"
                    }`}
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       focus:border-transparent outline-none transition-all duration-200 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700
                     text-white font-medium py-3 px-4 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-800 transition-all duration-200
                     transform hover:scale-[1.02]"
          >
            Submit Feedback
          </button>
        </form>
        {messages.success && <div className="mt-4 p-4 text-green-800 bg-green-100 rounded-md" data-cy='create-product-success-message'>{messages.success}</div>}
        {messages.error && <div className="mt-4 p-4 text-red rounded-md" data-cy='create-product-error-message'>{messages.error}</div>}
      </div>
    </div>
  );
}