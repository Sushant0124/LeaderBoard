// Leaderboard.js
import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ users, changedUsers }) => {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-header">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr 
              key={user._id}
              style={{
                color: changedUsers.has(user._id) ? 'red' : 'black', // Change color if points changed
                fontWeight: changedUsers.has(user._id) ? 'bold' : 'normal', // Bold if points changed
              }}
            >
              <td>{index + 1}</td> {/* Rank based on index */}
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
