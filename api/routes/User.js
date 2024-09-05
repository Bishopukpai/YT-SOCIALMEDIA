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

module.exports = router