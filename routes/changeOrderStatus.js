const express = require('express');
const router = express.Router();
const { placeOrderModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) return res.status(400).json({ status: 'invalid request' });

    try {
        const item = await placeOrderModel.findOne({ _id: id });
        if (!item) return res.status(400).json({ status: 'failed' });

        const orderInfo = JSON.parse(JSON.stringify(item.orderInfo));
        orderInfo.orderStatus = status

        await placeOrderModel.updateOne({ _id: id }, {
            $set: {
                orderInfo
            }
        }).then(result => res.status(200).json({ status: 'success' }))
        .catch(err => res.status(400).json({ status: 'failed' }))
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
