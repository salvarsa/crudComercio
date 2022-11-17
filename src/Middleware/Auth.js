const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');

    //check if no token
    if (!token){
        console.log(token);
        return res.status(400).json({
            msg: 'No token, auth denied'
        })
    }

    //verify toke
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //SET USER ID IN REQ.USER
        req.user = decoded.user;
        next()
    } catch (error) {
        req.status(400).json({
            msg: 'Token is not valid'
        })
    }
}