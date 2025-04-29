const express = require('express');
const router = express.Router();
const { sendAlert, getAlertHistory, getAlertStats } = require('../controller/alertController.js');

router.post('/send', sendAlert);
router.get('/history', getAlertHistory);
router.get('/stats', getAlertStats);

module.exports = router; 