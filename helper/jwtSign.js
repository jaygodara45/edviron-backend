const jwt = require('jsonwebtoken');
require('dotenv').config();

const PG_SECRET_KEY = process.env.PG_SECRET_KEY;

function createPaymentSign(payload) {  
    return jwt.sign(payload, PG_SECRET_KEY);
}

module.exports = { createPaymentSign };