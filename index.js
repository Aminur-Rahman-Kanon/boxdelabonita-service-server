const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cors({ 
    origin: ['http://localhost:3000', 'https://boxdelabonita.onrender.com'],
    default: 'https://boxdelabonita.onrender.com/'
}));

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

const { hotDealsModel, popularProductsModel, trendingProductsModel, newArrivalsModel, productModel } = require('./schema/schema');


mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(conn => console.log('database connected')).catch(err => console.log(err));

// productModel.find({}).lean().then(data => {
//     const updatedData = data.map(async item => {
//         const copied = JSON.parse(JSON.stringify(item));
//         copied.title = copied.title.toLowerCase();
//         copied.category = copied.category.toLowerCase();
//         copied.subCategory = copied.subCategory.toLowerCase();
//         await productModel.updateOne({ _id: item._id }, {
//             $set: {
//                 title: copied.title,
//                 category: copied.category,
//                 subCategory: copied.subCategory
//             }
//         }).then(resu => console.log(resu)).catch(err => console.log(err));
//     })
// })

// const firebase = require('firebase/app');
// const firebaseConfig = require('./public/firebase/firebase');
// const { getStorage, deleteObject, ref } = require('firebase/storage');

// firebase.initializeApp(firebaseConfig);
// const storage = getStorage();

// try {
//     const deleteRef = ref(storage, 'products/Backpack/Test 1/blue');
//     deleteObject(deleteRef).then(result => {
//         console.log('success');
//     })
// } catch (error) {
//     console.log('failed');
// }

app.listen(process.env.PORT || '8080', (err) => {
    if (err){
        return console.log(err)
    }

    console.log('Server is runnning on port 8080');
})
