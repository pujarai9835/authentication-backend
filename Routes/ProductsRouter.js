const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express') .Router();


router.get('/',ensureAuthenticated,(req,res)=>{
    console.log("....logged in user detail.....",req.user); 
req.status(200).json([
    {
     name:"mobile",
     price:"10000"
    },
    {
        name:"TV",
        price:"2000"
       }


])
});


module.exports = router;


