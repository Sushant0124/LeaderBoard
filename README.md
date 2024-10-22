# **Leaderboard Application**

This is a **Leaderboard Application** built using **React** on the frontend, **Node.js** with **Express** on the backend, and **MongoDB** for storing user data. The application uses **Socket.io** for real-time updates, ensuring that changes to the leaderboard are reflected across all connected clients instantly.

## **Features**
- **User Selection**: Users can select a single user from a dropdown.
- **Claim Points**: A button allows the user to claim random points (1 to 10) for the selected user.
- **Leaderboard**: Displays the current rankings of users based on their total points, which updates in real-time using **Socket.io**.
- **Add User**: Allows new users to be added to the database.
- **Real-time Updates**: Uses **Socket.io** to notify all connected clients about leaderboard changes.

## **Technologies Used**
- **Frontend**: React, Axios, Socket.io-client
- **Backend**: Node.js, Express, Socket.io, Mongoose (MongoDB)
- **Database**: MongoDB

## **Prerequisites**
Make sure you have the following installed on your system:
- **Node.js** (version 14 or higher)
- **MongoDB** (local or remote)
- **npm** (Node package manager)

## **Installation**

### 1. Clone the repository

```bash
git clone https://github.com/Sushant0124/LeaderBoard
cd leaderboard-app
```

### 2. Install dependencies for both backend and frontend

#### **Backend (Node.js/Express)**

Navigate to the `backend` directory and install the required packages:

```bash
cd backend
npm install
```

#### **Frontend (React)**

Navigate to the `frontend` directory and install the required packages:

```bash
cd ../frontend
npm install
```

### 3. Set up environment variables

In the `backend` directory, create a `.env` file to store your environment variables. It should look something like this:

```bash
# MongoDB connection URI
MONGODB_URI=mongodb://localhost:27017/leaderboard

# Port on which the backend will run
PORT=3000
```

Replace `mongodb://localhost:27017/leaderboard` with your actual MongoDB connection string if using a remote MongoDB instance.

### 4. Start MongoDB (if running locally)

If you’re using MongoDB locally, ensure that it is running:

```bash
mongod
```

### 5. Running the Backend Server

Once you've installed all the dependencies and MongoDB is running, you can start the backend server:

```bash
cd backend
npm start
```

This will start the **Express** backend server on `http://localhost:3000`.

### 6. Running the Frontend

In a new terminal, navigate to the `frontend` directory and start the React app:

```bash
cd frontend
npm start
```

This will start the frontend server on `http://localhost:5173`.

### 7. Testing the Application

- Open your browser and go to `http://localhost:5173`.
- Select a user from the dropdown and click **Claim Points** to award random points.
- Check the leaderboard to see the updated ranking. This will update automatically for all clients connected to the server.
- You can also add a new user using the **Add User** form.

## **Project Structure**

```
.
├── backend/
│   ├── controllers/           # Contains the business logic (user, claim points)
│   ├── models/                # Mongoose models (User, ClaimHistory)
│   ├── routes/                # API routes (user-related endpoints)
│   ├── socket.js              # Socket.io setup and logic
│   └── index.js               # Main entry point for the Express server
├── frontend/
│   ├── src/
│   │   ├── components/        # React components (UserSelection, ClaimPoints, Leaderboard)
│   │   └── App.js             # Main component that brings everything together
│   ├── public/                # Public assets
│   └── App.css                # Styling for the app
└── README.md                  # Instructions and documentation for the project
```

### **Backend Endpoints**

| Method | Endpoint      | Description                    |
|--------|---------------|--------------------------------|
| GET    | `/api/users`   | Fetches all users              |
| POST   | `/api/users`   | Adds a new user                |
| POST   | `/api/claim-history`   | Claims random points for a user|
| GET    | `/api/leaderboard` | Fetches users sorted by points |

### **Key Backend Files**

- **`controllers/userController.js`**: Handles fetching users, adding users, claiming points, and managing leaderboard.
- **`socket.js`**: Manages real-time connections and events with **Socket.io**.
- **`models/User.js`**: Mongoose schema for user data.
- **`models/ClaimHistory.js`**: Mongoose schema for tracking claim history.

### **Frontend Components**

- **`App.js`**: Main component that manages user selection, claiming points, and rendering the leaderboard.
- **`UserSelection.js`**: Dropdown for selecting users.
- **`ClaimPoints.js`**: Button to claim random points.
- **`Leaderboard.js`**: Displays the leaderboard in real-time.

## **How It Works**

1. **User Selection**: Users can be selected from a dropdown. The selected user ID is passed to the backend when points are claimed.
2. **Claim Points**: Random points (between 1 to 10) are awarded to the selected user when the "Claim Points" button is clicked.
3. **Real-time Leaderboard**: The backend uses **Socket.io** to broadcast leaderboard changes to all connected clients. When points are claimed, the leaderboard updates in real-time.
4. **Add New Users**: Users can be added using the input form, and the user list is updated immediately.

## **Troubleshooting**

### Common Issues:

1. **MongoDB Connection Error**: 
   - Ensure MongoDB is running locally, or verify that your MongoDB URI in the `.env` file is correct.

2. **CORS Errors**: 
   - Make sure that the backend is allowing requests from `http://localhost:5173` by configuring CORS properly.

3. **500 Internal Server Error when Claiming Points**: 
   - Check the backend logs to see if the `userId` being passed from the frontend is correct.
   - Ensure MongoDB is connected and the `User` collection is populated.

### Logs:
- **Backend**: All errors and server activity will be logged in the terminal where the backend server is running.
- **Frontend**: Use browser developer tools (F12) to view any errors in the console.

## **Future Improvements**
- Add pagination for the leaderboard if the user list grows.
- Add more detailed claim history views for each user.
- Implement unit tests and integration tests.
