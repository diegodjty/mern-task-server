const Task = require('../models/Task.js')
const Project = require('../models/Project.js')
const {validationResult} = require('express-validator')
// Create new Task
exports.createTask = async( req, res) =>{
    // Check for error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }

    

    try {
        // Extrack project and check if exist
        const {project} = req.body

        const projectExist = await Project.findById(project);
        if(!projectExist){
            return res.status(404).json({msg: 'Project not found'})
        }

        //Verify project creator
        if(projectExist.creator.toString()!== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }

        // Create task
        const task = new Task(req.body);
        await task.save();
        res.json({task})

    } catch (error) {
        console.log(error)
        res.status(500).send("an error occured")
    }
}

exports.getTask = async (req, res) =>{

    try {
        // Extrack project and check if exist
        const {project} = req.body

        const projectExist = await Project.findById(project);
        if(!projectExist){
            return res.status(404).json({msg: 'Project not found'})
        }

        //Verify project creator
        if(projectExist.creator.toString()!== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }

        // Get task by project
        const task = await Task.find({ project })
        res.json(task)
       
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured')
    }
}

exports.updateTask = async (req,res) =>{

    try {

        // Extrack project and check if exist
        const {project,name,status} = req.body

        // Check if task exist
        let task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({msg: 'Task dosnt exist'})
        }

        const projectExist = await Project.findById(project);
        

        //Verify project creator
        if(projectExist.creator.toString()!== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }

        // Create object with new info
        const newTask = {};

        if(name)newTask.name = name;
        if(status)newTask.status = status;

        // Save Task
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})
        res.json({task})
        
    } catch (error) {
        res.status(500).send('An error ocured')
    }

}