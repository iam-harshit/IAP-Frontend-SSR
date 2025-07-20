import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegClock, FaShareAlt } from 'react-icons/fa';
import tag_icon from '@/assets/blogs/tag_icon.svg';
import msg from '@/assets/blogs/msg.svg';
import shareIcon from '@/assets/blogs/share.svg';
import DOMPurify from 'dompurify';
import { HiOutlineCalendar } from 'react-icons/hi2';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { handleCommentBlog } from '@/services/Operations/BlogsOperation/BlogsApi';
import toast from 'react-hot-toast';
import { useBlog } from '@/Context/BlogContext';

const BlogDetailPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const { getBlogById, toggleLike } = useBlog();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postingComment, setPostingComment] = useState(false);

  const fetchBlog = async () => {
    const blogData = await getBlogById(id);
    setBlog(blogData?.data);
  };
  useEffect(() => { fetchBlog() }, [id]);

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("Please login to like");
      return;
    }
    try {
      await toggleLike(id, currentUser._id);
      setBlog(prev => ({
        ...prev, likes: prev.likes.includes(currentUser._id) ? prev.likes.filter(userId => userId !== currentUser._id) : [...prev.likes, currentUser._id]
      }));
      await fetchBlog()
    } catch (error) {
      toast.error('Error liking blog:', error);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    if (!currentUser) {
      toast.error("Please login to comment");
      return;
    }
    setPostingComment(true);
    try {
      await handleCommentBlog(id, { comment: commentText });
      const updatedBlog = await getBlogById(id); // Refresh the blog data to get the new comment
      setBlog(updatedBlog);
      setCommentText('');
      await fetchBlog()
    } catch (error) {
      toast.error('Error posting comment:', error);
    } finally {
      setPostingComment(false);
    }
  };

  const handleShare = async (article) => {
    const url = `${window.location.origin}/blogs/${article._id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: 'Check out this blog on Inspiration!', url, });
      } catch (error) {
        console.warn('Share cancelled or failed:', error);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
        alert('Unable to copy link. Please try manually.');
      }
    } else {
      alert(`Share this link: ${url}`);
    }
  };

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  const hasLiked = currentUser && blog?.likes?.includes(currentUser?._id);
  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      <Link to="/blogs" className="text-purple-600 hover:underline mb-4 text-xs md:text-sm inline-block">
        ← Back to Blogs
      </Link>
      <div className="mx-auto px-4 py-2 ">
        {/* Meta */}
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-purple-200 text-purple-800 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">
            FEATURED ARTICLE
          </span>
          <div className="flex items-center text-gray-500 text-[11px]  md:text-sm gap-1">
            <FaRegClock /> <span>{blog?.avgTime ? `${blog?.avgTime} min read` : "2 min read"}</span>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-6">{blog?.title} </h1>
        {/* Author Info and Date */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar Circle */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center text-xs md:text-sm font-semibold text-purple-700 uppercase">
            {blog?.userId?.name?.[0] || 'U'}
          </div>
          {/* Name and Email */}
          <div className="flex flex-col text-sm md:text-base">
            <span className="font-medium text-gray-800">{blog?.userId?.name || 'Mentor'}</span>
            <span className="text-gray-500 text-xs md:text-sm">{blog?.userId?.email || 'mentor@example.com'}</span>
          </div>
          {/* Blog Date */}
          <div className="ml-auto flex items-center gap-1 text-gray-500 text-xs md:text-sm">
            <HiOutlineCalendar size={16} />
            <span>
              {new Date(blog?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {blog?.tags?.map((tag, i) => (
            <span key={i} className="text-[10px] md:text-xs text-[#B880F0] px-2 py-1 md:px-3 md:py-2 bg-[#f3f1f5] rounded-full font-bold flex items-center gap-1"
            >
              <img src={tag_icon} alt="" className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>

        {/* Like / Comment / Share */}
        <div className="flex justify-between border-t pt-4 pb-4 text-gray-500">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}  >
              {hasLiked ? (<IoMdHeart className="w-5 h-5 text-red-500 transition-colors duration-200" />) : (
                <IoMdHeartEmpty className="w-5 h-5 transition-colors duration-200" />
              )}
              <span className="text-xs md:text-sm"> {blog?.likes?.length || 0} likes </span>
            </div>
            <div className="flex items-center gap-1">
              <img src={msg} alt="comments" className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm"> {blog?.comments?.length || 0} comments  </span>
            </div>
          </div>
          <div onClick={() => handleShare(blog)} className="flex items-center gap-2 cursor-pointer" >
            <img src={shareIcon} alt="share" className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Share</span>
          </div>
        </div>
        <hr className="" />
        {/* Blog Content */}
        <div className="prose prose-purple max-w-none my-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
        {/* Enjoyed this article */}
        <hr className="my-8" />
        <div className="bg-white rounded-lg shadow-[-1px_0px_10px_-8px_rgba(51,43,57,1)] border border-gray-200 transition-shadow duration-300 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-4">
          <h3 className="text-sm md:text-xl font-bold text-gray-800">
            Enjoyed This Article?
          </h3>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button onClick={handleLike} className="bg-[#FF0000]/20 text-red-500 text-sm px-2 py-1 md:px-4 md:py-2 md:text-lg rounded-md font-semibold flex items-center gap-1"
            >
              Like{' '} {hasLiked ? (<IoMdHeart className="text-red-500" />) : (<IoMdHeartEmpty className="text-red-500" />)}
            </button>
            <button onClick={() => handleShare(blog)} className="bg-purple-100 text-purple-600 text-sm px-2 py-1 md:px-4 md:py-2 md:text-lg rounded-md font-semibold flex items-center gap-1"
            >
              Share <FaShareAlt />
            </button>
          </div>
        </div>
        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow mt-6 py-3 px-2">
          <h3 className="text-sm md:text-lg font-semibold mb-4">Comments ({blog?.comments?.length || 0})</h3>
          {blog?.comments?.map((comment, index) => (
            <div key={index} className="mb-4 border-l-4 border-purple-400 pl-4">
              <p className="text-sm font-semibold text-purple-800">
                {comment?.userId?.name || 'User'}
                <span className="text-gray-500 text-xs ml-2"> {new Date(comment?.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-700 text-xs md:text-sm">{comment?.comment} </p>
            </div>
          ))}
          <div className="mt-4">
            <label className="block text-sm mb-2">Leave a comment</label>
            <textarea rows="3" placeholder="Share your thoughts..." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
            <button onClick={handleComment} disabled={postingComment} className="mt-3 bg-purple-600 text-white px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-lg hover:bg-purple-700 transition"
            >
              {postingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;