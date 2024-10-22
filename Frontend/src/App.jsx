import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSelection from './UserSelection';
import ClaimPoints from './ClaimPoints';
import Leaderboard from './LeaderBoard';
import UserPointHistory from './UserPointHistory';
import io from 'socket.io-client';
import './App.css';

const API_URL = 'http://localhost:3000/api';
const socket = io('http://localhost:3000');

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [changedUsers, setChangedUsers] = useState(new Set());
  const [history, setHistory] = useState([]); // State for claim history
  const [loadingHistory, setLoadingHistory] = useState(false); // Loading state for claim history

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchClaimHistory(); // Fetch initial claim history

    socket.on('update-leaderboard', fetchLeaderboard);
    socket.on('update-claim-history', fetchClaimHistory); // Fetch claim history on updates

    return () => {
      socket.off('update-leaderboard');
      socket.off('update-claim-history');
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const fetchClaimHistory = async () => {
    setLoadingHistory(true); // Set loading state
    try {
      const response = await axios.get(`${API_URL}/claim-history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching claim history:', error);
    } finally {
      setLoadingHistory(false); // Reset loading state
    }
  };

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/claim`, { userId: selectedUser });
      setUsers(users.map(user => 
        user._id === selectedUser ? { ...user, totalPoints: response.data.points } : user
      ));
      setChangedUsers(new Set([...changedUsers, selectedUser]));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error claiming points:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    try {
      await axios.post(`${API_URL}/users`, { name: newUserName });
      setNewUserName('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="user-section">
        <h1 className="header">Users</h1>
        <div className="user-selection">
          <UserSelection 
            users={users}
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect} 
          />
          <ClaimPoints 
            onClaimPoints={handleClaimPoints}
            selectedUser={selectedUser}
            loading={loading} 
          />
        </div>
        <form onSubmit={handleAddUser} className="add-user-form">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter new user name"
            className="input-field"
          />
          <button type="submit" className="add-user-button">
            Add User
          </button>
        </form>
      </div>
      <div className="leaderboard-section">
        <Leaderboard users={users} changedUsers={changedUsers} />
      </div>
      <div className="point-history-section">
        <UserPointHistory history={history} loading={loadingHistory} />
      </div>
    </div>
  );
};

export default App;
