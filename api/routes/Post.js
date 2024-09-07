const router = require('express').Router();
const Post = require("../models/Postmodel")

router.post("/createpost", async(req, res)=> {

    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save()

        res.status(201).json({
            message: "Post was created!",
            post: savedPost
        })
    }catch{
      res.status(500).json({
        message: "Internal Server error"
      })  
    }
})

module.exports = router