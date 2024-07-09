const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const { productModel } = require('../schema/schema');

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

router.post('/', async (req, res) => {
    
    const { category, imgIdx, title } = req.body;

    try {
        const imgRef = ref(storage, `products/${category}/${title}/image ${imgIdx+1}`);
    
        deleteObject(imgRef)
        .then(async result => {
            await productModel.findOne({ title: title }).then(async result => {
                if (!result) return res.status(400).json({ status: 'failed' });
                const imgs = result.img;

                imgs.splice(imgIdx, 1);
                await productModel.updateOne({ title: title }, {
                    $set: {
                        img: imgs
                    }
                }).then(finish => res.status(200).json({ status: 'success' }))
                .catch(err => res.status(400).json({ status: failed }))
            })
        })
        .catch(err => res.json({ status: 'failed' }));
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
