const jwt = require('jsonwebtoken')
const jwtAuthKey ="abhishekdemokey";

module.exports = (req,res,next) => {
    try{
        console.log("auth request -> ")
        console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,jwtAuthKey);
        req.userData = decoded;
        next();
    }catch(err){
        //console.log(err)
        return res.status(401).json({
            message: 'Authentication Failed'
        })
    }
}
