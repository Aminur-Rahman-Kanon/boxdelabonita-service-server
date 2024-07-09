const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const { productModel } = require('../schema/schema');

const upload = multer({ storage: multer.memoryStorage() })
firebase.initializeApp(firebaseConfig);
const storage = getStorage();

router.post('/', upload.single('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const img = req.file;

    //if no data then abort
    if (!data || !img) return res.status(400).status({ status: 'invalid request' })

    //setting references for the images
    const imgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);

    //adding metadata for the images
    const metadata = {
        contentType: 'image/jpeg'
    }

    //getting snapshot object
    const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);

    //getting url and then storing them in the database
    await getDownloadURL(snapshot.ref).then(async url => {
        await productModel.findOne({ title: data.title }).then(async result => {
            if (!result) return res.status(400).json({ status: 'failed' });
            const imgs = result.img;
            imgs.push(url);
            await productModel.updateOne({ title: data.title }, {
                $set: {
                    img: imgs
                }
            }).then(finish => res.status(200).json({ status: 'success' }))
            .catch(err => res.status(400).json({ status: 'failed' }));
        })
    })
})

module.exports = router;
