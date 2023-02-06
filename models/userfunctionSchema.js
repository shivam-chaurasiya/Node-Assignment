const mongoose = require('mongoose');

const UserfunctionSchema = new mongoose.Schema({
    firstname:String,
    lastname: String,
    gender: String,
    email:String,
    phone: Number,
    password:String
})

module.exports = mongoose.model('UserCREATE', UserfunctionSchema);