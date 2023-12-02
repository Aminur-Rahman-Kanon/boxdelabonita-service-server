const express = require('express');
const router = express.Router();
const adminModel = require('../schema/schema').adminModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await adminModel.findOne({ email });
        if (!userExist) return res.json({ status: 'user not found' });
    
        const passCheck = await bcrypt.compare(password, userExist.password);
    
        if (passCheck){
            const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            return res.status(200).json({ status: 'success', data: token })
        }
        else {
            return res.json({ status: 'invalid password' });
        }
    } catch (error) {
        return res.status(500);
    }
})

module.exports = router;
