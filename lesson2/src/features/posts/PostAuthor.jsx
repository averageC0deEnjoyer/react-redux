import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const selectedUser = users.find((user) => user.id === userId);

  return <span> by {selectedUser ? selectedUser.name : 'unknown author'}</span>;
};

export default PostAuthor;
