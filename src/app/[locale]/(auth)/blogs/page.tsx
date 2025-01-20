import Link from "next/link";
import { PostsButton } from "../../../../components/Button/Buttons";
import { BlogType } from "../../../../types/blogs";

async function fetchBlogs(): Promise<BlogType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

interface BlogsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function BlogsPage({ params, searchParams }: BlogsPageProps) {
  let blogs: BlogType[] = [];
  let fetchError: string | null = null;
  const { locale } = params;

  try {
    blogs = await fetchBlogs();
  } catch (error) {
    fetchError = (error as Error).message;
  }

  const getLocalizedText = (georgianText: string | null, englishText: string) => {
    if (locale === 'ka') {
      return georgianText || englishText; // Fallback to English if Georgian is null
    }
    return englishText;
  };

  return (
    <div className="p-3 w-full h-full flex flex-col items-between">
      <div className="blogs-top flex justify-between items-center w-full">
        <h2 className="text-center text-2xl">Our Blogs</h2>
        <Link 
          className="bg-mediumGray text-light rounded-md p-3 hover:bg-gray-900 transition-all"
          href={`/${locale}/create-blog`}
        >
          Create Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center place-content-center mt-2">
        {fetchError && <p>{fetchError}</p>}

        {blogs &&
          blogs.map((post) => (
            <div
              className="card w-[300px] border border-mediumGray relative h-[250px] flex flex-col justify-around gap-2 max-w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transition-colors duration-300 overflow-hidden"
              key={post.id}
            >
              <div
                key={post.id}
                className="h-full flex flex-col items-center"
              >
                <div className="p-2 flex flex-col justify-between flex-1">
                  <h2 className="text-lg m-0 text-white text-center">
                    {getLocalizedText(post.title_ge, post.title)}
                  </h2>
                  <p className="text-[0.9rem] text-gray-300 my-1 line-clamp-5 text-center">
                    {getLocalizedText(post.description_ge, post.description)}
                  </p>
                  <div className="flex justify-center gap-2">
                    <PostsButton id={post.id} />
                    <Link
                      href={`/${locale}/edit-blog/${post.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}