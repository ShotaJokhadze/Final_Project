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
    className="card w-full max-w-[300px] border border-gray-200 dark:border-gray-700 relative flex flex-col justify-between bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
   >
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2 truncate">{title}</h2>
      <span className="text-sm bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white px-2 py-1 rounded-full self-center mb-3">
        {tag}
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center flex-grow line-clamp-4 mb-4">
        {description}
      </p>
      <div className="flex justify-center space-x-2">
        <PostsButton id={post.id} />
        <Link
          href={`/${locale}/edit-blog/${post.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Edit
        </Link>
        <DeleteBlog id={post.id}/>
      </div>
    </div>
   </div>
  );
}
