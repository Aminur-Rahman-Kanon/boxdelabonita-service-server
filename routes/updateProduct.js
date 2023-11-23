const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { data } = req.body;

    await productModel.findOne({ title: data.title }).then(async result => {
        if (result){
            //update product
            await productModel.updateOne({ title: data.title }, {
                $set: {
                    title: data.title,
                    description: data.description,
                    category: data.productCategory,
                    subCategory: data.productSubCategory,
                    stock: data.stock,
                    price: data.price,
                    color: data.colors
                }
            }).then(result => res.status(200).json({ status: 'success' })).catch(err => res.status(400).json({ status: 'failed' }))
        }
        else {
            return res.status(400).json({ status: 'failed' })
        }
    })
})

module.exports = router;
