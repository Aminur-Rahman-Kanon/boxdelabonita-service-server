const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post('/', async (req, res) => {
    const {token} = req.body;
    if (!token) return res.json({ status: 'not found' });

    try {
        const validation = jwt.verify(token, process.env.JWT_SECRET)
        return res.json({ status: 'valid', data: validation })
    } catch (error) {
        return res.json({ status: 'expired' })
    }
})

module.exports = router;
