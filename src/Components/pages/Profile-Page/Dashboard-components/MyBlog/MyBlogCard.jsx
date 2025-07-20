/* eslint-disable react/prop-types */
import { FiEdit } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import tag_icon from "@/assets/blogs/tag_icon.svg";
import msg from "@/assets/blogs/msg.svg";
import DOMPurify from "dompurify";
import calender from "@/assets/blogs/calender.svg";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const truncateTitle = (title) => {
    const words = title?.split(' ');
    if (words?.length > 4) return words.slice(0, 4).join(' ') + '...';
    return title;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl lg:rounded-2xl border border-gray-200 shadow-[0_4px_20px_-2px_rgba(147,51,234,0.3)] hover:shadow-[0_10px_40px_-5px_rgba(147,51,234,0.5)] hover:-translate-y-1  transform-gpu  transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white cursor-pointer" onClick={() => navigate(`/blogs/${blog?._id}`)}
    >
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center text-xs text-gray-500 gap-2 xs:gap-0">
          <div className="flex items-center gap-1">
            🕒 <span>{blog?.avgTime ? `${blog?.avgTime} min read` : "2 min read"}</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {blog?.tags?.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="bg-[#f3f1f5] text-[#B880F0] font-bold px-2 py-1 rounded-full flex items-center gap-1 text-[10px]"
              >
                <img src={tag_icon} className="w-3 h-3" alt="tag" /> {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-snug text-balance line-clamp-2"
          title={truncateTitle(blog?.title)}
        >
          {truncateTitle(blog?.title)}
        </h3>
        <div className="text-xs sm:text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.content) }}
        />
      </div>
      <div className="mt-3 sm:mt-4 pt-3 ">
        <div className="flex justify-start items-center text-xs sm:text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <img src={calender} className="w-3 h-3 sm:w-4 sm:h-4" alt="calendar" />
            <span>{formatDate(blog?.createdAt)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="flex gap-1 items-center">
              <IoMdHeartEmpty className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200" />
              <span>{blog?.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={msg} className="w-3 h-3 sm:w-4 sm:h-4" alt="comments" />
              <span>{blog?.comments?.length || 0}</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <button onClick={(e) => { e.stopPropagation(); onEdit(blog) }} className="flex gap-1 items-center  hover:text-blue-600" aria-label="Edit blog"
            >
              <FiEdit className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200" />
              <span className="sr-only sm:not-sr-only sm:text-sm">Edit</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(blog._id) }} className="flex items-center gap-1 hover:text-red-600" aria-label="Delete blog"
            >
              <RiDeleteBin6Line className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200" />
              <span className="sr-only sm:not-sr-only sm:text-sm">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;