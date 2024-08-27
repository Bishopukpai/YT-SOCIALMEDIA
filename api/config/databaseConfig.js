require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL).then(()=> {
   console.log("Connection to database was successful") 
}).catch((error) => {
    console.log(error)
})