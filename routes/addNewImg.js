const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storeProductImg } = require('../public/utilities/utilities');
const path = require('path');
const { productModel } = require('../schema/schema');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const img = req.file;
    //if no data then abort
    console.log(img);
    if (!data || !img) return res.status(400).status({ status: 'invalid request' })
    const dir = path.join(__dirname, '..', `public/products/${data.category}`);
    const result = storeProductImg(dir, img, data.title, data.category);
    console.log(result);

    if (result.status === 'success' && result.url) {
        await productModel.findOne({ title: data.title }).then( async resp => {
            if (resp.$isEmpty()){
                return res.status(404).json({ status: 'failed' })
            }

            let imgs = resp.img;
            if (!imgs){
                imgs = {};
            }
            imgs[result.name] = result.url;
            console.log(imgs);

            await productModel.updateOne({ title: data.title }, {
                $set: {
                    img: imgs
                }
            }).then(fnl => res.status(200).json({ status: 'success' })).catch(err => res.status(400).json({ status: 'failed' }))
        }).catch(err => res.status(400).json({ status: 'failed' }));
    }
})

module.exports = router;
