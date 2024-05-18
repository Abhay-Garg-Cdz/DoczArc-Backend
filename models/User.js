const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    documents:[]
});



module.exports = mongoose.model('User', userSchema);