const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const pool = require('../db/db_init/db_init');

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
                await pool.query(`SELECT * FROM product where title = '${data.title}';`, async (err, result) => {
                    if (err) return res.status(400).json({ status: 'failed' });
                    if (result.rowCount){
                        const updateImg = result.rows[0].img;
                        updateImg[data.index] = url;
                        await pool.query(`UPDATE product SET img = '{${updateImg}}' WHERE title = '${data.title}';`, (err, result) => {
                            if (err) return res.status(400).json({ status: 'failed' })
                            return res.status(200).json({ status: 'success' });
                        })
                    }
                })
            }).catch(err => res.status(400).json({ status: 'upload error' }))
        })
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
