const router = require('express').Router()
const User = require('../models/Usermodels')
const bcrypt = require('bcrypt')

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

module.exports = router