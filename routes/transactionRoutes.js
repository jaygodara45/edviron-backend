const express = require('express');
const router = express.Router();
const { getAllTransactions, getTransactionsBySchool, getTransactionsByOrderId } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllTransactions);
router.route('/school/:schoolId').get(protect, getTransactionsBySchool);
router.route('/transaction-status/:orderId').get(protect, getTransactionsByOrderId);

module.exports = router;