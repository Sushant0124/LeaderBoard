import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (name) => axios.post(`${API_URL}/users`, { name });
export const claimPoints = (userId) => axios.post(`${API_URL}/claim`, { userIds });
export const getLeaderboard = () => axios.get(`${API_URL}/leaderboard`);
export const getClaimHistory = () => axios.get(`${API_URL}/claim-history`);
