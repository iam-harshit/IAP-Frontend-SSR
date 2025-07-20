
import React, { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostActions = ({ likes, comments, setShowComments, showComments, setIsCommenting }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
const handleLikeClick = () => {
    if (!currentUser) {
      navigate('/sign-in');
    } else {
      setLiked((prev) => !prev);
    }
  };
  return (
    <div className="flex items-center justify-between mb-4 ml-[50px] lg:ml-[60px]">
      <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
        <div
          className="cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          {comments} Comments
        </div>
        <div>{likes} Likes</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="group">
          {/* <svg
            onClick={() => setLiked(!liked)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={liked ? '#ef4444' : 'none'}
            stroke={liked ? '#ef4444' : 'currentColor'}
            strokeWidth="2"
            className={`w-[18px] h-[18px] lg:w-6 lg:h-6 cursor-pointer transition-all duration-300 ease-in-out group-hover:stroke-[#ef4444]`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 7.5c0-2.9-2.35-5.25-5.25-5.25-1.7 0-3.2.83-4.2 2.1a5.25 5.25 0 00-4.2-2.1C4.6 2.25 2.25 4.6 2.25 7.5c0 6.38 9.75 13.5 9.75 13.5s9.75-7.12 9.75-13.5z"
            />
          </svg> */}
           <svg
        onClick={handleLikeClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? '#ef4444' : 'none'}
        stroke={liked ? '#ef4444' : 'currentColor'}
        strokeWidth="2"
        className={`w-[18px] h-[18px] lg:w-6 lg:h-6 cursor-pointer transition-all duration-300 ease-in-out ${currentUser ? 'group-hover:stroke-[#ef4444]' : ''}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 7.5c0-2.9-2.35-5.25-5.25-5.25-1.7 0-3.2.83-4.2 2.1a5.25 5.25 0 00-4.2-2.1C4.6 2.25 2.25 4.6 2.25 7.5c0 6.38 9.75 13.5 9.75 13.5s9.75-7.12 9.75-13.5z"
        />
      </svg>
        </div>

        <div className="group" onClick={() => setShowComments(!showComments)}>
          <FaRegComment
            className={`md:hidden w-[20px] h-[20px] cursor-pointer text-gray-700 transition-colors duration-200 group-hover:text-[#9273F8] ${
              showComments ? 'text-[#9273F8]' : ''
            }`}
          />
          <button
            onClick={() => setIsCommenting(true)}
            className="hidden md:block rounded-lg bg-[#9273F8] text-white px-4 py-1 text-[11px] font-bold hover:bg-[#7d61f2] transition-all duration-200"
          >
            COMMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostActions;