const router = require('express').Router();
const User = require('../models/Usermodels')
const bcrypt = require('bcrypt')

router.post("/signin", (req, res)=> {
    let {email, password} = req.body;

    email = email.trim();
    password = password.trim();

    if(email == "" || password == ""){
        res.status(400).json({
            message: "All input fields are required!"
        })
    }else {
        User.find({email}).then(data => {
            if(data.length){
                if(!data[0].verified){
                    res.status(400).json({
                        message: "You are yet to verify your email address! Please check your spam or inbox for verification message"
                    })
                }else {
                    const hashedPassword = data[0].password

                    bcrypt.compare(password, hashedPassword).then(result => {
                        if(result){
                            res.status(200).json({
                                message: "You Signed successfully!"
                            })
                        }else {
                            res.status(400).json({
                                message: "Incorrect Password!"
                            })
                        }
                    }).catch(error => {
                        res.status(500).json({
                            message: "Internal server error"
                        })
                    })
                }
            }else {
                res.status(404).json({
                    message: "There is no user with the provided email address!"
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: "Internal server error"
            })
        })
    }
})

module.exports = router