const router = require('express').Router()
const User = require('../models/Usermodels')
const bcrypt = require('bcrypt')
const OTPVerification = require('../models/OTPVerification')
const nodemailer = require('nodemailer');

require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

transporter.verify((error, success) => {
    if(error){
        console.log(error)
    }else {
        console.log("Transporter is working perfectly!")
        console.log(success)
    }
})

router.post("/signup", async(req, res) => {
    let {fullname, username, email, password, dateOfbirth} = req.body

    fullname = fullname.trim()
    username = username.trim()
    email = email.trim()
    password = password.trim()
    dateOfbirth = dateOfbirth.trim()

    if(fullname == "" || username == "" || email == "" || password == "" || dateOfbirth == ""){
        res.status(400).json({
            message: "All input are required! Please make sure you complete each field with the required data"
        })
    }else if(!/^[a-zA-Z ]*$/.test(fullname)){
        res.status(400).json({
            message: "Your name can only have alphabets"
        })
    }else if(!/^[a-zA-Z]*$/.test(username)){
        res.status(400).json({
            message: "This username is not valid, please remove white spaces and numbers"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.status(400).json({
            message: "Please provide a valid email address!"
        })
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8}$/.test(password)){
        res.status(400).json({
            message: "A strong password should be at least 8 characters long and have at least one uppercase and lower case  letter a number and any special character "
        })
    }else {
       User.find({email}).then(result => {
            if(result.length){
                res.status(400).json({
                    message: "There is a user with this provided email address! Please log in instead"
                })
            }else {
                const saltRounds = 10;

                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        fullname,
                        username,
                        email,
                        password:hashedPassword,
                        dateOfbirth,
                        verified:false
                    })

                   newUser.save().then(result => {
                        sendOTP(result, res)
                   }).catch(error => {
                    console.log(error)
                   })
                }).catch(error => {
                    console.log(error)
                })
            }
       }).catch(error => {
            console.log(error)
       })
    }
})

const sendOTP = async ({_id, email}, res) => {
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Please Verify Your Account",
            html: `<p>Welcome to our application.</p><p>Please use the code below to verify your account</p><p><b>${otp}</b></p><p>This is a one time password and will expire in one hour</p>`
        }

        const saltRounds = 10;
        hashedOTP = await bcrypt.hash(otp, saltRounds)

        const newOTPVerification = new OTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })

        await newOTPVerification.save().then()
    }catch(error){
        console.log(error)
    }
}
module.exports = router