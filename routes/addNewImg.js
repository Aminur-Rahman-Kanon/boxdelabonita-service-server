const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const pool = require('../db/db_init/db_init');

const upload = multer({ storage: multer.memoryStorage() })

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

router.post('/', upload.single('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const img = req.file;

    if (!data || !img) return res.status(400).status({ status: 'invalid request' })

    const imgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
    const metadata = {
        contentType: 'image/jpeg'
    }
    const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);

    await getDownloadURL(snapshot.ref).then(async url => {
        await pool.query(`SELECT * FROM product WHERE title = '${data.title}';`, async (err, result) => {
            if (err) return res.status(400).json({ status: 'failed' });
            if (result.rowCount){
                const imgs = result.rows[0].img;
                imgs.push(url);
                await pool.query(`UPDATE product SET img = '{${imgs}}' WHERE title = '${data.title}';`, (err, anotherResult) => {
                    if (err) return res.status(400).json({ status: 'failed' });
                    return res.status(200).json({ status: 'success' });
                })
            }
        })
    })
})

module.exports = router;
