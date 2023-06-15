const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
        _user:
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
        orderItems: [
            {
                name: {type: String, required: true},
                quantity: {type: Number, required: true, default: 1},
                price: {type: Number, required: true},
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
        ],
        shippingAddress:
            {
                type: String,
                required: true
            },
        paymentMethod:
            {
                type: String,
                required: true,
                default: "PayPal"
            },
        shippingPrice:
            {
                type: Number,
                required: true,
                default: 0
            },
        totalPrice:
            {
                type: Number,
                required: true,
                default: 0
            },
    },
    {timestamps: true}
)
module.exports = model('Order', orderSchema)