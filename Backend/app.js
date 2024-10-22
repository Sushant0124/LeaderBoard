const { Server } = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const userRoutes = require('./routes/UserRoutes'); 
require('dotenv').config(); // Load environment variables

const app = express();
const server = http.createServer(app);

// Set up Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin (your React frontend)
    methods: ["GET", "POST"], // Allowed methods for Socket.io
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true // Whether credentials (cookies, etc.) should be sent
  }
});

// Set the io instance on the Express app
app.set('io', io);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}));
app.use(express.json());
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// Real-time ranking updates with Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
