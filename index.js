const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const uploadProducts = require('./routes/uploadProduct');
const fetchProducts = require('./routes/fetchproducts');
const adminLogin = require('./routes/adminLogin');
const tokenValidation = require('./routes/tokenValidation');

app.use('/upload-products', uploadProducts);
app.use('/admin-login', adminLogin);
app.use('/verify-token', tokenValidation);
app.use('/fetch-products', fetchProducts);

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(conn => console.log('database connected')).catch(err => console.log(err));

app.use(express.static('public'));

app.listen(process.env.port || '8080', (err) => {
    if (err){
        return console.log(err)
    }

    console.log('Server is runnning on port 8080');
})