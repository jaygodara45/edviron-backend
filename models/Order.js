const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    school_id: {
        type: String,
        required: true
    },
    trustee_id: {
        type: String,
        
    },
    student_info: {
        name: {
            type: String,
            
        },
        id: {
            type: String,
            
        },
        email: {
            type: String,
        }
    },
    gateway_name: {
        type: String
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Order', orderSchema);
