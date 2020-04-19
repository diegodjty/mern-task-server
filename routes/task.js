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
        check('name','Name is requires').not().isEmpty()
    ],
    taskController.createTask
)

module.exports = router