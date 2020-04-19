const Project = require('../models/Project')

exports.createProjects = async (req, res)=>{

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