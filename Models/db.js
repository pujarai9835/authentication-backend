const mongoose = require('mongoose');
const mongo_url= process.env.URI;

mongoose.connect(mongo_url).then(()=>{
    console.log('mongoDB is connected.....');
}).catch((error)=>{
console.log("mongoDB  connection Error:",error)
})