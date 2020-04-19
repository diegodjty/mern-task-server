const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
// Create projects
//
router.post('/',
    auth,
    [
        check('name','The name is required').not().isEmpty()
    ],
    projectController.createProjects
)
router.get('/',
    auth,
    projectController.createProjects
)

module.exports = router;