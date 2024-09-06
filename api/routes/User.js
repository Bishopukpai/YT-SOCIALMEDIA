const router = require('express').Router()
const User = require('../models/Usermodels')

router.get("/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id)

        const {password, updatedAt, verified, ...other} = user._doc

        res.status(200).json(other)
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.put("/updateprofile/:id", async(req, res) => {
    let {userId} = req.body;

    if(userId === req.params.id){
        try{
            const user = await User.findByIdAndUpdate(userId, {$set: req.body})

            res.status(200).json({
                message: "Profile updated!"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal Server error"
            })
        }
    }else {
        res.status(403).json({
            message: "You cannot update this profile"
        })
    }
})

router.delete("/deleteprofile/:id", async(req, res) => {
    let {userId} = req.body;

    if(userId === req.params.id){
        try{
            const user = await User.findByIdAndDelete(userId)

            res.status(200).json({
                message: "Account deleted!"
            })
        }catch(error){
            res.status(500).json({
                message: "Internal error"
            })
        }
    }else {
        return res.status(403).json({
            message: "You cannot delete this account!"
        })
    }
})

router.put("/follow/:id", async(req, res) => {
    let {userId} = req.body;

    if(userId !== req.params.id){
        try{
            const friend = await User.findById(req.params.id)
            const user = await User.findById(userId)

            if(!friend.followers.includes(userId)){
                await friend.updateOne({$push:{followers:userId}})
                await user.updateOne({$push:{followings:req.params.id}})

                res.status(200).json({
                    message: "Followed!"
                })
            }else {
                await friend.updateOne({$pull:{followers:userId}})
                await user.updateOne({$pull:{followings:req.params.id}})

                res.status(200).json({
                    message: "You unfollowed this user!"
                })
            }
        }catch(error){
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }else {
        res.status(403).json({
            message: "You cannot follow yourself"
        })
    }
})

module.exports = router