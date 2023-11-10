const express = require('express');
const router = express.Router();
const pool = require('../db/db_init/db_init');
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

        await pool.query(`DELETE FROM product WHERE title = '${title}';`, async (err, result) => {
            if (err) return res.status(400).json({ status: 'failed' });
            return res.status(200).json({ status: 'success' });
        })
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
