import React, { useState } from "react";
import { deleteBlog } from "../../utils/blogAdd";

interface DeleteBlogProps {
  id: number;
}

const DeleteBlog: React.FC<DeleteBlogProps> = ({ id }) => {
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteBlog(id);

      if (!result.success) {
        throw new Error(result.message || "Failed to delete the product.");
      }

      setModalMessage(result.message || "Product deleted successfully!");
      setModalVisible(true);
    } catch (error) {
        if (error instanceof Error) { 
          const errorMessage = error.message || "An unexpected error occurred.";
          setModalMessage(errorMessage);
          setModalVisible(true);
          console.error("Error deleting product:", errorMessage);
        }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "Product deleted successfully!") {
      window.location.reload();
    }
  };

  return (
    <div>
      <button
        data-cy="delete-my-product-button"
        onClick={handleDeleteProduct}
        className="py-2 px-5 m-auto bg-red text-white rounded-md hover:bg-darkRed transition duration-200 ease-in-out"
      >
        Delete
      </button>

      {modalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
          data-cy="delete-product-modal"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg text-center transition-all duration-300 ease-in-out">
            <p data-cy="delete-success-alert" className="mb-4 text-lg text-gray-800 dark:text-white">
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-red text-white rounded-md hover:bg-darkRed transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBlog;
