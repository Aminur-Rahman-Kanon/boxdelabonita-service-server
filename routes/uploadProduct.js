const express = require('express');
const router = express.Router();
const multer = require('multer');
const { productModel } = require('../schema/schema');
const { storeProductImg } = require('../public/utilities/utilities');
const path = require('path');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const photos = req.files;

    if (!data || !photos) return res.status(404).json({ status: 'failed' })
    
    await productModel.find({ title: data.title }).lean().then(result => {
        if (result.length){
            return res.status(400).json({ status: 'product exist', product: result })
        }
    })
    
    //uploading fikes to the firestore storage
    const img = {};
    photos.forEach(async itm => {
        const dir = path.join(__dirname, '..', `public/products/${data.productCategory}`);
        const result = await storeProductImg(dir, itm, data.title, data.productCategory);
    
        if (result.status === 'success' && result.url) {
            img[result.name] = result.url;
        }
    })

    data['img'] = img;

    await productModel.create({ category:data.productCategory,
                                subCategory: data.productSubCategory,
                                stock: data.stock,
                                title: data.title,
                                price: data.productPrice,
                                description: data.description,
                                ladingDescription: data.ladingDescription,
                                rating: data.rating,
                                color: data.colors,
                                img: img
     }).then(result => res.status(200).json({ status: 'success' })).catch(err => res.status(404).json({ status: 'failed' }));
})

module.exports = router;
