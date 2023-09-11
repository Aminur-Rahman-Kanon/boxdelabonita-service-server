const express = require('express');
const router = express.Router({ mergeParams: true });
const productModel = require('../schema/schema').productModel;

router.post('/', async (req, res) => {
    const { data } = req.body;

    try {
        await productModel.collection.updateOne({ title: data.productTitle }, {
            $set: {
                title: data.title,
                category: data.productCategory,
                subCategory: data.productSubCategory,
                stock: data.stock,
                price: data.price,
                details: data.details,
                description: data.description
            }
        })
        return res.json({ status: 'success' });
    } catch (error) {
        return res.json({ status: 'error' });
    }
    
})

module.exports = router;
