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
    reviews: { type: Array, required: true },
    price: { type: Object, required: true },
    deliveryTime: String,
    color: { type: Object, required: true },
    img: { type: Object, required: true },
    description: { type: String, required: true },
    customerReviews: Array,
    purchased: Number,
    category: { type: String, requied: true, index: true },
    subCategory: { type: String, requied: true }
})

const placedOrder = new Schema({
    deviceId: { type: String, index: true },
    email: String,
    orderInfo: {type: Object, required: true},
    customerInfo: {type: Object, required: true},
    products: {type: Object, required: true}
})

const adminModel = mongoose.model('admin', admin);
const productModel = mongoose.model('products', product);
const hotDealsModel = mongoose.model('hot-deals', product);
const newArrivalsModel = mongoose.model('new-arrivals', product);
const popularProductsModel = mongoose.model('popular-products', product);
const trendingProductsModel = mongoose.model('trending-products', product);
const placeOrderModel = mongoose.model('orders', placedOrder);

module.exports = {
    adminModel,
    productModel,
    hotDealsModel,
    newArrivalsModel,
    popularProductsModel,
    trendingProductsModel,
    placeOrderModel
}
