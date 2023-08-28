const express = require('express');
const router = express.Router();
const adminModel = require('../schema/schema').adminModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const userExist = await adminModel.findOne({ email });
    if (!userExist) return res.json({ status: 'user not found' });

    await bcrypt.compare(password, userExist.password).then(result => {
        if (result === true) {
            const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            return res.json({ status: 'success', data: token })
        }
        else {
            return res.json({ status: 'invalid password' })
        }
    }).catch(err => {
        res.status(410);
    })
})

module.exports = router;
