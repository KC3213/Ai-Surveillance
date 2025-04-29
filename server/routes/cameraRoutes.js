// server/routes/cameraRoutes.js
const express = require('express');
const router = express.Router();
const cameraCtrl = require('../controller/cameraController');

router.post('/', cameraCtrl.addCamera);  // To add a camera
router.get('/', cameraCtrl.getCameras);  // To get all cameras

module.exports = router;
