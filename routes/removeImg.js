const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const productModel = require('../schema/schema').productModel;

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

router.post('/', async (req, res) => {
    const { category, img, title } = req.body;
    console.log(category, title, img);
    
    try {
        const imgRef = ref(storage, `products/${category}/${title}/${img}`);

        deleteObject(imgRef)
        .then(async result => {
            await productModel.findOne({ title }).then(async response => {
                const imgObj = response.img;
                delete imgObj[img];
                await productModel.updateOne({ title }, {
                    $set: {
                        img: imgObj
                    }
                }).then(final => res.status(200).json({ status: 'success' })).catch(err => res.status(500).json({ status: 'failed' }))
            })
        })
        .catch(err => res.json({ status: 'failed' }));
    } catch (error) {
        res.status(500).json({ status: 'error' })
    }
})

module.exports = router;
