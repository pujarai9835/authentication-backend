const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors  = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductsRouter')

require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 8080;
app.get('/callserver',(req,res)=>{
    res.send('hello our server is running on port 8080');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter );
app.use('/products',ProductRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
}) 