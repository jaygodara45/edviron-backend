const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, handleWebhook);

module.exports = router;