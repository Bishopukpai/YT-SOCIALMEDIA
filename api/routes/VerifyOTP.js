const express = require('express')
const route = express.Router()
const OTPVerification = require('../models/OTPVerification')
const User = require('../models/Usermodels')
const bcrypt = require('bcrypt')

route.post("/verifyotp", async(req, res) => {
    try{
        let {userId, otp} = req.body

        if(userId == "" || otp == ""){
            res.status(400).json({
                message: "Please provide a one-time password!"
            })
        }else {
            const OTPVerificationRecord = await OTPVerification({userId})

            if(OTPVerificationRecord.length <= 0){
                res.status(400).json({
                    message: "Invalid Verification details!"
                })
            }else {
                const {expiresAt} = OTPVerificationRecord[0]
                const hashedOTP = OTPVerificationRecord[0].otp

                if(expiresAt < Date.now()){
                    await OTPVerification.deleteMany({userId})

                    await User.deleteOne({_id:userId})

                    res.status(400).json({
                        message: "One time password has expired! Please signup to get another one"
                    })
                }else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP)

                    if(!validOTP){
                        res.status(400).json({
                            message: "Invalid one time password!"
                        })
                    }else {
                        await User.updateOne({_id:userId}, {verified:true})

                        await OTPVerification.deleteMany(userId)

                        res.status(200).json({
                            message: "Verified!"
                        })
                    }
                }
            }
        }
    }catch (error){
        res.status(500).json({
            message: "Internal server error!"
        })
    }
})

module.exports = route