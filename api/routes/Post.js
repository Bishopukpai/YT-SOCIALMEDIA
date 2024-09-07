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

router.delete("/deletepost/:id", async(req, res)=> {
    try{
        const post = await Post.findById(req.params.id)
    
        let {userId} = req.body;

        if(post.userId === userId){
            await post.deleteOne()

            res.status(200).json({
                message: "Post deleted!"
            })
        }else {
            res.status(400).json({
                message: "You cannot delete this post!"
            })
        }
    }catch{
       res.status(500).json({
           message: "Internal error"
       }) 
    }
})

router.put("/like/:id", async(req, res)=> {
    const post = await Post.findById(req.params.id)

    let {userId} = req.body;

    if(!post.likes.includes(userId)){
        await post.updateOne({$push: {likes: userId}})

        res.status(200).json({
            message: "You liked this post!"
        })
    }else {
        await post.updateOne({$pull: {likes: userId}})

        res.status(200).json({
            message: "You unliked this post!"
        })
    }
})

module.exports = router