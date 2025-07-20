/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { handleAllBlogs, handleLikeBlog, handleGetBlogById, getFeaturedBlog } from '@/services/Operations/BlogsOperation/BlogsApi';
import toast from 'react-hot-toast';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});


  // Fetch all blogs
  const fetchAllBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await handleAllBlogs();
      if (response?.data) {
        setBlogs(response?.data);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch featured blogs
  const fetchFeaturedBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getFeaturedBlog();
      if (response) {
        setFeaturedBlogs(response);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch featured blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  // In your BlogContext.js
  const toggleLike = async (blogId, userId) => {
    try {
      // Optimistic update
      setLikedBlogs(prev => ({ ...prev, [blogId]: !prev[blogId] }));
      const response = await handleLikeBlog(blogId);
      if (response?.statusCode !== 200) {
        throw new Error(response?.message || 'Failed to like blog');
      }

      // Update the blogs state
      setBlogs(prev => prev.map(blog => {
        if (blog._id === blogId) {
          return {
            ...blog,
            likes: likedBlogs[blogId]
              ? blog.likes.filter(id => id !== userId)
              : [...blog.likes, userId]
          };
        }
        return blog;
      }));

      return true;
    } catch (error) {
      // Revert optimistic update on error
      setLikedBlogs(prev => ({
        ...prev,
        [blogId]: !prev[blogId]
      }));
      throw error; // Re-throw the error to handle it in the component
    }
  };
  
  // Get single blog by ID
  const getBlogById = async (id) => {
    try {
      setLoading(true);
      const response = await handleGetBlogById(id);
      if (response?.statusCode === 200) {
        return response.data;
      }
      throw new Error(response?.message || 'Blog not found');
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch blog');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Initialize data
  useEffect(() => {
    fetchAllBlogs();
    fetchFeaturedBlogs();
  }, [fetchAllBlogs, fetchFeaturedBlogs]);

  return (
    <BlogContext.Provider value={{
      blogs,
      featuredBlogs,
      loading,
      error,
      likedBlogs,
      fetchAllBlogs,
      fetchFeaturedBlogs,
      toggleLike,
      getBlogById,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
