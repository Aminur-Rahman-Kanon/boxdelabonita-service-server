const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const firebaseConfig = require('../public/firebase/firebase');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const pool = require('../db/db_init/db_init');


firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const photos = req.files;

    const checkExistProduct = await pool.query(`select * from product where title = '${data.title}'`);
    if (checkExistProduct.rowCount) return res.json({ status: 'product exist', product: checkExistProduct.rows });
    
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
    
        const price = JSON.stringify(data.productPrice);
        // const reviews = {name: 'user_1', comment: 'asjd asldj sladj', name: 'user_2', comment: 'ojhlkjklhjfgh jfkhl'}
        // const customerReviews = JSON.stringify(reviews);
    
        await pool.query(`INSERT INTO product (stock, title, rating, price, color, img, description, category, subcategory) 
                        VALUES (${data.stock}, '${data.title}', ${data.rating}, '${price}', '{${data.colors}}', '{${imgUrl}}', '${data.description}', '${data.productCategory}', '${data.productSubCategory}');`, (err, result) => {
            if (err) return res.status(400).json({ status: 'failed' });
            if (result.rowCount){
                return res.status(200).json({ status: 'success' });
            }
        });
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
