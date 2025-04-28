const express = require('express');
const router = express.Router();
const { createPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createPayment);

module.exports = router;
