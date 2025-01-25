'use client'

import React from 'react';
import { BlogType } from '../../types/blogs';
import DeleteBlog from '../DeletePostButton/DeletePostButton';
import { Tag} from 'lucide-react';

const Blog: React.FC<BlogType> = (props) => {
 const { title, description, tag, id } = props;

 return (
   <div className="blog-card group relative w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
     
     <h2 className="blog-title font-bold text-2xl md:text-3xl text-gray-900 dark:text-gray-100 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700 relative">
       {title}
     </h2>
     
     <p className="blog-body text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
       {description}
     </p>
     
     <div className="blog-footer flex justify-between items-center">
       <span className="blog-tag flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium tracking-wide uppercase">
         <Tag size={14} className="mr-2" />
         {tag}
       </span>
       
       <DeleteBlog id={id} />
     </div>
   </div>
 );
};

export default Blog;