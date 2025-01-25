'use client'
import Link from "next/link";
import { BlogType } from "../../types/blogs";
import { PostsButton } from "../Button/Buttons";
import DeleteBlog from "../DeletePostButton/DeletePostButton";


interface BlogCardProps {
  post: BlogType;
  title: string; // Precomputed localized title
  description: string; // Precomputed localized description
  locale: string;
  tag: string;
}

export default function BlogCard({ post, title, description, locale, tag }: BlogCardProps) {
  return (
    <div
      className="card w-[300px] border border-mediumGray relative h-[250px] flex flex-col justify-around gap-2 max-w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transition-colors duration-300 overflow-hidden"
      key={post.id}
    >
      <div className="h-full flex flex-col items-center">
        <div className="p-2 flex flex-col justify-between flex-1">
          <h2 className="text-lg m-0 text-white text-center">{title}</h2>
          <h2 className="text-lg m-0 text-white text-center">{tag}</h2>
          <p className="text-[0.9rem] text-gray-300 my-1 line-clamp-5 text-center">
            {description}
          </p>
          <div className="flex justify-center gap-2">
            <PostsButton id={post.id} />
            <Link
              href={`/${locale}/edit-blog/${post.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Edit
            </Link>
            <DeleteBlog id={post.id}/>
          </div>
        </div>
      </div>
    </div>
  );
}
