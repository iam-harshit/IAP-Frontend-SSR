/* eslint-disable react/prop-types */
import React, {  useState } from 'react';
import pen from '@/assets/blogs/pen.svg';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { MdAdd } from "react-icons/md";
import DOMPurify from 'dompurify';
import { handleCreateBlogs } from '@/services/Operations/BlogsOperation/BlogsApi';
import { useNavigate } from 'react-router-dom';

const WriteBlogModal = ({ isOpen, onClose, setIsLoading, onSuccess }) => {
  const [blogFormData, setBlogFormData] = useState({ title: '', content: '', tags: [], avgTime: 2 });
  const [tagInput, setTagInput] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate()

  const validateInputs = () => {
    const errors = {};
    if (!blogFormData?.title.trim()) errors.title = 'Title is required';
    if (!blogFormData?.content.trim()) errors.content = 'Content is required';
    if (blogFormData?.avgTime < 1) errors.avgTime = 'Read time must be at least 1 minute';
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !blogFormData.tags.includes(trimmedTag)) {
      setBlogFormData(prev => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlogFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleContentChange = (content) => {
    setBlogFormData(prev => ({ ...prev, content }));
    if (formErrors.content) {
      setFormErrors(prev => ({ ...prev, content: '' }));
    }
  };


  const handleSubmit = async () => {
    if (!validateInputs()) return;
    try {
      setIsLoading(true);
      const payload = { ...blogFormData, content: DOMPurify.sanitize(blogFormData?.content) };
      const response = await handleCreateBlogs(payload);

      if (response?.statusCode === 200 || response?.statusCode === 201) {
        toast.success('Blog published successfully!');
        setBlogFormData({ title: '', content: '', tags: [], avgTime: 2 });
        onClose();
        onSuccess();  // Call the success callback to reload blogs
      } else if (response?.status === 409) {
        toast.error('Blog with this title already exists. Please choose a different title.');
        setFormErrors(prev => ({ ...prev, title: 'Blog with this title already exists.' }));
      } else if (response?.status === 401) {
        navigate("/sign-in")
        toast.error(response?.response?.data?.message || 'Unauthorized access. Please log in.');
        setFormErrors(prev => ({ ...prev, title: 'UnAuthorized access. Please log in.' }));
      } else {
        throw new Error(response?.response?.data?.message || 'Failed to publish blog');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-purple-700">
            <img src={pen} alt="pen icon" /> Write New Blog Post
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl" type="button">
            &times;
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={blogFormData?.title}
              onChange={handleInputChange}
              placeholder="Enter your blog post title..."
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${formErrors?.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
              required
            />
            {formErrors?.title && <p className="text-red-500 text-sm mt-1">{formErrors?.title}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="block font-medium mb-1">Content *</label>
            <ReactQuill
              value={blogFormData?.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['blockquote', 'code-block'],
                  ['link'],
                  ['clean'],
                ],
              }}
              className={`bg-white rounded-md ${formErrors?.content ? 'border border-red-500' : ''}`}
            />
            {formErrors?.content && <p className="text-red-500 text-sm mt-1">{formErrors?.content}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">Tags</label>
            <div className="flex items-center gap-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..." className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="button" onClick={handleAddTag} className="bg-purple-500 px-3 py-3 rounded-md text-white font-bold hover:bg-purple-600"
              >
                <MdAdd />
              </button>
            </div>
            {blogFormData?.tags?.length > 0 && (
              <div className="flex flex-wrap mt-3 gap-2">
                {blogFormData?.tags?.map((tag, index) => (
                  <span key={index} className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="text-purple-500 hover:text-purple-700"
                      type="button"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Read Time */}
          <div>
            <label className="block font-medium mb-1">Average Read (minutes) *</label>
            <input type="number" name="avgTime" min="1" value={blogFormData.avgTime} onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${formErrors.avgTime ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`} required
            />
            {formErrors?.avgTime && <p className="text-red-500 text-sm mt-1">{formErrors?.avgTime}</p>}
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            type="button"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-semibold" type="button"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteBlogModal;