const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');

router.get('/', async (req, res) => {
    placeOrderModel.find({}).lean()
    .then(result => res.status(200).json({ status: 'success', data: result }))
    .catch(err => res.status(500));
})

module.exports = router;
