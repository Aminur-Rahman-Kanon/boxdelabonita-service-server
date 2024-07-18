const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const { cronJob } = require('./public/utilities/utilities');
const path = require('path');

app.use(express.json());
app.use(cors({ 
    origin: ['http://localhost:3000', 'https://boxdelabonita.onrender.com'],
    default: 'https://boxdelabonita.onrender.com/'
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(con => console.log("database connected"))
    .catch(err => console.log(err))

const uploadProducts = require('./routes/uploadProduct');
const fetchProducts = require('./routes/fetchproducts');
const adminLogin = require('./routes/adminLogin');
const tokenValidation = require('./routes/tokenValidation');
const fetchProduct = require('./routes/fetchProduct');
const changeImg = require('./routes/changeImg');
const removeImg = require('./routes/removeImg');
const updateProduct = require('./routes/updateProduct');
const removeProduct = require('./routes/removeProduct');
const addNewImg = require('./routes/addNewImg');
const fetchPlacedOrders = require('./routes/fetchPlacedOrders');
const changeOrderStatus = require('./routes/changeOrderStatus');
const uploadNewImg = require('./routes/uploadNewImg');

app.use('/upload-products', uploadProducts);
app.use('/upload-new-img', uploadNewImg);
app.use('/admin-login', adminLogin);
app.use('/verify-token', tokenValidation);
app.use('/fetch-products', fetchProducts);
app.use('/fetch-product', fetchProduct);
app.use('/change-img', changeImg);
app.use('/remove-img', removeImg);
app.use('/update-product-details', updateProduct);
app.use('/remove-product', removeProduct);
app.use('/add-new-img', addNewImg);
app.use('/fetch-placed-orders', fetchPlacedOrders);
app.use('/change-order-status', changeOrderStatus);

app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.listen(process.env.PORT || '8080', (err) => {
    if (err){
        return console.log(err)
    }
    cronJob();
    console.log('Server is runnning on port 8080');
})
