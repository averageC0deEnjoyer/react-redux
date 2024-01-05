import { useSelector } from 'react-redux';

import { selectAllPosts } from './postsSlice';

import PostAuthor from './PostAuthor';

import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = sortedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButton post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
