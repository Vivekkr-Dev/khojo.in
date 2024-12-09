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

// POST route to register user
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

// New POST route to fetch user data by mobile or username
app.post('/api/fetchUserData', async (req, res) => {
  try {
    const { mobile, username } = req.body;

    // Validate that at least one of mobile or username is provided
    if (!mobile && !username) {
      return res.status(400).json({ message: 'Mobile or Username is required.' });
    }

    // Find user by either mobile or username
    const user = await User.findOne({ $or: [{ mobile }, { username }] });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // If user found, return user data
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Error fetching user data.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
