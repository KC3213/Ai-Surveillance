const Alert = require('../models/alert');
const nodemailer = require('nodemailer');
const config = require('../config');

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.password
  },
  debug: true
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to send messages');
  }
});

const createAlert = async (req, res) => {
  const { type, cameraId, details } = req.body;
  const alert = new Alert({ type, cameraId, details });
  await alert.save();
  res.status(201).json({ message: 'Alert saved' });
};

const sendAlert = async (req, res) => {
  const { message, recipient } = req.body;
  
  console.log('Attempting to send email...');
  console.log('From:', config.email.user);
  console.log('To:', recipient);
  console.log('Message:', message);

  try {
    // Send email
    const mailOptions = {
      from: config.email.user,
      to: recipient,
      subject: 'Security Alert',
      text: message
    };

    console.log('Mail options:', mailOptions);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    // Save alert to database
    const alert = new Alert({
      message,
      recipient,
      status: 'sent'
    });
    await alert.save();

    return res.json({ 
      message: 'Alert sent successfully',
      alert: {
        id: alert._id,
        message: alert.message,
        recipient: alert.recipient,
        timestamp: alert.timestamp
      }
    });
  } catch (error) {
    console.error('Email sending error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack
    });

    // Save failed alert to database
    const alert = new Alert({
      message,
      recipient,
      status: 'failed'
    });
    await alert.save();

    return res.status(500).json({ 
      message: 'Failed to send alert',
      error: error.message,
      details: error.response || 'No additional details available'
    });
  }
};

const getAlertHistory = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .sort({ timestamp: -1 })
      .limit(50); // Get last 50 alerts

    return res.json(alerts);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Error fetching alert history',
      error: error.message 
    });
  }
};

const getAlertStats = async (req, res) => {
  try {
    // Get alerts grouped by date for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const stats = await Alert.aggregate([
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    return res.json(stats);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Error fetching alert statistics',
      error: error.message 
    });
  }
};

module.exports = { createAlert, sendAlert, getAlertHistory, getAlertStats };
