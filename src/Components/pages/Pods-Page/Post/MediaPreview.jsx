import React from 'react';
import { IoMdClose } from 'react-icons/io';

const MediaPreview = ({ selectedMedia, removeMedia }) => {
  if (selectedMedia.length === 0) return null;

  return (
    <div className="mt-20">
      {selectedMedia.length === 1 ? (
        <div className="relative">
          <img
            src={selectedMedia[0].src}
            alt="Preview"
            className="w-full max-h-[300px] rounded-xl border border-purple-200 shadow-md"
          />
          <button
            onClick={() => removeMedia(0)}
            className="absolute top-2 right-2 bg-black bg-opacity-40 text-white rounded-full p-1.5 hover:bg-opacity-70 transition-all"
          >
            <IoMdClose size={20} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {selectedMedia.map((media, index) => (
            <div key={index} className="relative">
              <img
                src={media.src}
                alt={`Preview ${index + 1}`}
                className="w-full h-48 object-cover rounded-xl border border-purple-200 shadow-md"
              />
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-2 right-2 bg-black bg-opacity-40 text-white rounded-full p-1.5 hover:bg-opacity-70 transition-all"
              >
                <IoMdClose size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaPreview;
