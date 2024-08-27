const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
       type: String,
       required: true,
       max: 50,
       unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,   
    },
    dateOfbirth: {
        type: Date,  
    },
    verified: Boolean,
    profilephoto: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        max: 100   
    },
    currentcity : {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    worksAt: {
        type: String,
        max: 100
    },
},
{timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)