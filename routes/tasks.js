const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

// Create a task
// api/task
router.post('/',
    auth,
    [
        check('name','Name is required').not().isEmpty(),
        check('project','Project is required').not().isEmpty()
    ],
    taskController.createTask
)

router.get('/',
    auth,
    taskController.getTask
)

module.exports = router;