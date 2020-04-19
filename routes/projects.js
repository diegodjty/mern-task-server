const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')
// Create projects
//
router.post('/',
    projectController.createProjects
)

module.exports = router;