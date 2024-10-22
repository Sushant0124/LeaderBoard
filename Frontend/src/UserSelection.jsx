// UserSelection.js
import React from 'react';
import './UserSelection.css';

const UserSelection = ({ users, selectedUser, onUserSelect }) => {
  return (
    <div className="user-selection-container">
      <h2>Select User</h2>
      <select value={selectedUser} onChange={onUserSelect} className="user-selection-dropdown">
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelection;
