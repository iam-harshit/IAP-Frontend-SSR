import React, { useState, useRef } from 'react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { IoMdClose } from 'react-icons/io';

const CommentItem = ({
  comment,
  currentUserProfilePicture,
  formatDate,
  replyingToCommentId,
  setReplyingToCommentId,
  replyInputs,
  setReplyInputs,
  handlePostReply,
}) => {
  const [commentLiked, setCommentLiked] = useState({});
  const [commentMenuId, setCommentMenuId] = useState(null);
  const [showFullComment, setShowFullComment] = useState(false);
  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState({});
  const replyTextRefs = useRef({});
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const COMMENT_TEXT_LIMIT = 100;
  const isCommentLong = comment.commentText.length > COMMENT_TEXT_LIMIT;

  const displayedCommentText =
    isCommentLong && !showFullComment
      ? comment.commentText.slice(0, COMMENT_TEXT_LIMIT) + '...'
      : comment.commentText;

  return (
    <>
      <div
        key={comment.id}
        className="relative flex items-start gap-3 mb-3 mt-4  lg:ml-[60px]"
      >
        {/* Comment Menu */}
        <div className="absolute right-0 top-1">
          <button
            onClick={() =>
              setCommentMenuId((prev) =>
                prev === comment.id ? null : comment.id
              )
            }
            className="text-gray-500 hover:text-black p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-5 h-5"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>

          {commentMenuId === comment.id && (
            <div className="absolute right-0 mt-0 w-36 bg-white border rounded shadow-md z-50">
              <button
                onClick={() => {
                  alert(`Reported comment by ${comment.userName}`);
                  setCommentMenuId(null);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-600"
                >
                  <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
                </svg>
                Report
              </button>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <img
          src={comment.profilePicture}
          alt={`${comment.userName} profile`}
          className="w-10 h-10 rounded-full object-cover mt-1"
        />

        {/* Comment Content */}
        <div className="mt-1 flex-1">
          <p className="text-md font-bold lg:text-h4">{comment.userName}</p>
          <p className="text-gray-500 text-sm">
            {formatDate(comment.commentedOn)}.
          </p>
          <p className="text-[14px] md:text-body font-normal mb-1 whitespace-pre-line">
            {displayedCommentText}
            {isCommentLong && (
              <button
                onClick={() => setShowFullComment((prev) => !prev)}
                className="text-[#9273F8] hover:underline font-medium ml-1 text-sm"
              >
                {showFullComment ? 'Show Less' : 'Show More'}
              </button>
            )}
          </p>

          {/* Like / Reply */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-gray-700 font-normal text-xs">
              <span
                className="flex items-center cursor-pointer"
                onClick={() => {
                  if (!currentUser) {
                    navigate('/sign-in');
                  } else {
                    setCommentLiked((prev) => ({
                      ...prev,
                      [comment.id]: !prev[comment.id],
                    }));
                  }
                }}
              >
                <span className="text-sm font-medium pr-2">Like</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={commentLiked[comment.id] ? '#ef4444' : 'none'}
                  stroke="#ef4444"
                  strokeWidth="2"
                  className="w-4 h-4 transition-all duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 7.5c0-2.9-2.35-5.25-5.25-5.25-1.7 0-3.2.83-4.2 2.1a5.25 5.25 0 00-4.2-2.1C4.6 2.25 2.25 4.6 2.25 7.5c0 6.38 9.75 13.5 9.75 13.5s9.75-7.12 9.75-13.5z"
                  />
                </svg>
                <span className="text-sm font-medium pl-1">
                  {comment.likes}
                </span>
              </span>
              |
              <span
                className="flex items-center gap-1 text-sm font-medium cursor-pointer"
                onClick={() => {
                  if (!currentUser) {
                    navigate('/sign-in');
                  } else {
                    setReplyingToCommentId((prev) =>
                      prev === comment.id ? null : comment.id
                    );
                  }
                }}
              >
                <span>Reply</span>
                <span>{comment.comments}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Input BELOW Comment */}
      {currentUser && replyingToCommentId === comment.id && (
        <div className="my-3 sm:ml-[50px] lg:ml-[60px] flex gap-3 relative">
          <img
            src={currentUserProfilePicture}
            alt="Your profile"
            className="w-10 sm:w-8 sm:h-8 h-10 rounded-full object-cover mt-1"
          />

          <div className="relative border border-gray-300 rounded-lg w-full p-2">
            <textarea
              ref={(el) => (replyTextRefs.current[comment.id] = el)}
              placeholder={`@${comment.userName} `}
              className="placeholder:text-[#9273F8] bg-transparent text-black border-none outline-none w-full pr-[10px] resize-none"
              value={replyInputs[comment.id] || ''}
              onChange={(e) => {
                const inputValue = e.target.value;
                const mention = `@${comment.userName} `;
                setReplyInputs((prev) => ({
                  ...prev,
                  [comment.id]: inputValue.startsWith(mention)
                    ? inputValue
                    : mention + inputValue,
                }));
              }}
              rows={1}
            />

            <div
              className={`flex items-center gap-2 ${
                replyInputs[comment.id]?.trim() &&
                replyInputs[comment.id].trim() !== `@${comment.userName}`
                  ? 'justify-end static mt-2'
                  : 'absolute top-2 right-3'
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setShowReplyEmojiPicker((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }
                className="text-xl text-gray-700 hover:scale-105 transition"
              >
                <MdOutlineEmojiEmotions className="text-[25px]" />
              </button>

              {replyInputs[comment.id]?.trim() &&
                replyInputs[comment.id].trim() !== `@${comment.userName}` && (
                  <button
                    onClick={() => handlePostReply(comment.id)}
                    className="rounded-lg bg-[#9273F8] text-white px-3 py-1 text-xs font-bold hover:bg-[#7d61f2] transition-all duration-200"
                  >
                    REPLY
                  </button>
                )}
            </div>

            {/* Emoji Picker */}
            {showReplyEmojiPicker[comment.id] && (
              <div className="absolute z-50 bottom-12 right-2 sm:right-4 sm:bottom-[44px] sm:left-auto  bg-white rounded-xl shadow-xl border p-2 w-fit">
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      setShowReplyEmojiPicker((prev) => ({
                        ...prev,
                        [comment.id]: false,
                      }))
                    }
                    className="text-gray-400 hover:text-gray-700 mb-1"
                  >
                    <IoMdClose />
                  </button>
                </div>
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    const textarea = replyTextRefs.current[comment.id];
                    const emoji = emojiData.emoji;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const currentText = replyInputs[comment.id] || '';
                    const newText =
                      currentText.substring(0, start) +
                      emoji +
                      currentText.substring(end);
                    setReplyInputs((prev) => ({
                      ...prev,
                      [comment.id]: newText,
                    }));
                    setTimeout(() => {
                      textarea.setSelectionRange(
                        start + emoji.length,
                        start + emoji.length
                      );
                      textarea.focus();
                    }, 0);
                    setShowReplyEmojiPicker((prev) => ({
                      ...prev,
                      [comment.id]: false,
                    }));
                  }}
                  emojiStyle="native"
                  height={300}
                  width={260}
                  previewConfig={{ showPreview: false }}
                  searchDisabled
                  skinTonesDisabled
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
