// UserPointHistory.js
import React from 'react';
import './UserPointHistory.css';

const UserPointHistory = ({ history }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date'; // Fallback if the date is not valid
    }
    return date.toLocaleString(); // Format date and time
  };

  return (
    <div className="point-history-container">
      <h2 className="point-history-header">User Point History</h2>
      <table className="point-history-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Points Claimed</th>
            <th>Claimed At</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id} className="point-history-item">
              <td>{item.userId.name}</td> {/* Assuming userId is populated with user data */}
              <td>{item.pointsClaimed}</td>
              <td>{formatDate(item.claimedAt)}</td> {/* Use formatDate function to display formatted date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPointHistory;
