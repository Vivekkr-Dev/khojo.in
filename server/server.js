//import express from 'express';
//import cors from 'cors';
//import { config } from 'dotenv';
//import { connect } from 'mongoose';
//
//// Load environment variables
//config();
//
//const app = express();
//
//// Enable CORS for all routes
//app.use(cors());
//
//// Middleware to parse JSON requests
//app.use(express.json());
//
//// Logging middleware
//app.use((req, res, next) => {
//  console.log(`${req.method} ${req.url}`);
//  next();
//});
//
//// Add a root route
//app.get('/', (req, res) => {
//  res.send('Welcome to the API!');
//});
//
//// Create a router for user-related routes
//const router = express.Router();
//
//// Example route
//router.get('/', (req, res) => {
//  res.send('User route works!');
//});
//
//// Additional routes
//router.post('/register', (req, res) => {
//  // Handle user registration
//  res.send('User registered');
//});
//
//// Route for retrieving user profile
//router.get('/profile', (req, res) => {
//  // Handle user profile retrieval
//  res.send('User profile');
//});
//
//// Use the router for user-related routes
//app.use('/api/users', router);
//
//const PORT = process.env.PORT || 5000;
//const MONGO_URL = process.env.MONGO_URL || "";
//
//// Start the server and connect to MongoDB
//const start = async () => {
//  try {
//    await connect(MONGO_URL);
//    console.log("Connected to MongoDB");
//
//    app.listen(PORT, () => {
//      console.log(`Server is running on http://localhost:${PORT}`);
//    });
//  } catch (error) {
//    console.error("Database connection error:", error);
//  }
//};
//
//// Global error handlers
//process.on('uncaughtException', (error) => {
//  console.error('Uncaught Exception:', error);
//});
//
//process.on('unhandledRejection', (reason, promise) => {
//  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//});
//
//// Error handling middleware
//app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send('Something broke!');
//});
//
//// Start the server
//start();




import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || 'your_mongodb_connection_string';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Database connection error:', error));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
});

const User = mongoose.model('User', userSchema);

// Handle root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Registration API!');
});

// Routes
app.post('/api/users', async (req, res) => {
  try {
    const { username, address, mobile, location } = req.body;

    // Simple validation
    if (!username || !address || !mobile) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create user in database
    const newUser = new User({ username, address, mobile, location });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

