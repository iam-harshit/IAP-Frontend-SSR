/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import tag_icon from "@/assets/blogs/tag_icon.svg";
import msg from "@/assets/blogs/msg.svg";
import share from "@/assets/blogs/share.svg";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdDateRange } from "react-icons/md";


const BlogCard = ({ article, onLike }) => {
  if (!article || !article.userId) return null;    // Early return if article or userId is null
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [isLiking, setIsLiking] = useState(false);
  const isLiked = currentUser && article?.likes?.includes(currentUser?._id); // Check if current user has liked article

  const truncateTitle = (title) => {
    const words = title?.split(' ');
    if (words?.length > 8) return words.slice(0,8).join(' ') + '...';
    return title;
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!onLike) return;
    if (!currentUser) {
      toast.error("Please login to like");
      return;
    }
    setIsLiking(true);
    try {
      await onLike(article._id, currentUser._id);
    } catch (error) {
      toast.error(error.message || "Failed to like blog");
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = useCallback((e) => {
    e.stopPropagation();
    if (!article?._id) {
      toast.error("Cannot share this blog");
      return;
    }
    const url = `${window.location.origin}/blogs/${article._id}`;
    if (navigator.share) {
      navigator.share({
        title: article?.title || "Check out this blog",
        text: "Check out this blog on Inspiration!",
        url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  }, [article]);

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl lg:rounded-2xl border border-gray-200 shadow-[0_4px_20px_-2px_rgba(147,51,234,0.3)] hover:shadow-[0_10px_40px_-5px_rgba(147,51,234,0.5)] hover:-translate-y-1  transform-gpu  transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white cursor-pointer" onClick={() => navigate(`/blogs/${article._id}`)}
    >
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex justify-between items-start text-xs text-gray-500">
          <div className="flex items-center gap-1">
            🕒 <span>{article?.avgTime ? `${article?.avgTime} min read` : "2 min read"}</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {article?.tags?.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="bg-[#f3f1f5] text-[#B880F0] font-bold px-2 py-1 rounded-full flex items-center gap-1 text-[10px]"
              >
                <img src={tag_icon} className="w-3 h-3" alt="tag" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug text-balance">
          {truncateTitle(article?.title)}
        </h3>
        <div className="text-sm text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article?.content) }}
        />
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d0bee1] flex items-center justify-center">
              <p className="text-sm md:text-base text-[#8b35e1] font-bold">
                {article?.userId?.name?.split(" ").map((n) => n[0]).join("")}
              </p>
            </div>
            <span className="text-gray-800 font-medium">
              {article?.userId?.name?.length > 13 ? `${article?.userId.name.substring(0, 13)}...` : article?.userId?.name}
            </span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <MdDateRange className="w-4 h-4" />
            <span>{article?.createdAt?.slice(0, 10)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike} disabled={isLiking}>
              {isLiked ? (<IoMdHeart className="w-5 h-5 text-red-500 transition-colors duration-200" />) : (
                <IoMdHeartEmpty className="w-5 h-5 transition-colors duration-200" />
              )}
              <span className={isLiked ? "text-red-500 font-md" : "text-gray-500"}>
                {article?.likes?.length || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <img src={msg} className="w-4 h-4" alt="comments" />
              <span>{article?.comments?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleShare} >
              <img src={share} className="w-4 h-4" alt="share" />
            </div>
          </div>
          <span className="text-purple-600 font-medium hover:underline" onClick={(e) => { e.stopPropagation(); navigate(`/blogs/${article?._id}`) }}
          >
            Read More →
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;