const express = require('express')
const route = express.Router()

route.post("/verifyotp", async(req, res) => {
    try{
        let {userId, otp} = req.body

        if(userId == "" || otp == ""){
            res.status(400).json({
                message: "Please provide a one-time password!"
            })
        }
    }catch (error){
        res.status(500).json({
            message: "Internal server error!"
        })
    }
})