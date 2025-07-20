
import React, { useState, useRef } from 'react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';
import { IoMdClose } from 'react-icons/io';

const CommentInput = ({
  currentUserProfilePicture,
  commentInput,
  setCommentInput,
  handlePostComment,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      commentInput.substring(0, start) + emoji + commentInput.substring(end);
    setCommentInput(newText);

    setTimeout(() => {
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      textarea.focus();
    }, 0);

   
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex items-start gap-3 mb-4 relative">
      <img
        src={currentUserProfilePicture}
        alt="Your profile"
        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
      />

      <div className="relative border border-gray-300 rounded-lg w-full p-2">
        <textarea
          ref={textareaRef}
          placeholder="Comment Here...."
          className="placeholder-black bg-transparent text-black border-none outline-none w-full pr-[10px] resize-none"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          rows={1}
        />

        {/* Buttons */}
        <div
          className={`flex items-center gap-2 ${
            commentInput
              ? 'justify-end static'
              : 'absolute top-2 right-3 justify-end'
          }`}
        >
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-xl text-gray-700 hover:scale-105 transition"
          >
            <MdOutlineEmojiEmotions className="text-[25px]" />
          </button>

          {commentInput.trim() !== '' && (
            <button
              onClick={handlePostComment}
              className="rounded-lg bg-[#9273F8] text-white px-3 py-1 text-xs font-bold hover:bg-[#7d61f2] transition-all duration-200"
            >
              COMMENT
            </button>
          )}
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute z-50 bottom-12 right-2 sm:right-4 sm:bottom-[44px] bg-white rounded-xl shadow-xl border p-2">
            <div className="flex justify-end">
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <IoMdClose />
              </button>
            </div>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
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
  );
};

export default CommentInput;

