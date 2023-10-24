const express = require('express');
const router = express.Router();
const { productModel, hotDealsModel, newArrivalsModel, popularProductsModel, trendingProductsModel } = require('../schema/schema');
const firebase = require('firebase/app');
const firebaseConfig = require('../public/firebase/firebase');
const { getStorage, deleteObject, ref } = require('firebase/storage');

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

router.post('/', async (req, res) => {
    const { title, category, subCategory, img } = req.body;
    const product = await productModel.findOne({ title });
    if (!product) return res.status(400).json({ status: 'not found' });

    switch(subCategory){
        case 'hot deals':
            try {
                const imgs = Object.keys(img);
                for (let i=0; i<imgs.length; i++){
                    const imgRef = ref(storage, `products/${category}/${title}/${imgs[i]}`);
                    await deleteObject(imgRef).then(response => 'success').catch(err => {
                        return res.status(400);
                    });
                }
                
                await productModel.deleteOne({ title }).then(async result => {
                    await hotDealsModel.deleteOne({ title }).then(final => res.status(200).json({ status: 'success' }))
                    .catch(err => res.status(400).json({ status: 'failed' }))
                }).catch(err => res.status(500));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'new arrivals':
            try {
                const imgs = Object.keys(img);
                for (let i=0; i<imgs.length; i++){
                    const imgRef = ref(storage, `products/${category}/${title}/${imgs[i]}`);
                    await deleteObject(imgRef).then(response => 'success').catch(err => {
                        return res.status(400);
                    });
                }
                
                await productModel.deleteOne({ title }).then(async result => {
                    await newArrivalsModel.deleteOne({ title }).then(final => res.status(200).json({ status: 'success' }))
                    .catch(err => res.status(400).json({ status: 'failed' }))
                }).catch(err => res.status(500));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'popular products':
            try {
                const imgs = Object.keys(img);
                for (let i=0; i<imgs.length; i++){
                    const imgRef = ref(storage, `products/${category}/${title}/${imgs[i]}`);
                    await deleteObject(imgRef).then(response => 'success').catch(err => {
                        return res.status(400);
                    });
                }
                
                await productModel.deleteOne({ title }).then(async result => {
                    await popularProductsModel.deleteOne({ title }).then(final => res.status(200).json({ status: 'success' }))
                    .catch(err => res.status(400).json({ status: 'failed' }))
                }).catch(err => res.status(500));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'trending products':
            try {
                const imgs = Object.keys(img);
                for (let i=0; i<imgs.length; i++){
                    const imgRef = ref(storage, `products/${category}/${title}/${imgs[i]}`);
                    await deleteObject(imgRef).then(response => 'success').catch(err => {
                        return res.status(400);
                    });
                }
                
                await productModel.deleteOne({ title }).then(async result => {
                    await trendingProductsModel.deleteOne({ title }).then(final => res.status(200).json({ status: 'success' }))
                    .catch(err => res.status(400).json({ status: 'failed' }))
                }).catch(err => res.status(500));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'none':
            try {
                const imgs = Object.keys(img);
                for (let i=0; i<imgs.length; i++){
                    const imgRef = ref(storage, `products/${category}/${title}/${imgs[i]}`);
                    await deleteObject(imgRef).then(response => 'success').catch(err => {
                        return res.status(400);
                    });
                }
                
                await productModel.deleteOne({ title }).then(result => res.status(200).json({ status: 'success' })).catch(err => res.status(500));
            } catch (error) {
                return res.status(500);
            }
            break;

        default:
            return res.status(500);
    }


})

module.exports = router;
