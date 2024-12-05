
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next)=>{
    const auth = req.headers['authorization'];
    if (!auth) {

        return res.status(403)
        .json({ message: "unauthorized,JWT Token Is Required" })
    }
    try{
        const decoded = jsw.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
     catch(error){
        return res.status(403)
        .json({ message: "unauthorized,JWT Token Is expired or wrong" }) 

    }

}
module.exports = ensureAuthenticated;