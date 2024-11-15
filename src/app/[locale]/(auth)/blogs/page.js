"use client";

import "./Blogs.scss";
import { PostsButton } from "../../../components/Button/Buttons";
// import { PostsButton } from "../../components/Button/Buttons";
import { useEffect, useState } from "react";
import BlogsModal from "../../../components/BlogsModal/BlogsModal";

const url = "https://dummyjson.com/posts";

export default function Blogs() {
  const [blogList, setBlogList] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", body: "" });
  const [editBlog, setEditBlog] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const FetchDataAndSavetoLocalStorage = async () => {
    const response = await fetch(url);
    const data = response.json;
    const blogs = data.posts;

    localStorage.setItem("blogs", JSON.stringify(blogs));
    setBlogList(blogs);
  };

  const loadFromLocalStorage = () => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      setBlogList(JSON.parse(savedBlogs));
    } else {
      FetchDataAndSavetoLocalStorage();
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const saveToLocalStorage = (updatedBlogs) => {
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogList(updatedBlogs);
  };

  const createBlog = () => {
    const highestId =
      blogList.length > 0 ? Math.max(...blogList.map((blog) => blog.id)) : 1;
    const newBlogPost = {
      id: highestId + 1,
      title: newBlog.title,
      body: newBlog.body,
      views: 0,
    };
    const updatedBlogs = [newBlogPost, ...blogList];
    saveToLocalStorage(updatedBlogs);
    setNewBlog({ title: "", body: "" });
    setIsCreateModalOpen(false);
  };

  const updateBlog = () => {
    const updatedBlogs = blogList.map((blog) =>
      blog.id === editBlog.id
        ? { ...blog, title: editBlog.title, body: editBlog.body }
        : blog
    );
    saveToLocalStorage(updatedBlogs);
    setEditBlog(null);
    setIsEditModalOpen(false);
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogList.filter((blog) => blog.id !== id);
    saveToLocalStorage(updatedBlogs);
  };

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const toggleEditModal = (blog) => {
    setEditBlog(blog);
    setIsEditModalOpen(true);
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h2>Our Blogs</h2>
        <button onClick={toggleCreateModal}>Create Post</button>
      </div>

      <BlogsModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        title={newBlog.title}
        body={newBlog.body}
        setTitle={(title) => setNewBlog({ ...newBlog, title })}
        setBody={(body) => setNewBlog({ ...newBlog, body })}
        onSubmit={createBlog}
        action="create"
      />

      {/* Editing Blog Modal */}
      {isEditModalOpen && editBlog && (
        <BlogsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editBlog.title}
          body={editBlog.body}
          setTitle={(title) => setEditBlog({ ...editBlog, title })}
          setBody={(body) => setEditBlog({ ...editBlog, body })}
          onSubmit={updateBlog}
          action="edit"
        />
      )}

      <div className="blog-list">
        {blogList.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className="blog-buttons">
                <button onClick={() => toggleEditModal(post)}>Edit</button>
                <button onClick={() => deleteBlog(post.id)}>Delete</button>
                <PostsButton id={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
