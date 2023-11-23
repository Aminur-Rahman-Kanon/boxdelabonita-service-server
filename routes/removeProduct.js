const express = require('express');
const router = express.Router();
const { productModel } = require('../schema/schema');
const firebase = require('firebase/app');
const firebaseConfig = require('../public/firebase/firebase');
const { getStorage, deleteObject, ref } = require('firebase/storage');

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

router.post('/', async (req, res) => {
    const { title, category, img } = req.body;

    try {
        for (let i=0; i<img.length; i++){
            const imgRef = ref(storage, `products/${category}/${title}/image ${i+1}`);

            deleteObject(imgRef).then(response => {
                // return 'success'
            })
            .catch(err => {
                res.status(400).json({ status: 'failed' });
            });
        }

        await productModel.findOne({ title: title }).then(async result => {
            if (!result) return res.status(400).json({ status: 'failed' })
            await productModel.deleteOne({ title: title }).then(finish => res.status(200).json({ status: 'success' }))
            .catch(err => res.status(400).json({ status: 'failed' }))
        })
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
