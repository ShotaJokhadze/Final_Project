import React from 'react';

interface BlogProps {
  id: number;
  title: string;
  description: string;
  title_ge: string;
  description_ge: string;
}

const Blog: React.FC<BlogProps> = (props) => {
  const { title, description} = props;

  return (
    <div className="blog-card w-3/5 p-4 flex flex-col justify-center">
      <h2 className="blog-title font-medium text-2xl whitespace-nowrap mb-2">{title}</h2>
      <p className="blog-body text-base text-mediumGray mb-5">{description}</p>
      <div className="blog-footer flex justify-center items-center">
        <span className="blog-tags flex">
        </span>
        <div className="blog-reactions text-sm">
        </div>
      </div>
    </div>
  );
};

export default Blog;
