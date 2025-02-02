'use client'

import React from 'react';
import { BlogType } from '../../types/blogs';
import DeleteBlog from '../DeletePostButton/DeletePostButton';
import { Tag, Pencil } from 'lucide-react';
import Link from 'next/link';

interface BlogProps extends BlogType {
  locale?: string;
}

const Blog: React.FC<BlogProps> = (props) => {
 const { title, description, tag, id, description_ge, title_ge, locale } = props;

 const localizedTitle = locale === 'ka' ? title_ge : title;
 const localizedDescription = locale === 'ka' ? description_ge : description;

 return (
   <div className="blog-card group relative w-[90%] max-w-2xl mx-auto p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
     
     <h2 className="blog-title font-bold text-2xl md:text-3xl text-gray-900 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 relative">
       {localizedTitle || title}
     </h2>
     
     <p className="blog-body text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
       {localizedDescription || description}
     </p>
     
     <div className="blog-footer flex justify-between items-center">
       <span className="blog-tag flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium tracking-wide uppercase">
         <Tag size={14} className="mr-2" />
         {tag}
       </span>
       <div className="buttons flex gap-3">
        <Link
            href={`/${locale}/edit-blog/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <Pencil size={18}/>
            Edit
          </Link>
        <DeleteBlog id={id} />
       </div>
     </div>
   </div>
 );
};

export default Blog;