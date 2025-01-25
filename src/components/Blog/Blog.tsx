import React from 'react';
import { BlogType } from '../../types/blogs';

interface BlogPostType extends BlogType {
  locale?: string;
}

const Blog: React.FC<BlogPostType> = (props) => {
  const { title, description, tag, title_ge, locale, description_ge } = props;

  const localizedTitle = locale === 'ka' ? title_ge : title;
  const localizedDescription = locale === 'ka' ? description_ge : description;

  return (
    <div className="blog-card w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
      <h2 className="blog-title font-semibold text-3xl text-gray-900 dark:text-gray-100 mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
        {localizedTitle}
      </h2>
      <p className="blog-body text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {localizedDescription || description}
      </p>
      <div className="blog-footer flex justify-center items-center">
        <span className="blog-tag px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium tracking-wide uppercase">
          {tag}
        </span>
      </div>
    </div>
  );
};

export default Blog;