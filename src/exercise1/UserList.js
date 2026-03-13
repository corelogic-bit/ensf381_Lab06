import UserCard from './UserCard';

function UserList({ users, viewMode }) {
  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div
      className={viewMode === 'grid' ? 'user-grid' : 'user-list'}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
