const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {


    // Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    // extract email and pasword
    const {email,password}=req.body

    
    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User Exist'})
        }

        // create new user
        user = new User(req.body);

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password,salt)

        // save user
        await user.save()

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
        console.log(error);
        res.status(400).send('and error ocured')
    }

}