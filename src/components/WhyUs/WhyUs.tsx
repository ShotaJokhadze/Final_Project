import React from 'react';
import { Shield, Clock, CreditCard } from 'lucide-react';

const WhyUsSection = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />,
      title: "Quality Guaranteed",
      description: "We stand behind every product with our satisfaction guarantee and rigorous quality control standards."
    },
    {
      icon: <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />,
      title: "24/7 Support",
      description: "Our dedicated customer service team is available around the clock to assist you with any questions or concerns."
    },
    {
      icon: <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />,
      title: "Secure Payments",
      description: "Shop with confidence using our encrypted payment system that supports all major payment methods."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Why Choose Us</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with unmatched quality and service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;