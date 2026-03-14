import { useState, useEffect } from 'react';
import Controls from './Controls';
import UserList from './UserList';

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://69a1dd8c2e82ee536fa2692e.mockapi.io/users_api');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  function handleDeleteClick(userId) {
    fetch(`https://69a1dd8c2e82ee536fa2692e.mockapi.io/users_api/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => String(user.id) !== String(userId)));
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  }

  function handleSortByGroupClick() {
    const sorted = [...users].sort((a, b) => a.user_group - b.user_group);
    setUsers(sorted);
    setSortBy('group');
  }

  function handleSortByIdClick() {
    const sorted = [...users].sort((a, b) => Number(a.id) - Number(b.id));
    setUsers(sorted);
    setSortBy('id');
  }

  function handleViewToggleClick() {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;