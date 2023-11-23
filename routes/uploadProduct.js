const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const firebaseConfig = require('../public/firebase/firebase');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { productModel } = require('../schema/schema');

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const photos = req.files;
    
    await productModel.find({ title: data.title }).lean().then(result => {
        if (result.length){
            return res.status(400).json({ status: 'product exist', product: result })
        }
    })
    
    //uploading fikes to the firestore storage
    try {
        const imgUrl = [];
        for (let i=0; i< photos.length; i++){
            const storageRef = ref(storage, `products/${data.productCategory}/${data.title}/${photos[i].originalname}`);
            const metadata = {
                contentType: 'image/jpeg'
            }
            const snapshot = await uploadBytesResumable(storageRef, photos[i].buffer, metadata);
            await getDownloadURL(snapshot.ref).then(url => imgUrl.push(url));
        }

        await productModel.create({
            stock: data.stock, title: data.title, rating: data.rating, price: data.productPrice, color: data.colors, img: imgUrl, description: data.description, category: data.productCategory, subCategory: data.productSubCategory
        }).then(result => res.status(200).json({ status: 'success' }))
        .catch(err => res.status(400).json({ status: 'failed' }))
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
