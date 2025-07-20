import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { FaRegImage } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/Components/pages/Pods-Page/Pods.css'
import MediaPreview from './MediaPreview';
import EmojiInput from './EmojiInput';

const PostInputModal = ({
  isOpen,
  setIsOpen,
  heading = 'Create a Post',
  buttonLabel = 'CREATE POST',
  showImageOption = true,
  onSubmit,
}) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const MAX_IMAGES = 4;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleEmojiSelect = (emojiData) => {
    const emoji = emojiData.emoji;
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    if (range) {
      quill.insertText(range.index, emoji);
      quill.setSelection(range.index + emoji.length);
    }
    setShowEmojiPicker(false);
  };

  const handleImageClick = () => fileInputRef.current?.click();

 const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const currentCount = selectedMedia.length;
  const availableSlots = MAX_IMAGES - currentCount;

  if (files.length === 0 || availableSlots === 0) {
    e.target.value = null;
    return;
  }

  const filesToProcess = files.slice(0, availableSlots);

  const newMediaDataPromises = filesToProcess.map((file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) return resolve(null); // ❌ skip non-image files
      const objectURL = URL.createObjectURL(file);
      resolve({ type: 'image', src: objectURL, file });
    });
  });

  Promise.all(newMediaDataPromises)
    .then((results) => {
      const validResults = results.filter((item) => item !== null);
      if (validResults.length > 0) {
        setSelectedMedia((prev) => [...prev, ...validResults]);
      }
    })
    .catch((error) => {
      console.error('Error processing files:', error);
    })
    .finally(() => {
      e.target.value = null;
    });
};


  const removeMedia = (indexToRemove) => {
    setSelectedMedia((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const isContentEmpty =
    !text || text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

  const handleSubmit = () => {
    if (isContentEmpty && selectedMedia.length === 0) {
      return;
    }
    onSubmit?.({ text: text.trim(), media: selectedMedia });
    setText('');
    setSelectedMedia([]);
    setShowEmojiPicker(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 pt-20 z-40 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-[95%] sm:w-[55%] max-w-lg bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl px-6 py-5 border border-purple-100 animate-slideUp flex flex-col max-h-[70vh]">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200 text-2xl"
          title="Close"
        >
          <IoMdClose />
        </button>

        <label className="text-[#7248F9] text-lg font-semibold block mb-2 ml-[2px]">
          {heading}
        </label>

        <div className="overflow-y-auto   flex-grow pr-1 ">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={text}
            onChange={setText}
            style={{ height: '200px', marginBottom: '70px', }}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['code-block'],
                ['link'],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'strike',
              'list',
              'bullet',
              'code-block',
              'link',
            ]}
          />
          <MediaPreview
            selectedMedia={selectedMedia}
            removeMedia={removeMedia}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="flex items-center justify-between mt-2 md:pt-2">
          <div className="flex items-center gap-4 text-gray-500">
            <button
              type="button"
              title="Add Emoji"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-3xl hover:text-[#9273F8] transition-colors duration-200"
            >
              <MdOutlineEmojiEmotions className="text-[25px]" />
            </button>

            {showImageOption && selectedMedia.length < MAX_IMAGES && (
              <button
                type="button"
                title="Add Image"
                onClick={handleImageClick}
                className="hover:text-gray-800 text-gray-500 transition"
              >
                <FaRegImage className="text-[25px]" />
              </button>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isContentEmpty && selectedMedia.length === 0}
            className={`${
              isContentEmpty && selectedMedia.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#9273F8] hover:bg-[#7d61f2] text-white'
            } text-xs font-bold py-2 px-5 rounded-full transition-all duration-200`}
          >
            {buttonLabel}
          </button>
        </div>

        {showEmojiPicker && (
          <EmojiInput
            onEmojiClick={handleEmojiSelect}
            isSmallScreen={isSmallScreen}
          />
        )}
      </div>
    </div>
  );
};

export default PostInputModal;
