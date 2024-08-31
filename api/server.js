const express = require('express');
require('./config/databaseConfig')
const helmet = require('helmet');
const morgan = require('morgan')

const userRoute = require('./routes/User')
const signupRoute = require('./routes/Signup')
const signinRoute = require('./routes/Signin')
const verifyotpRoute = require('./routes/VerifyOTP')

const app = express()

const port = 9090;

app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/user", userRoute)
app.use('/api/auth', signupRoute)
app.use('/api/auth', signinRoute)
app.use("/api/user", verifyotpRoute)


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
}) 