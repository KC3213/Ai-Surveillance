const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    return res.status(409).json({ message: 'Username or email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  return res.status(201).json({ message: 'Signup successful' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  // Update user activity
  user.lastLogin = new Date();
  user.loginCount += 1;
  user.isActive = true;
  await user.save();

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  return res.json({ 
    message: 'Login successful', 
    token,
    user: {
      username: user.username,
      email: user.email,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount
    }
  });
};

const logout = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      user.isActive = false;
      await user.save();
    }
    
    return res.json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Error during logout' });
  }
};

const getActiveUsers = async (req, res) => {
  try {
    // Also set users inactive if they haven't logged in for more than 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    await User.updateMany(
      { 
        lastLogin: { $lt: thirtyMinutesAgo },
        isActive: true 
      },
      { isActive: false }
    );

    const activeUsers = await User.find({ isActive: true })
      .select('username email lastLogin loginCount')
      .sort({ lastLogin: -1 });
    return res.json(activeUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching active users' });
  }
};

// ✅ This exports the functions — no need to export 'email'
module.exports = { signup, login, logout, getActiveUsers };
