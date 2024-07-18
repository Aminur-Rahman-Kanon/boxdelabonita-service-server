const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).json({ status: 'failed' });

    await placeOrderModel.deleteOne({ _id: data.id })
    .then(result => res.status(200).json({ status: 'success' }))
    .catch(err => res.status(404).json({ status: 'failed' }));
})

module.exports = router;
