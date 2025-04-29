const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const alertRoutes = require('./routes/alertRoutes');

// Load environment variables
const envPath = path.resolve(__dirname, '.env');
console.log('Loading .env file from:', envPath);
dotenv.config({ path: envPath });

// Log environment variables (without sensitive data)
console.log('\nEnvironment Variables Check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'NOT SET');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'NOT SET');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'NOT SET\n');

const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());  // Parse incoming JSON requests

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));

// Mount the API routes
try {
  console.log("Mounting /api/auth");
  app.use('/api/auth', authRoutes);
} catch (err) {
  console.error("Error in /api/auth:", err);
}

try {
  console.log("Mounting /api/cameras");
  app.use('/api/cameras', cameraRoutes);
} catch (err) {
  console.error("Error in /api/cameras:", err);
}

try {
  console.log("Mounting /api/alerts");
  app.use('/api/alerts', alertRoutes);
} catch (err) {
  console.error("Error in /api/alerts:", err);
}

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB successfully');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: http://localhost:3002`);
});
