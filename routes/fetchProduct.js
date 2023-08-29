const express = require('express');
const router = express.Router({ mergeParams: true });
const products = require('../schema/schema').productModel

router.post('/', async (req, res) => {
    const { product } = req.body;
    console.log(product);

    if (product){
        products.findOne({ title: product }).then(result => res.status(200).json({ data: result })).catch(err => res.status(400).json({ data: 'error' }))
    }
})

module.exports = router;
