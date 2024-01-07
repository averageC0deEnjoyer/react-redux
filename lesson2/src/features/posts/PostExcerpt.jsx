import React from 'react';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

import { Link } from 'react-router-dom';

const PostExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 75)}</p>
      <Link to={`post/${post.id}`}>View Post</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButton post={post} />
    </article>
  );
};

export default PostExcerpt;
