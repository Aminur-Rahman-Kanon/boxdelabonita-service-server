const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const productModel = require('../schema/schema').productModel;

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), async (req, res) => {
    const img = req.file;
    const data = JSON.parse(req.body.data);

    try {
        if (img && data) {
            const imgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);

            const metadata = {
                ContentType: img.mimetype
            }

            const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);

            await getDownloadURL(snapshot.ref).then(async url => {
                const imgTopload = {};
                imgTopload[img.originalname] = url;
                await productModel.findOne({ title: data.title })
                .then(async result => {
                    const imgObj = result.img;
                    imgObj[img.originalname] = url;
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            img: imgObj
                        }
                    })
                    .then(response => res.status(200).json({ status: 'success' })).catch(err => res.status(500).json({ status: 'failed' }))
                })
                .catch(err => res.status(400).json({ status: 'failed' }))
            })
        }
    } catch (error) {
        res.status(500).json({ status: 'error' })
    }
})

module.exports = router;
