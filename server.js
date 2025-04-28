const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/payment');
const webhookRoutes = require('./routes/webhook');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');



dotenv.config()
connectDb()

const app = express();
app.use(cors());

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/create-payment', paymentRoutes);
app.use('/api/webook', webhookRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
