const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const product = new Schema({
    stock: { type: Number },
    title: { type: String, required: true, index: true },
    rating: { type: Number  },
    price: { type: Object  },
    color: { type: Array },
    img: { type: Object  },
    description: { type: String  },
    ladingDescription: { type: String },
    customerReviews: Array,
    category: { type: String, requied: true, index: true },
    subCategory: { type: String }
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
