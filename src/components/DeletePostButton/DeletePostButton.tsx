import React, { useState } from "react";
import { deleteBlog } from "../../utils/blogAdd";
import { Trash2, X } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface DeleteBlogProps {
  id: number;
}

const DeleteBlog: React.FC<DeleteBlogProps> = ({ id }) => {
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleDeleteBlog = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlog(id);

      if (!result.success) {
        throw new Error(result.message || "Failed to delete the blog.");
      }

      setModalMessage(result.message || "blog deleted successfully!");
      setModalVisible(true);
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/blogs`);
      }, 1500);
    } catch (error) {
      if (error instanceof Error) { 
        const errorMessage = error.message || "An unexpected error occurred.";
        setModalMessage(errorMessage);
        setModalVisible(true);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
      <div>
        <button
          onClick={handleDeleteBlog}
          disabled={isDeleting}
          className={`
            flex items-center justify-center gap-2 
            py-2 px-5 m-auto 
            ${isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red hover:bg-darkRed'}
            text-white rounded-md 
            transition duration-200 ease-in-out max-w-[114px]
          `}
        >
          <Trash2 size={18} />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
  
        {modalVisible && (
          <div 
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <div 
              className="
                bg-white dark:bg-gray-800 
                p-8 rounded-xl 
                shadow-2xl 
                max-w-sm w-full
                relative
                transform transition-all 
                scale-100 opacity-100
              "
            >
              {!isSuccess && (
                <button 
                  onClick={() => setModalVisible(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              )}
  
              <div className="text-center">
                <p 
                  className="
                    mb-6 text-lg 
                    text-gray-800 dark:text-white
                    font-semibold
                  "
                >
                  {modalMessage}
                </p>
  
                {!isSuccess && (
                  <button
                    onClick={() => setModalVisible(false)}
                    className="
                      bg-red hover:bg-darkRed
                      text-white py-2 px-4 
                      rounded-md transition-all duration-200
                    "
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default DeleteBlog;