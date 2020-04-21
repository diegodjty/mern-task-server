const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');


exports.authUser = async (req,res) =>{
    // Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    // extract email and passwrod
    const {email, password} = req.body


    try {
        
        // Check if the user exist
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({msg: 'User dosnt exist'})
        }

        // check password
        const correctPass = await bcryptjs.compare(password, user.password)
        if(!correctPass){
            return res.status(400).json({msg: 'Incorrect password'})
        }

        // If everything is correct

        // Create and sign JWT
        const paylod = {
            user: {
                id: user.id
            }
        };

        // sign the JWT
        jwt.sign(paylod,process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (error, token)=>{
            if(error) throw error;

            // Confirmation message
            res.json({token})

        });
    
    } catch (error) {
        console.log(error)
    }

}

exports.authUser = async (req, res) =>{

    try {

        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (error) {
        console.log()
        res.status(500).json({msg:'An error occured'})
    }
}