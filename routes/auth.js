// Route to authenticate users
const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const authController = require('../controllers/authController')
// Create a user
// api/user
router.post('/',
[
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The Passwrod needs to be 6 characters lenght').isLength({min:6})
],
authController.authUser)

module.exports = router;