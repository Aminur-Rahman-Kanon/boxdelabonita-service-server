const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db/db_init/db_init');

router.post('/', async (req, res) => {
    const { data } = req.body;

    const price = JSON.stringify(data.price);

    console.log(data);
    console.log(price);

    await pool.query(`UPDATE product SET stock = ${data.stock}, title = '${data.title}', price = '${price}', color = '{${data.colors}}', description = '${data.description}', category = '${data.productCategory}', subcategory = '${data.productSubCategory}' WHERE title = '${data.title}';`, (err, result) => {
                            if (err) return res.status(400).json({ status: 'failed' })
                            return res.status(200).json({ status: 'success' });
                        });
})

module.exports = router;
