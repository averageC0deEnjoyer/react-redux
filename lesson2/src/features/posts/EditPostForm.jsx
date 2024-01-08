//for local state
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  //select post
  const post = useSelector((store) => selectPostById(store, Number(postId)));
  //for dropdown
  const users = useSelector(selectAllUsers);

  //save to local state
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle('');
        setContent('');
        setUserId('');

        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('failed to save post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  //to populate the dropdown
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  if (!post) {
    return (
      <section>
        <h2>No Post Found!</h2>;
      </section>
    );
  }

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending');
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (err) {
      console.error('Failed to delete the post', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Post Author:</label>
        <select
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
