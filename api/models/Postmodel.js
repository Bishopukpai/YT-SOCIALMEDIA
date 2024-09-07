const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        max: 5000
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
},
{timestamps: true}
)

module.exports = mongoose.model("Post", PostSchema)