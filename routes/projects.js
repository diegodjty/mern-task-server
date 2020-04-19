const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
// Create projects
//
router.post('/',
    auth,
    projectController.createProjects
)
router.get('/',
    auth,
    projectController.createProjects
)

module.exports = router;