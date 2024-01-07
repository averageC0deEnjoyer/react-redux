import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
  //need postId
  const { postId } = useParams();
  // console.log(postId);
  const post = useSelector((store) => selectPostById(store, Number(postId)));
  // console.log(post);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButton post={post} />
    </article>
  );
};

export default SinglePostPage;
