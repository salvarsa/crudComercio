const express = require('express');
const router = express.Router();
const categoryModule = require('../models/Category');
const userModule = require('../models/User');
const auth = require('../Middleware/Auth');
const adminAuth = require('../Middleware/Admin');

const {check, validationResult} = require('express-validator');

router.post('/', [
    check('name', 'Name is required').trim().not().isEmpty()
], auth, adminAuth, async(req, res) => {
    const user = await userModule.findOne({
        _id: req.user.id,
    });
    res.send(user);
})

module.exports = router;