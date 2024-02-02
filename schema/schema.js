const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const product = new Schema({
    stock: { type: Number, required: true },
    title: { type: String, required: true, index: true },
    rating: { type: Number, required: true },
    price: { type: Object, required: true },
    color: { type: Array, required: true },
    img: { type: Array, required: true },
    description: { type: String, required: true },
    ladingDescription: { type: String },
    customerReviews: Array,
    category: { type: String, requied: true, index: true },
    subCategory: { type: String, requied: true }
})

const placedOrder = new Schema({
    deviceId: {type: String},
    email: {type: String},
    orderInfo: {type: Object},
    customerInfo: {type: Object},
    products: {type: Object}
})

const adminModel = mongoose.model('admin', admin);
const productModel = mongoose.model('products', product);
const placeOrderModel = mongoose.model('orders', placedOrder);

module.exports = {
    adminModel,
    productModel,
    placeOrderModel
}
