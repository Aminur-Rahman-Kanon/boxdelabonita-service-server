const express = require('express');
const router = express.Router();
const pool = require('../db/db_init/db_init');

router.get('/', async (req, res) => {
    console.log('foo');
    try {
        await pool.query('SELECT * FROM product', (err, result) => {
            console.log(err);
            if (err) return res.status(400).json({ status: 'failed' })
            return res.status(200).json({ status: 'success', data: result.rows })
        });
    } catch (error) {
        return res.status(500).json({ status: 'error' });
    }
})

module.exports = router;
