import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from './postsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  let content;

  if (postsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    //we copy and order the post

    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    //then we render
    console.log(orderedPosts);
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
