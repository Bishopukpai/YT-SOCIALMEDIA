const router = require('express').Router()

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
    }
})

module.exports = router