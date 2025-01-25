import React from 'react';

interface BlogProps {
  id: number;
  title: string;
  description: string;
  tag: string;
  title_ge: string;
  description_ge: string;
}

const Blog: React.FC<BlogProps> = (props) => {
  const { title, description, tag } = props;

  console.log(tag)

  return (
    <div className="blog-card w-3/5 p-4 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700">
      <h2 className="blog-title font-medium text-2xl text-black dark:text-white mb-2">{title}</h2>
      <p className="blog-body text-base text-mediumGray dark:text-gray-400 mb-5">{description}</p>
      <div className="blog-footer flex justify-center items-center">
        <span className="blog-tags flex">
          {tag}
        </span>
      </div>
    </div>
  );
};

export default Blog;
