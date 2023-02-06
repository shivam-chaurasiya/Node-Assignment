const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userid:mongoose.Schema.Types.ObjectId,
    Title: String,
    description: String
})

module.exports = mongoose.model('PostUser', PostSchema);