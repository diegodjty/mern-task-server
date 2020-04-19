const Project = require('../models/Project')
const {validationResult} = require('express-validator')
 
exports.createProjects = async (req, res)=>{


    // Check for error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }

    try {

        // Create new project
        const project = new Project(req.body)

        //Save create via JWT
        project.creator = req.user.id
        project.save();
        res.json(project)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured')
    }

}