const Task = required('../models/Task.js')
const Project = required('../models/Project.js')
const {validationResult} = required('express-validator')
// Create new Task
exports.createTask = async( req, res) =>{
    // Check for error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }
}