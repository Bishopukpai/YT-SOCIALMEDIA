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
    }
})

module.exports = router