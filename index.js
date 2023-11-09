const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const pool = require('./db/db_init/db_init');
require('dotenv').config();

app.use(express.json());
app.use(cors({ 
    origin: ['http://localhost:3000', 'https://boxdelabonita.onrender.com'],
    default: 'https://boxdelabonita.onrender.com/'
}));

pool.query("SELECT * FROM product WHERE subcategory = 'New Arrivals'", (err, result) => {
    console.log(result.rows);
})

const uploadProducts = require('./routes/uploadProduct');
const fetchProducts = require('./routes/fetchproducts');
const adminLogin = require('./routes/adminLogin');
const tokenValidation = require('./routes/tokenValidation');
const fetchProduct = require('./routes/fetchProduct');
const addPhoto = require('./routes/addPhoto');
const removeImg = require('./routes/removeImg');
const updateProduct = require('./routes/updateProduct');
const removeProduct = require('./routes/removeProduct');
const addNewImg = require('./routes/addNewImg');
const fetchPlacedOrders = require('./routes/fetchPlacedOrders');
const changeOrderStatus = require('./routes/changeOrderStatus');
const { placeOrderModel } = require('./schema/schema');

app.use('/upload-products', uploadProducts);
app.use('/admin-login', adminLogin);
app.use('/verify-token', tokenValidation);
app.use('/fetch-products', fetchProducts);
app.use('/fetch-product', fetchProduct);
app.use('/add-photo', addPhoto);
app.use('/remove-img', removeImg);
app.use('/update-product-details', updateProduct);
app.use('/remove-product', removeProduct);
app.use('/add-new-img', addNewImg);
app.use('/fetch-placed-orders', fetchPlacedOrders);
app.use('/change-order-status', changeOrderStatus);

// mongoose.connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 5000,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(conn => console.log('database connected')).catch(err => console.log(err));

app.listen(process.env.PORT || '8080', (err) => {
    if (err){
        return console.log(err)
    }

    console.log('Server is runnning on port 8080');
})
