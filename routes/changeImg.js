const express = require('express');
const router = express.Router();
const multer = require('multer');
const { productModel } = require('../schema/schema');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), async (req, res) => {
    const img = req.file;
    const data = JSON.parse(req.body.data);
    console.log(img);
    console.log(data);
    
    try {
        
        
    } catch (error) {
        return res.status(500);
    }

})

module.exports = router;
