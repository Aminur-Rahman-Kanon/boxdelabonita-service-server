const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const { cronJob } = require('./public/utilities/utilities');

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
const changePhoto = require('./routes/changePhoto');
const removeImg = require('./routes/removeImg');
const updateProduct = require('./routes/updateProduct');
const removeProduct = require('./routes/removeProduct');
const addNewImg = require('./routes/addNewImg');
const fetchPlacedOrders = require('./routes/fetchPlacedOrders');
const changeOrderStatus = require('./routes/changeOrderStatus');

app.use('/upload-products', uploadProducts);
app.use('/admin-login', adminLogin);
app.use('/verify-token', tokenValidation);
app.use('/fetch-products', fetchProducts);
app.use('/fetch-product', fetchProduct);
app.use('/change-photo', changePhoto);
app.use('/remove-img', removeImg);
app.use('/update-product-details', updateProduct);
app.use('/remove-product', removeProduct);
app.use('/add-new-img', addNewImg);
app.use('/fetch-placed-orders', fetchPlacedOrders);
app.use('/change-order-status', changeOrderStatus);

cronJob();

app.listen(process.env.PORT || '8080', (err) => {
    if (err){
        return console.log(err)
    }
    console.log('Server is runnning on port 8080');
})
