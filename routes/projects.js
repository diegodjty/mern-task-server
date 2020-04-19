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
// Get projects
router.get('/',
    auth,
    projectController.getProjects
)

//Update projects
router.put('/:id',
    auth,
    [
        check('name','The name is required').not().isEmpty() 
    ],
    projectController.updateProject
)
// Delete projects
router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router;