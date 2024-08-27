const express = require('express');
require('./config/databaseConfig')
const helmet = require('helmet');
const morgan = require('morgan')


const app = express()

const port = 9090;

app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
}) 