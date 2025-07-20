/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditBlogModal from './EditMyBlogPost';
import BlogCard from './MyBlogCard';
import { handleDeleteBlogById } from '@/services/Operations/BlogsOperation/BlogsApi';
import toast from 'react-hot-toast';
import { handleMyProfileApi } from '@/services/Operations/ProfileOperation/ProfilePageApi';
import { signInSuccess } from '@/Reducers/userSlice';

const MyBlog = () => {
  const data = useSelector(state => state?.user?.currentUser?.blogs);
  const dispatch = useDispatch();
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);


  const fetchData = async () => {
    try {
      setFetchingData(true);
      const profileResponse = await handleMyProfileApi();
      if (profileResponse?.status === 200 || profileResponse?.status === 201) {
        dispatch(signInSuccess(profileResponse?.data?.data));
        // toast.success('Blogs refreshed successfully');
      } else {
        throw new Error('Failed to refresh blogs');
      }
    } catch (error) {
      toast.error(error.message || 'Error refreshing blogs');
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => { fetchData() }, []);

  // Delete blog function
  const handleDeleteBlog = async (blogId) => {
    try {
      setLoading(true);
      const response = await handleDeleteBlogById(blogId);
      if (response?.statusCode === 200) {
        toast.success('Blog deleted successfully!');
        const profileResponse = await handleMyProfileApi();
        if (profileResponse?.status === 200 || profileResponse?.status === 201) {
          dispatch(signInSuccess(profileResponse?.data?.data));
        } else {
          toast.error('Blog deleted Successfully');
        }
        setDeletingId(null);
      } else {
        throw new Error(response?.message || 'Failed to delete blog');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-6 lg:mb-0">
        <div className="relative z-10 -mt-10" >
          <h1 className="text-h3 md:text-h3 lg:text-h2 text-customPurple font-semibold "> My Blogs</h1>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Processing...</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {data?.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">You haven&apos;t written any blogs yet.</p>
          </div>
        ) : (
          data?.map(blog => (<BlogCard key={blog?._id} blog={blog} onEdit={setEditingBlog} onDelete={setDeletingId} />)))}
      </div>
      {/* Edit Modal */}
      {editingBlog && (<EditBlogModal blog={editingBlog} onClose={() => setEditingBlog(null)} />)}
      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setDeletingId(null)} disabled={loading} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button onClick={() => handleDeleteBlog(deletingId)} disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlog;