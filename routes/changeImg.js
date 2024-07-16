const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const fs = require('fs');
const path = require('path');

router.post('/', upload.single('photo'), async (req, res) => {
    const img = req.file;
    const data = JSON.parse(req.body.data);

    if (!data && !img) return res.status(403).json({ status: 'invalid request' });
    
    try {
        const filePath = path.join(__dirname, '..', 'public', 'products', `${data.category}`, `${data.title}`, `${data.imgId}`)
        const fileExist = fs.existsSync(filePath);
        
        if (fileExist){
            try {
                fs.writeFile(filePath, img.buffer, err => {
                    if (err){
                        return res.status(501).json({ status: 'file not saved' });
                    }
                })
                return res.status(200).json({ status: 'success' })
            } catch (error) {
                return res.status(501).json({ status: 'file not saved' })
            }
        }
        else {
            return res.status(404).json({ status: 'failed' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'server error' });
    }
})

module.exports = router;
