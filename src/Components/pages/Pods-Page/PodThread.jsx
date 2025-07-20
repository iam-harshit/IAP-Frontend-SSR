import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostInputModal from './Post/PostInputModal.jsx';
import podThread from '@/Constants/podThread.js';
import Post from './Post.jsx';
import pods from '@/Constants/pods.js';
const PodThread = () => {
  const { podName } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);
  const pod = pods.find((p) => p.key === podName) || {};
  const filteredPosts = useMemo(() => {
    return podThread.filter((post) => post.podCategory === pod.label);
  }, [pod.label]);

  useEffect(() => {
    if (isClicked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isClicked]);

  return (
    <div className="w-full lg:w-[65%] lg:m-10 lg:border-l lg:border-r lg:border-b lg:border-[#00000033] lg:rounded-t-lg lg:rounded-b-lg bg-white">
      {/* Pod Banner */}
      <div className="relative">
        {pod.banner && (
          <div className="relative w-full aspect-[2/1] md:aspect-[3/1]  ">
            <img
              src={pod.banner}
              alt={`${pod.label} Pod Banner`}
              className="absolute inset-0 w-full h-full object-cover lg:rounded-t-lg"
            />
          </div>
        )}

        <div className="bg-black/40 w-full py-2 absolute flex items-start bottom-0 gap-x-3 lg:gap-x-4 lg:px-4 pl-2 ">
          {pod.logo && (
            <img
              src={pod.logo}
              alt={`${pod.label} Pod Logo`}
              className="w-12 h-12 lg:w-[50px] lg:h-[50px]"
            />
          )}

          <div className="flex flex-col">
            <h2 className="text-h5 md:text-h4 text-white">{pod.label} POD</h2>
            {pod.description && (
              <p className="text-white font-normal text-sm lg:text-lg">{pod.description}</p>
            )}
          </div>
        </div>
      </div>
      {/* Pod thread */}

      {currentUser && (
        <div className="flex items-center gap-x-3 px-2 lg:px-4 py-6 w-full">
          <div
            className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center rounded-full text-white font-semibold text-sm uppercase"
            style={{
              backgroundColor: currentUser?.profilePictureURL
                ? 'transparent'
                : '',
            }}
          >
            {currentUser?.profilePictureURL ? (
              <div className="w-10 lg:w-12 h-10 lg:h-12">
                <img
                  src={currentUser.profilePictureURL}
                  alt="profile"
                  onError={(e) => (e.target.style.display = 'none')}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div
                className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center rounded-full text-white font-semibold text-lg uppercase"
                style={{ backgroundColor: '#9273F8' }}
              >
                {currentUser?.userName?.charAt(0) || '?'}
              </div>
            )}
          </div>
          <div
            className="bg-[#F2EEFF]
 w-[85%] l-md:w-[90%] md:w-[100%] rounded-[10px] p-3 lg:p-4   flex justify-between items-center"
          >
            <input
              type="text"
              placeholder="Start Posting...."
              className="placeholder-black placeholder:text-sm placeholder:font-semibold  bg-transparent w-[50%] text-black border-none outline-none"
              onClick={() => setIsClicked(true)}
            />
            <button
              onClick={() => setIsClicked(true)}
              className="rounded-lg  bg-[#9273F8] text-white px-4 py-1 text-[11px] font-bold hover:bg-[#7d61f2] transition-all duration-200"
            >
              CREATE POST
            </button>
          </div>
        </div>
      )}
      <hr className="w-full border-t border-[#00000033]" />

      {isClicked && (
        <PostInputModal
          isOpen={isClicked}
          setIsOpen={setIsClicked}
          heading="Create a Post"
          buttonLabel="POST"
          showImageOption={true}
          onSubmit={(data) => console.log('Post:', data)}
        />
      )}

      {/* Render posts */}

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <Post
            key={post.id}
            post={post}
            isLast={index === filteredPosts.length - 1}
          />
        ))
      ) : (
        <div className="text-center py-6 text-gray-500 font-medium">
          No posts in this pod yet.
        </div>
      )}
    </div>
  );
};

export default PodThread;
