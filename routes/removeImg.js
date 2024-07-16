const express = require('express');
const router = express.Router();
const { productModel } = require('../schema/schema');
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
    
    const { category, imgId, title } = req.body;

    if (!category && !!imgId && !title) return res.status(403).json({ status: 'bad request' })

    try {
        const filePath = path.join(__dirname, '..', 'public', 'products', `${category}`, `${title}`, `${imgId}`);
        const fileExist = fs.existsSync(filePath);
        if (fileExist){
            try {
                fs.unlinkSync(filePath, err => {
                    if (err) return res.status(404).json({ status: 'failed' })
                })
                //update database
                await productModel.findOne({ title }).then(async result => {
                    const imgs = result.img || {};
                    if (Object.keys(imgs).length){
                        delete imgs[imgId];
                        await productModel.updateOne({ title }, {
                            $set: {
                                img: imgs
                            }
                        }).then(final => res.status(200).json({ status: 'success' })).catch(err => res.status(404).json({ status: 'failed' }))
                    }
                    else {
                        return res.status(500).json({ status: 'failed' })
                    }
                })
            } catch (error) {
                return res.status(500).json({ status: 'failed' });
            }
        }
        else {
            await productModel.findOne({ title }).then(async prd => {
                const imgs = prd.img || {};
                if (Object.keys(imgs).length){
                    delete imgs[imgId];
                    await productModel.updateOne({ title }, {
                        $set: {
                            img: imgs
                        }
                    })
                    .then(final => res.status(200).json({ status: 'success' }))
                    .catch(err => res.status(404).json({ status: 'failed' }));
                }
                else {
                    return res.status(404).json({ status: 'file not found' });
                }
            })
        }
    }
    catch (error) {
        return res.status(500);
    }

})

module.exports = router;
