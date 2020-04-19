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

        //Save creator via JWT
        project.creator = req.user.id
        project.save();
        res.json(project)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured')
    }

}

// Get all the project from the actual user
exports.getProjects = async (req, res) => {


    try {
        
        const projects = await Project.find({ creator: req.user.id});
        res.json({projects})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error ocured')
    }
}

// Update Project

exports.updateProject = async (req, res) =>{
        
      // Check for error
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(401).json({errors: errors.array()})
      }

      // extract info from project
      const {name} = req.body

      const newProject = {};

      if(name) {
          newProject.name = name;
      }


      try {
        // Check ID
        let project = await Project.findById(req.params.id);
        // If Project exist or not
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //Verify project creator
        if(project.creator.toString()!== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }
        
        project = await Project.findByIdAndUpdate({_id: req.params.id},{$set : newProject}, {new: true})
        res.json({project})
    } catch (error) {
          console.log(error)
          res.status(500).send('Server error')
      }

}

// Delete a priject by ID

exports.deleteProject = async(req,res) =>{

    
    try {

         // Check ID
         let project = await Project.findById(req.params.id);
         // If Project exist or not
         if(!project){
             return res.status(404).json({msg: 'Project not found'})
         }
         //Verify project creator
         if(project.creator.toString()!== req.user.id){
             return res.status(401).json({msg: 'Not authorized'})
         }
         
         // Delete project
         await Project.findOneAndRemove({_id: req.params.id})
         res.json({msg: 'Project deleted'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }

}