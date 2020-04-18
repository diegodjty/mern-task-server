// Route to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {check} = require('express-validator')
// Create a user
// api/user
router.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'The Passwrod needs to be 6 characters lenght').isLength({min:6})
],
userController.createUser)

module.exports = router;