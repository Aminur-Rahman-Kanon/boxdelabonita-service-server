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
    
    await productModel.find({ title: data.title }).lean().then(async result => {
        if (result.length){
            await productModel.updateOne({ title: data.title }, {
                $set: {
                    category: data.productCategory,
                    stock: data.stock,
                    title: data.title,
                    price: data.productPrice,
                    description: data.description,
                    ladingDescription: data.ladingDescription,
                    rating: data.rating,
                    color: data.colors,
                }
            })
        }
        else {
            await productModel.create({ category: data.productCategory,
                                        stock: data.stock,
                                        title: data.title,
                                        price: data.productPrice,
                                        description: data.description,
                                        ladingDescription: data.ladingDescription,
                                        rating: data.rating,
                                        color: data.colors,
             }).then(result => res.status(200).json({ status: 'success' })).catch(err => res.status(404).json({ status: 'failed' }));
        }
    })

})

module.exports = router;

