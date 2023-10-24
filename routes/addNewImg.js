const express = require('express');
const router = express.Router();
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject } = require('firebase/storage');
const firebaseConfig = require('../public/firebase/firebase');
const { productModel, hotDealsModel, newArrivalsModel, popularProductsModel, trendingProductsModel } = require('../schema/schema');

const upload = multer({ storage: multer.memoryStorage() })

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

router.post('/', upload.single('photo'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const img = req.file;

    if (!data || !img) return res.status(400).status({ status: 'invalid request' })

    const imgRef = ref(storage, `products/${data.category}/${data.title}/${img.originalname}`);
    const metadata = {
        contentType: 'image/jpeg'
    }

    switch(data.subCategory){
        case 'hot deals':
            try {
                const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);
                await getDownloadURL(snapshot.ref).then(async url => {
                    const product = await productModel.findOne({ title: data.title });
                    if (!product) return res.status(400).json({ status: 'not found' });
                    const color = [...product.color];
                    const imgs = {...product.img};
                    color.push(img.originalname)
                    imgs[img.originalname] = url;
            
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            color,
                            img: imgs
                        }
                    }).then(async success => {
                        await hotDealsModel.updateOne({ title: data.title }, {
                            $set: {
                                color,
                                img: imgs
                            }
                        }).then(final => res.status(200).json({ status: 'success' }))
                        .catch(err => res.status(400).json({ status: 'failed' }))
                    }).catch(err => res.status(400).json({ status: 'failed' }))
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'new arrivals':
            try {
                const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);
                await getDownloadURL(snapshot.ref).then(async url => {
                    const product = await productModel.findOne({ title: data.title });
                    if (!product) return res.status(400).json({ status: 'not found' });
                    const color = [...product.color];
                    const imgs = {...product.img};
                    color.push(img.originalname)
                    imgs[img.originalname] = url;
            
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            color,
                            img: imgs
                        }
                    }).then(async success => {
                        await newArrivalsModel.updateOne({ title: data.title }, {
                            $set: {
                                color,
                                img: imgs
                            }
                        }).then(final => res.status(200).json({ status: 'success' }))
                        .catch(err => res.status(400).json({ status: 'failed' }))
                    }).catch(err => res.status(400).json({ status: 'failed' }))
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'popular products':
            try {
                const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);
                await getDownloadURL(snapshot.ref).then(async url => {
                    const product = await productModel.findOne({ title: data.title });
                    if (!product) return res.status(400).json({ status: 'not found' });
                    const color = [...product.color];
                    const imgs = {...product.img};
                    color.push(img.originalname)
                    imgs[img.originalname] = url;
            
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            color,
                            img: imgs
                        }
                    }).then(async success => {
                        await popularProductsModel.updateOne({ title: data.title }, {
                            $set: {
                                color,
                                img: imgs
                            }
                        }).then(final => res.status(200).json({ status: 'success' }))
                        .catch(err => res.status(400).json({ status: 'failed' }))
                    }).catch(err => res.status(400).json({ status: 'failed' }))
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'trending products':
            try {
                const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);
                await getDownloadURL(snapshot.ref).then(async url => {
                    const product = await productModel.findOne({ title: data.title });
                    if (!product) return res.status(400).json({ status: 'not found' });
                    const color = [...product.color];
                    const imgs = {...product.img};
                    color.push(img.originalname)
                    imgs[img.originalname] = url;
            
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            color,
                            img: imgs
                        }
                    }).then(async success => {
                        await trendingProductsModel.updateOne({ title: data.title }, {
                            $set: {
                                color,
                                img: imgs
                            }
                        }).then(final => res.status(200).json({ status: 'success' }))
                        .catch(err => res.status(400).json({ status: 'failed' }))
                    }).catch(err => res.status(400).json({ status: 'failed' }))
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        case 'none':
            try {
                const snapshot = await uploadBytesResumable(imgRef, img.buffer, metadata);
                await getDownloadURL(snapshot.ref).then(async url => {
                    const product = await productModel.findOne({ title: data.title });
                    if (!product) return res.status(400).json({ status: 'not found' });
                    const color = [...product.color];
                    const imgs = {...product.img};
                    color.push(img.originalname)
                    imgs[img.originalname] = url;
            
                    await productModel.updateOne({ title: data.title }, {
                        $set: {
                            color,
                            img: imgs
                        }
                    }).then(async success => res.status(200).json({ status: 'success' })).catch(err => res.status(400).json({ status: 'failed' }))
                })
            } catch (error) {
                return res.status(500);
            }
            break;

        default:
            return res.status(400).json({ status: 'invalid request' });
    }

})

module.exports = router;
