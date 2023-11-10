const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db/db_init/db_init');

router.post('/', async (req, res) => {
    const { product } = req.body;

    console.log(product);

    try {
        if (product){
            await pool.query(`SELECT * FROM product WHERE title = '${product}';`, (err, result) => {
                if (err) return res.status(400).json({ status: 'failed' });
                return res.status(200).json({ status: 'success', data: result.rows });
            })
        }
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
