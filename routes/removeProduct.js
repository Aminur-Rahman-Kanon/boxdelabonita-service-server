const express = require('express');
const router = express.Router();
const { productModel } = require('../schema/schema');
const fs = require('fs');
const path = require('path');

router.post('/', async (req, res) => {
    const { title, category } = req.body;
    console.log(title, category)
    if (!title && !category) return res.status(404).json({ status: 'bad request' })
    
    try {
        const filePath = path.join(__dirname, '..', 'public', 'products', `${category}`, `${title}`);
        fs.rmSync(filePath, { recursive: true, force: true }, err => {
            if (err) return res.status(404).json({ status: 'failed' })
        })
        await productModel.deleteOne({ title })
        .then(result => res.status(200).json({ status: 'success' }))
        .catch(err => {
            return res.status(404).json({ status: 'failed' });
        })
    } catch (error) {
        return res.status(500).json({ status: 'failed' });
    }
})

module.exports = router;
