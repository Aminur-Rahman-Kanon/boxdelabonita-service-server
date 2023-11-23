const express = require('express');
const router = express.Router({ mergeParams: true });
const { productModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { product } = req.body;

    try {
        if (product){
            await productModel.find({ title: product }).then(result => res.status(200).json({ status: 'success', data: result }))
            .catch(err => res.status(400).json({ status: 'failed' }));
        }
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
