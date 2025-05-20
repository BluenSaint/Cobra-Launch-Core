import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-cobra';

// Global variable to track connection status
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    // Use existing connection
    return { db: mongoose.connection };
  }

  // If no connection, create one
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
    return { db: mongoose.connection };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to database');
  }
}

// Define models
export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  plan: {
    type: String,
    enum: ['shield', 'elite', 'infinity', null],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Only create models if they don't already exist
export const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default { connectToDatabase, User }; 