const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');

async function handleWebhook(req, res) {
    try {
        const { status, order_info } = req.body;

        if (!status || !order_info || !order_info.order_id || !(status==200 || status==201)) {
            return res.status(400).json({ message: 'Invalid webhook payload.' });
        }
        console.log(`Webhook event: ${JSON.stringify(order_info)}`);

        const {
            order_id,
            order_amount,
            transaction_amount,
            gateway,
            bank_reference,
            status: payment_status,
            payment_mode,
            payment_details,   
            payment_message,
            payment_time,
            error_message
        } = order_info;

        // Update Order
        console.log('Before finding currentOrder');
        const currentOrder = await Order.findById(order_id);
        console.log('Found currentOrder');

        if (!currentOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        currentOrder.gateway_name = gateway;
        const updatedOrder = await currentOrder.save();
        console.log("Order updated:", updatedOrder);

        // Updating OrderStatus
        const orderStatusData = {
            collect_id: order_id,
            order_amount,
            transaction_amount,
            payment_mode,
            payment_details,
            bank_reference,
            payment_message,
            status: payment_status,
            error_message,
            payment_time
        }

        const newOrderStatus = await OrderStatus.create(orderStatusData);
        return res.status(200).json({ message: 'Order updated successfully.', order: orderStatusData });

    } catch (error) {
        console.error('Webhook Error:', error.message);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
}

module.exports = { handleWebhook };
