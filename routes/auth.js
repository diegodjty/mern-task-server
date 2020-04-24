// Route to authenticate users
const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')
// Create a user
// api/auth

router.post('/',
    authController.authUser
)
router.get('/',
    auth,
    authController.getUser
)

module.exports = router;