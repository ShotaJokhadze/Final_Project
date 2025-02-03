'use client';
import { useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          message: 'Message sent successfully! We\'ll get back to you soon.',
          isError: false,
        });
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      const errorMessage = 
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again later.';
          
      setStatus({
        message: errorMessage,
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] m-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Contact Us</h2>

      <div className="mb-5 p-4 border border-solid border-gray-200 rounded-md bg-white/5">
        <p className="mb-2">
          Email:{" "}
          <a href="mailto:youremail@example.com" className="text-blue-500 hover:text-blue-600">
            youremail@example.com
          </a>
        </p>
        <p className="mb-2">Phone: (123) 456-7890</p>
        <p className="mb-2">Address: 123 Your Street, City, State, ZIP Code</p>
        <p>
          Business Hours: Monday - Friday: 9 AM - 5 PM | Saturday: 10 AM - 2 PM
          | Sunday: Closed
        </p>
      </div>

      <div className="bg-white/5 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
        
        {status && (
          <div className={`p-4 mb-4 rounded-md ${
            status.isError 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Name
              <input
                className="w-full p-2 mt-1 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                required
                minLength={2}
              />
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email
              <input
                className="w-full p-2 mt-1 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                required
              />
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Subject
              <input
                className="w-full p-2 mt-1 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="subject"
                required
                minLength={2}
              />
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Message
              <textarea
                className="w-full p-2 mt-1 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="message"
                required
                rows={5}
                minLength={10}
              />
            </label>
          </div>

          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md
                     hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}