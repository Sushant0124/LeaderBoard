// controllers/userController.js
const User = require('../models/User'); // adjust path as necessary
const ClaimHistory = require('../models/ClaimHistory'); // adjust path as necessary

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new user
const addUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Claim random points
const claimPoints = async (req, res, io) => {
  console.log("Entry into ClaimPoints Controller");
  const userId = req.body.userId;
  console.log("Claim Points User ID:", userId);
  const points = Math.floor(Math.random() * 10) + 1;  // Random points between 1-10

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.totalPoints += points;
    console.log("Updated total points:", user.totalPoints);
    await user.save();
    console.log("User data saved");

    // Create claim history
    const claimHistory = new ClaimHistory({
      userId: user._id,
      pointsClaimed: points,
      date: new Date(),  // Track the date of the claim
    });
    await claimHistory.save();
    console.log("Claim History saved");

    // Emit events to update the leaderboard and claim history
    io.emit('update-leaderboard', { userId: user._id, newTotalPoints: user.totalPoints });
    io.emit('update-claim-history'); // Notify clients to refresh claim history
    console.log("Socket events emitted");

    res.json({ points });
  } catch (err) {
    console.error('Error during claim points process:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Claim History
const getClaimHistory = async (req, res) => {
  try {
    // Fetch claim history and populate userId to include user details
    const history = await ClaimHistory.find().populate('userId', 'name'); // Populate only the 'name' field to reduce data
    res.json(history);
  } catch (err) {
    // Handle any errors that occur during the fetch
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getClaimHistory
};
