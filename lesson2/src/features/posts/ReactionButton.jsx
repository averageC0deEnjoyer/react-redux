import { useDispatch, useSelector } from 'react-redux';
import { reactionAdded, selectAllPosts } from './postsSlice';

const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();
  const reactionEmojis = {
    thumbsUp: '🪣',
    wow: '🆚',
    heart: '🀄',
    rocket: '🇦🇷',
    coffee: '💸',
  };

  const emojiProcessed = Object.entries(post.reactions).map(([key, value]) => (
    <span key={key}>
      <span>{value}</span>
      <button
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: key }))
        }
      >
        {reactionEmojis[key]}
      </button>
    </span>
  ));

  return (
    <>
      <div>{emojiProcessed}</div>
    </>
  );
};

export default ReactionButton;
