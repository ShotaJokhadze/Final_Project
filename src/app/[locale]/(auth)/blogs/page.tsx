import { PostsButton } from "../../../../components/Button/Buttons";

interface Blog {
  id: number;
  title_en: string;
  body_en: string;
}

async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function BlogsPage() {
  let blogs: Blog[] = [];
  let fetchError: string | null = null;

  try {
    blogs = await fetchBlogs();
  } catch (error) {
    fetchError = (error as Error).message;
  }

  return (
    <div className="h-full my-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-center text-2xl">Our Blogs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center place-content-center">
        {fetchError && <p>{fetchError}</p>}

        {blogs &&
          blogs.map((post) => (
            <div
              key={post.id}
              className="flex flex-col overflow-hidden border border-solid border-white bg-darkGray hover:scale-105 cursor-pointer"
            >
              <div className="p-2 flex flex-col justify-between flex-1">
                <h2 className="text-lg m-0 text-white">{post.title_en}</h2>
                <p className="text-[0.9rem] text-gray-300 my-1 line-clamp-5">
                  {post.body_en}
                </p>
                <div className="flex justify-between">
                  <PostsButton id={post.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
