const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){
    // Reat Header Token
    const token = req.header('x-auth-token');

    // Check if there is a token
    if(!token){
        return res.status(401).json({msg: "Denied permit"})
    }
    // Validate token

    try {
        const encrypted = jwt.verify(token,process.env.SECRET)
        req.user = encrypted.user;
        next()
    } catch (error) {
        res.status(401).json({msg: "token not valid"})
    }
}