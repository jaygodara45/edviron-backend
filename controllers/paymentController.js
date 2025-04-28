const axios = require('axios');
const { createPaymentSign } = require('../helper/jwtSign'); 
const User = require('../models/User');
const Order = require('../models/Order');

const BASE_URL_EDVIRON = process.env.BASE_URL_EDVIRON;
const EDVIRON_API_KEY = process.env.EDVIRON_API_KEY;

async function createPayment(req, res) {
    try {
        const { school_id, amount, callback_url } = req.body;

        // Validate fields
        if (!school_id || !amount || !callback_url) {
            return res.status(400).json({ message: 'school_id, amount, and callback_url are required.' });
        }

        const payload = { school_id, amount, callback_url };

        // Create sign        
        const sign = createPaymentSign(payload);
        

        const body = {
            ...payload,
            sign
        };
        
        // External API call
        const response = await axios.post(`${BASE_URL_EDVIRON}/erp/create-collect-request`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${EDVIRON_API_KEY}`
            }
        });
        if (response.status !== 201) {
            return res.status(response.status).json({ message: response.data.message || 'Error creating collect request.' });
        }

        const { collect_request_id, collect_request_url, sign: returnedSign } = response.data;

        const orderData = {
            _id: collect_request_id,
            school_id: school_id,
        };

        const currentOrder = await Order.create(orderData);
        return res.status(200).json({ collect_request_id, collect_request_url, sign: returnedSign, order: currentOrder });

    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ message: error.response.data.message });
        }
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
}

module.exports = { createPayment };