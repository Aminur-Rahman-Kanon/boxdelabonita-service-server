const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const {productModel, hotDealsModel, popularProductsModel, trendingProductsModel, newArrivalsModel} = require('../schema/schema');

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), async (req, res) => {
    const img = req.file;
    const data = JSON.parse(req.body.data);

    switch(data.subCategory){
        case 'hot deals':
            try {
                const removeImgRef = ref(storage, `products/${data.category}/${data.title}/${data.currentImg}`);
                const addImgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
                const metadata = {
                    contentType: 'image/jpeg'
                }
        
                deleteObject(removeImgRef).then(async result => {
                    const product = await productModel.findOne({ title: data.title });
                    if (product){
                        const imgs = {...product.img};
                        const colors = [...product.color];
                        const color = colors.filter(clr => clr !== data.currentImg);
                        color.push(img.originalname);
                        delete imgs[data.currentImg];
                        const snapshot = await uploadBytesResumable(addImgRef, img.buffer, metadata);
                        await getDownloadURL(snapshot.ref).then(async url => {
                            imgs[img.originalname] = url;
                            await productModel.updateOne({ title: data.title }, {
                                $set: {
                                    color,
                                    img: imgs
                                }
                            }).then( async response => {
                                await hotDealsModel.updateOne({ title: data.title }, {
                                    $set: {
                                        color,
                                        img: imgs
                                    }
                                }).then(final => res.status(200).json({ status: 'success' }))
                                .catch(err => res.status(400).json({ status: 'failed' }))
                            })
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(500).json({ status: 'upload error' }))
                    }
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'new arrivals':
            try {
                const removeImgRef = ref(storage, `products/${data.category}/${data.title}/${data.currentImg}`);
                const addImgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
                const metadata = {
                    contentType: 'image/jpeg'
                }
        
                deleteObject(removeImgRef).then(async result => {
                    const product = await productModel.findOne({ title: data.title });
                    if (product){
                        const imgs = {...product.img};
                        const colors = [...product.color];
                        const color = colors.filter(clr => clr !== data.currentImg);
                        color.push(img.originalname);
                        delete imgs[data.currentImg];
                        const snapshot = await uploadBytesResumable(addImgRef, img.buffer, metadata);
                        await getDownloadURL(snapshot.ref).then(async url => {
                            imgs[img.originalname] = url;
                            await productModel.updateOne({ title: data.title }, {
                                $set: {
                                    color,
                                    img: imgs
                                }
                            }).then( async response => {
                                await newArrivalsModel.updateOne({ title: data.title }, {
                                    $set: {
                                        color,
                                        img: imgs
                                    }
                                }).then(final => res.status(200).json({ status: 'success' }))
                                .catch(err => res.status(400).json({ status: 'failed' }))
                            })
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(500).json({ status: 'upload error' }))
                    }
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'popular products':
            try {
                const removeImgRef = ref(storage, `products/${data.category}/${data.title}/${data.currentImg}`);
                const addImgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
                const metadata = {
                    contentType: 'image/jpeg'
                }
        
                deleteObject(removeImgRef).then(async result => {
                    const product = await productModel.findOne({ title: data.title });
                    if (product){
                        const imgs = {...product.img};
                        const colors = [...product.color];
                        const color = colors.filter(clr => clr !== data.currentImg);
                        color.push(img.originalname);
                        delete imgs[data.currentImg];
                        const snapshot = await uploadBytesResumable(addImgRef, img.buffer, metadata);
                        await getDownloadURL(snapshot.ref).then(async url => {
                            imgs[img.originalname] = url;
                            await productModel.updateOne({ title: data.title }, {
                                $set: {
                                    color,
                                    img: imgs
                                }
                            }).then( async response => {
                                await popularProductsModel.updateOne({ title: data.title }, {
                                    $set: {
                                        color,
                                        img: imgs
                                    }
                                }).then(final => res.status(200).json({ status: 'success' }))
                                .catch(err => res.status(400).json({ status: 'failed' }))
                            })
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(500).json({ status: 'upload error' }))
                    }
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'trending products':
            try {
                const removeImgRef = ref(storage, `products/${data.category}/${data.title}/${data.currentImg}`);
                const addImgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
                const metadata = {
                    contentType: 'image/jpeg'
                }
        
                deleteObject(removeImgRef).then(async result => {
                    const product = await productModel.findOne({ title: data.title });
                    if (product){
                        const imgs = {...product.img};
                        const colors = [...product.color];
                        const color = colors.filter(clr => clr !== data.currentImg);
                        color.push(img.originalname);
                        delete imgs[data.currentImg];
                        const snapshot = await uploadBytesResumable(addImgRef, img.buffer, metadata);
                        await getDownloadURL(snapshot.ref).then(async url => {
                            imgs[img.originalname] = url;
                            await productModel.updateOne({ title: data.title }, {
                                $set: {
                                    color,
                                    img: imgs
                                }
                            }).then( async response => {
                                await trendingProductsModel.updateOne({ title: data.title }, {
                                    $set: {
                                        color,
                                        img: imgs
                                    }
                                }).then(final => res.status(200).json({ status: 'success' }))
                                .catch(err => res.status(400).json({ status: 'failed' }))
                            })
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(500).json({ status: 'upload error' }))
                    }
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'none':
            try {
                const removeImgRef = ref(storage, `products/${data.category}/${data.title}/${data.currentImg}`);
                const addImgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
                const metadata = {
                    contentType: 'image/jpeg'
                }
        
                deleteObject(removeImgRef).then(async result => {
                    const product = await productModel.findOne({ title: data.title });
                    if (product){
                        const imgs = {...product.img};
                        const colors = [...product.color];
                        const color = colors.filter(clr => clr !== data.currentImg);
                        color.push(img.originalname);
                        delete imgs[data.currentImg];
                        const snapshot = await uploadBytesResumable(addImgRef, img.buffer, metadata);
                        await getDownloadURL(snapshot.ref).then(async url => {
                            imgs[img.originalname] = url;
                            await productModel.updateOne({ title: data.title }, {
                                $set: {
                                    color,
                                    img: imgs
                                }
                            }).then( async response => res.status(200).json({ status: 'success' }))
                            .catch(err => res.status(400).json({ status: 'failed' }))
                        }).catch(err => res.status(500).json({ status: 'upload error' }))
                    }
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        default:
            return res.status(202).json({ status: 'invalid request' })
    }

})

module.exports = router;
