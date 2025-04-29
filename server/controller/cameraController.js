// server/controllers/cameraController.js
const Camera = require('../models/camera');

// Add new camera (Mocking with static URLs for now)
exports.addCamera = async (req, res) => {
  const { cameraName, videoUrl } = req.body;
  const newCamera = new Camera({ cameraName, videoUrl });
  await newCamera.save();
  res.status(201).json({ message: 'Camera added successfully' });
};

// Get all cameras
exports.getCameras = async (req, res) => {
  const cameras = await Camera.find();
  res.json(cameras);
};
