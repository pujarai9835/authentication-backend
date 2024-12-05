
const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken')

const signup = async (req,res) => {
    try {
        // console.log("##",req.body);
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (user) {
            return res.status(409).json({ message: "user is already exist,you can login", success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "signup successfully",
                success: true
            })

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false
        })

    }

}


const login = async (req,res) => {
    try {
        // console.log("##",req.body);
        const {  email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const  errormsg= "Authentication Failed:Email or Password is wrong";
        
        if (!user) {
            return res.status(403).json({message:errormsg, success: false });
        }

        const isPasswordEqual= await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){

            return res.status(403)
            .json({message:errormsg, success: false });
        }
        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id },
              process.env.JWT_SECRET,
              {expiresIn:'24h'}
        )
         
        res.status(200)
            .json({
                message: "login success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false
        })

    }

}



module.exports = {
    signup,
    login
}



// Controllers/AuthController.js
// exports.signup = (req, res) => {
//     // Your signup logic here
//     res.send('Signup successful!');
// };
