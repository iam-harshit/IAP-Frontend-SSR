import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostHeader from '@/Components/pages/Pods-Page/Post/PostHeader.jsx';
import PostContent from '@/Components/pages/Pods-Page/Post/PostContent.jsx';
import PostActions from '@/Components/pages/Pods-Page/Post/PostActions.jsx';
import CommentInput from '@/Components/pages/Pods-Page/Post/CommentInput.jsx';
import CommentItem from '@/Components/pages/Pods-Page/Post/CommentItem.jsx';


const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const {
    profilePicture,
    userName,
    postedOn,
    postText,
    likes,
    comments,
    media,
    commentsArray,
  } = post;

 function formatDate(postedOn) {
  const now = new Date();
  const postedDate = new Date(postedOn);
  const diffMs = now - postedDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}


  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    console.log('New Comment:', commentInput);
    setCommentInput('');
    setIsCommenting(false); 
  };

  const handlePostReply = (commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText || !replyText.trim()) return;
    console.log(`Replying to comment ${commentId} with:`, replyText);
    setReplyInputs((prev) => {
      const newReplyInputs = { ...prev };
      delete newReplyInputs[commentId];
      return newReplyInputs;
    });
    setReplyingToCommentId(null);
  };

  return (
    <div className="bg-white lg:px-4 p-2 mb-6 mt-2 max-w-3xl md:max-w-full lg:mx-auto">
      <PostHeader
        profilePicture={profilePicture}
        userName={userName}
        postedOn={postedOn}
        formatDate={formatDate}
      />

      <PostContent
        postText={postText}
        media={media}
      />

      <PostActions
        likes={likes}
        comments={comments}
        setShowComments={setShowComments}
        showComments={showComments}
        setIsCommenting={setIsCommenting}
      />

      <hr className="w-full border-t border-[#00000033]" />

      {showComments && (
        <div className="pt-4">
          {currentUser && (
            <CommentInput
              currentUserProfilePicture={currentUser?.profilePicture || profilePicture}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              handlePostComment={handlePostComment}
            />
          )}

          {(showAllComments ? commentsArray : commentsArray?.slice(0, 2)).map(
            (comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserProfilePicture={currentUser?.profilePicture || profilePicture}
                formatDate={formatDate}
                replyingToCommentId={replyingToCommentId}
                setReplyingToCommentId={setReplyingToCommentId}
                replyInputs={replyInputs}
                setReplyInputs={setReplyInputs}
                handlePostReply={handlePostReply}
              />
            )
          )}

          {commentsArray.length > 2 && (
            <p
              className="py-4 text-right font-medium text-[#9273F8] text-sm cursor-pointer hover:underline transition-colors duration-200"
              onClick={() => setShowAllComments((prev) => !prev)}
            >
              {showAllComments
                ? 'Hide Comments'
                : `View All ${commentsArray.length} Comments`}
            </p>
          )}
          <hr className="w-full border-t border-[#00000033] " />
        </div>
      )}
    </div>
  );
};

export default Post;