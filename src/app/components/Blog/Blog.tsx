import React from 'react';

interface BlogProps {
  title_en: string;
  body_en: string;
  category_en: string;
  likes: number;
  dislikes: number;
  views: number;
}

const Blog: React.FC<BlogProps> = (props) => {
  const { title_en, body_en, category_en, likes, dislikes, views } = props;

  return (
    <div className="blog-card w-3/5 p-4 flex flex-col justify-center">
      <h2 className="blog-title font-medium text-2xl whitespace-nowrap mb-2">{title_en}</h2>
      <p className="blog-body text-base text-mediumGray mb-5">{body_en}</p>
      <div className="blog-footer flex justify-center items-center">
        <span className="blog-tags flex">
          {category_en}
        </span>
        <div className="blog-reactions text-sm">
          <span className="likes ml-2">Likes: {likes}</span>
          <span className="dislikes ml-2">Dislikes: {dislikes}</span>
          <span className="views ml-2">Views: {views}</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
