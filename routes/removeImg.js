const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const pool = require('../db/db_init/db_init');

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

router.post('/', async (req, res) => {
    
    const { category, imgIdx, title } = req.body;

    try {
        const imgRef = ref(storage, `products/${category}/${title}/image ${imgIdx+1}`);
    
        deleteObject(imgRef)
        .then(async result => {
            await pool.query(`SELECT * FROM product WHERE title = '${title}';`, async (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                if (result.rowCount){
                    const imgs = result.rows[0].img;
                    imgs.splice(imgIdx, 1);
                    await pool.query(`UPDATE product SET img = '{${imgs}}' WHERE title = '${title}';`, (err, result) => {
                        if (err) return res.status(400).json({ status: 'failed' });
                        return res.status(200).json({ status: 'success' });
                    })
                }
            })
        })
        .catch(err => res.json({ status: 'failed' }));
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
