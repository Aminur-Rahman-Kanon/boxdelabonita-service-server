const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const {productModel, hotDealsModel, newArrivalsModel, popularProductsModel, trendingProductsModel} = require('../schema/schema');

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

router.post('/', async (req, res) => {
    const { category, subCategory, img, title } = req.body;

    console.log(category, img, title)

    switch(subCategory){
        case 'hot deals':
            try {
                const imgRef = ref(storage, `products/${category}/${title}/${img}`);
        
                deleteObject(imgRef)
                .then(async result => {
                    await productModel.findOne({ title }).then(async response => {
                        const colors = [...response.color];
                        const color = colors.filter(clr => clr !== img);
                        const imgObj = response.img;
                        delete imgObj[img];
                        await productModel.updateOne({ title }, {
                            $set: {
                                color,
                                img: imgObj
                            }
                        }).then(async final => {
                            await hotDealsModel.updateOne({ title }, {
                                $set: {
                                    color,
                                    img: imgObj
                                }
                            }).then(final => res.status(200).json({ status: 'success' }))
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(400).json({ status: 'failed' }))
                    })
                })
                .catch(err => res.json({ status: 'failed' }));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'new arrivals':
            try {
                const imgRef = ref(storage, `products/${category}/${title}/${img}`);
        
                deleteObject(imgRef)
                .then(async result => {
                    await productModel.findOne({ title }).then(async response => {
                        const colors = [...response.color];
                        const color = colors.filter(clr => clr !== img);
                        const imgObj = response.img;
                        delete imgObj[img];
                        await productModel.updateOne({ title }, {
                            $set: {
                                color,
                                img: imgObj
                            }
                        }).then(async final => {
                            await newArrivalsModel.updateOne({ title }, {
                                $set: {
                                    color,
                                    img: imgObj
                                }
                            }).then(final => res.status(200).json({ status: 'success' }))
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(400).json({ status: 'failed' }))
                    })
                })
                .catch(err => res.json({ status: 'failed' }));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'popular products':
            try {
                const imgRef = ref(storage, `products/${category}/${title}/${img}`);
        
                deleteObject(imgRef)
                .then(async result => {
                    await productModel.findOne({ title }).then(async response => {
                        const colors = [...response.color];
                        const color = colors.filter(clr => clr !== img);
                        const imgObj = response.img;
                        delete imgObj[img];
                        await productModel.updateOne({ title }, {
                            $set: {
                                color,
                                img: imgObj
                            }
                        }).then(async final => {
                            await popularProductsModel.updateOne({ title }, {
                                $set: {
                                    color,
                                    img: imgObj
                                }
                            }).then(final => res.status(200).json({ status: 'success' }))
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(400).json({ status: 'failed' }))
                    })
                })
                .catch(err => res.json({ status: 'failed' }));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'trending products':
            try {
                const imgRef = ref(storage, `products/${category}/${title}/${img}`);
        
                deleteObject(imgRef)
                .then(async result => {
                    await productModel.findOne({ title }).then(async response => {
                        const colors = [...response.color];
                        const color = colors.filter(clr => clr !== img);
                        const imgObj = response.img;
                        delete imgObj[img];
                        await productModel.updateOne({ title }, {
                            $set: {
                                color,
                                img: imgObj
                            }
                        }).then(async final => {
                            await trendingProductsModel.updateOne({ title }, {
                                $set: {
                                    color,
                                    img: imgObj
                                }
                            }).then(final => res.status(200).json({ status: 'success' }))
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(400).json({ status: 'failed' }))
                    })
                })
                .catch(err => res.json({ status: 'failed' }));
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'none':
            try {
                const imgRef = ref(storage, `products/${category}/${title}/${img}`);
        
                deleteObject(imgRef)
                .then(async result => {
                    await productModel.findOne({ title }).then(async response => {
                        const colors = [...response.color];
                        const color = colors.filter(clr => clr !== img);
                        const imgObj = response.img;
                        delete imgObj[img];
                        await productModel.updateOne({ title }, {
                            $set: {
                                color,
                                img: imgObj
                            }
                        }).then(final => res.status(200).json({ status: 'success' })).catch(err => res.status(400).json({ status: 'failed' }))
                    })
                })
                .catch(err => res.json({ status: 'failed' }));
            } catch (error) {
                return res.status(500);
            }
            break;

        default:
            return res.status(400).json({ status: 'invalid request' })
    }
    
})

module.exports = router;
