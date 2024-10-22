// routes/userRoutes.js
const express = require('express');
const { getAllUsers, addUser, claimPoints, getLeaderboard, getClaimHistory } = require('../controllers/UserController.js');
const router = express.Router();

// Get all users
router.get('/users', getAllUsers);

// Add a new user
router.post('/users', addUser);

// Claim random points
router.post('/claim', (req, res) => claimPoints(req, res, req.app.get('io')));

// Get Leaderboard
router.get('/leaderboard', getLeaderboard);

// Get Claim History
router.get('/claim-history', getClaimHistory);

module.exports = router;
