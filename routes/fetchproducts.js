const express = require('express');
const router = express.Router();
const pool = require('../db/db_init/db_init');

router.get('/', async (req, res) => {

    try {
        const products = await pool.query('SELECT * FROM product', (err, result) => {
            if (err) return res.status(400).json({ status: 'failed' })
            return res.status(200).json({ status: 'success', data: result.rows })
        });
    } catch (error) {
        return res.status(400).json({ status: 'error' });
    }
})

module.exports = router;
