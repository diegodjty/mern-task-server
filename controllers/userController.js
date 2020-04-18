const User = require('../models/User')
const bcryptjs = require('bcryptjs')

exports.createUser = async (req, res) => {

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

        // Confirmation message
        res.json({msg: 'User Create corectly'})

    } catch (error) {
        console.log(error);
        res.status(400).send('and error ocured')
    }

}