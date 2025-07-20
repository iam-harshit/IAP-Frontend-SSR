/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import pen from '@/assets/blogs/pen.svg';
import DOMPurify from "dompurify";
import { MdAdd } from "react-icons/md";
import { handleUpdateBlogById } from '@/services/Operations/BlogsOperation/BlogsApi';
import { handleMyProfileApi } from "@/services/Operations/ProfileOperation/ProfilePageApi";
import { useDispatch } from "react-redux";
import { signInSuccess } from "@/Reducers/userSlice";

const EditBlogModal = ({ blog, onClose, refreshData }) => {
  const [blogFormData, setBlogFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    tags: blog?.tags || [],
    avgTime: blog?.avgTime || 2,
  });
  const [tagInput, setTagInput] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


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
    setBlogFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) setFormErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleContentChange = (content) => {
    setBlogFormData(prev => ({ ...prev, content }));
    if (formErrors.content) setFormErrors(prev => ({ ...prev, content: '' }));
  };

  const validateInputs = () => {
    const errors = {};
    if (!blogFormData?.title.trim()) errors.title = 'Title is required';
    if (!blogFormData?.content.trim()) errors.content = 'Content is required';
    if (blogFormData?.avgTime < 1) errors.avgTime = 'Read time must be at least 1 minute';
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      setLoading(true);
      const sanitizedContent = DOMPurify.sanitize(blogFormData.content);
      const payload = { ...blogFormData, content: sanitizedContent, tags: blogFormData.tags };
      // Direct API call from the BlogApi.jsx
      const response = await handleUpdateBlogById(blog._id, payload);
      if (response?.statusCode === 200) {
        toast.success('Blog updated successfully!');
        const profileResponse = await handleMyProfileApi();
        if (profileResponse?.status === 200 || profileResponse?.status === 201) {
          dispatch(signInSuccess(profileResponse?.data?.data));
        } else {
          toast.error('Blog updated successfully !, but failed to fetch latest data');
        }
        onClose();
      } else {
        throw new Error(response?.message || 'Failed to update blog');
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed  inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-4xl rounded-xl p-6  my-6 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-purple-700">
            <img src={pen} alt="pen icon" /> Edit Your Blog Post
          </h2>
          <button onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            type="button"
            disabled={loading}
          > &times;
          </button>
        </div>
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title *</label>
            <input type="text" name="title" value={blogFormData?.title} onChange={handleInputChange}
              placeholder="Enter your blog post title..."
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${formErrors?.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
              required
              disabled={loading}
            />
            {formErrors?.title && <p className="text-red-500 text-sm mt-1">{formErrors?.title}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="block font-medium mb-1">Content *</label>
            <ReactQuill value={blogFormData?.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['blockquote', 'code-block'], ['link'], ['clean'],
                ]
              }}
              className={`bg-white rounded-md ${formErrors?.content ? 'border border-red-500' : ''}`}
              readOnly={loading}
            />
            {formErrors?.content && <p className="text-red-500 text-sm mt-1">{formErrors?.content}</p>}
          </div>
          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">Tags</label>
            <div className="flex items-center gap-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
                className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
              <button type="button" onClick={handleAddTag} className="bg-purple-500 px-3 py-3 rounded-md text-white font-bold hover:bg-purple-600" disabled={loading} >
                <MdAdd />
              </button>
            </div>
            {blogFormData?.tags?.length > 0 && (
              <div className="flex flex-wrap mt-3 gap-2">
                {blogFormData?.tags?.map((tag, index) => (
                  <span key={index} className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"> {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="text-purple-500 hover:text-purple-700"
                      type="button" disabled={loading} > &times;
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
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${formErrors.avgTime ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
              required disabled={loading}
            />
            {formErrors?.avgTime && <p className="text-red-500 text-sm mt-1">{formErrors?.avgTime}</p>}
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            type="button" disabled={loading}
          >
            Cancel
          </button>
          <button onClick={handleSubmit} type="button" disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-semibold flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal