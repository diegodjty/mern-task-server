// Route to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// Create a user
// api/user
router.post('/',userController.createUser)

module.exports = router;