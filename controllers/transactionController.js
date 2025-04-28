const Order = require('../models/Order');
const mongoose = require('mongoose');

const getAllTransactions = async (req, res) => {
    try {
        // Get limit and page from query params, set default values
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        // Base aggregation pipeline (without skip and limit) to get total entries
        const basePipeline = [
            {
                $lookup: {
                    from: 'orderstatuses',
                    localField: '_id',
                    foreignField: 'collect_id',
                    as: 'status_info'
                }
            },
            { $unwind: '$status_info' },
            {
                $project: {
                    _id: 0,
                    collect_id: '$_id',
                    school_id: 1,
                    gateway_name: 1,
                    order_amount: '$status_info.order_amount',
                    custom_order_id: 1,
                    transaction_amount: '$status_info.transaction_amount',
                    status: '$status_info.status'
                }
            }
        ];

        // Get total number of entries
        const totalEntriesResult = await Order.aggregate([
            ...basePipeline,
            { $count: 'total' }
        ]);

        const total_entries = totalEntriesResult.length > 0 ? totalEntriesResult[0].total : 0;

        // Now apply pagination (skip + limit)
        const transactions = await Order.aggregate([
            ...basePipeline,
            { $skip: skip },
            { $limit: limit }
        ]);

        res.status(200).json({
            success: true,
            data: transactions,
            page: page,
            limit: limit,
            total_entries: total_entries
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server Error: ${error}` });
    }
};


const getTransactionsBySchool = async (req, res) => {
    try {
        const { schoolId } = req.params;

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const transactions = await Order.aggregate([
            {
                $match: {
                    school_id: schoolId  
                }
            },
            {
                $lookup: {
                    from: 'orderstatuses',
                    localField: '_id',
                    foreignField: 'collect_id',
                    as: 'status_info'
                }
            },
            { $unwind: '$status_info' },
            {
                $project: {
                    _id: 0,
                    collect_id: '$_id',
                    school_id: 1,
                    gateway: 1,
                    order_amount: 1,
                    custom_order_id: 1,
                    transaction_amount: '$status_info.transaction_amount',
                    status: '$status_info.status'
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        res.status(200).json({
            success: true,
            data: transactions,
            page: page,
            limit: limit
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server Error: ${error}` });
    }
};

const getTransactionsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        const transactions = await Order.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderId)
                }
            },
            {
                $lookup: {
                    from: 'orderstatuses',
                    localField: '_id',
                    foreignField: 'collect_id',
                    as: 'status_info'
                }
            },
            { $unwind: '$status_info' },
            {
                $project: {
                    _id: 0,
                    collect_id: '$_id',
                    school_id: 1,
                    gateway: 1,
                    order_amount: 1,
                    custom_order_id: 1,
                    transaction_amount: '$status_info.transaction_amount',
                    status: '$status_info.status'
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server Error: ${error}` });
    }
};



module.exports = { getAllTransactions, getTransactionsBySchool, getTransactionsByOrderId };
