import React from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiInput = ({ onEmojiClick, isSmallScreen }) => {
  return (
    <div
      className={`absolute z-50 ${
        isSmallScreen
          ? 'bottom-14 left-4 right-4 mx-auto'
          : 'bottom-14 left-6'
      } bg-white shadow-lg rounded-xl border border-gray-200`}
      style={{
        width: isSmallScreen ? '90vw' : '300px',
        maxHeight: isSmallScreen ? '250px' : '300px',
        overflowY: 'auto',
      }}
    >
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        emojiStyle="native"
        width="100%"
        lazyLoadEmojis={true}
        previewConfig={{ showPreview: false }}
        skinTonesDisabled={true}
        searchDisabled={true}
      />
    </div>
  );
};

export default EmojiInput;