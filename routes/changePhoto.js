const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const { productModel } = require('../schema/schema');

firebase.initializeApp(firebaseConfig);
const storage = getStorage()
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), async (req, res) => {
    const img = req.file;
    const data = JSON.parse(req.body.data);
    
    try {
        const removeImgRef = ref(storage, `products/${data.category}/${data.title}/image ${data.index+1}`);
        const addImgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
        const metadata = {
            contentType: 'image/jpeg'
        }

        deleteObject(removeImgRef).then(async result => {
            const snapshot = await uploadBytesResumable(addImgRef, img.buffer, metadata);
            await getDownloadURL(snapshot.ref).then(async url => {
                await productModel.findOne({ title: data.title }).then(async result => {
                    if (!result) return res.status(400).json({ status: 'failed' });
                    const updateImg = result.img;
                    updateImg[data.index] = url;
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            img: updateImg
                        }
                    }).then(finish => res.status(200).json({ status: 'success' })).catch(err => res.status(400).json({ status: 'failed' }));
                })
            }).catch(err => res.status(400).json({ status: 'upload error' }))
        })
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
