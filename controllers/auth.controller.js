// const User = require('../models/userSchema')
// require('bcrypt')


const signup = (req,res) => {
    
    const {userName,email,password} = req.body;
    console.log(userName,email,password);
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
    });
}

const login = (req,res) => {
    
    const {email,password} = req.body;
    console.log(email,password);
    res.status(201).json({
        success: true,
        message: "User Logged in  Successfully",
    });
}

const forgotPassword = (req,res) => {
    
    const {email,password} = req.body;
    console.log(email,password);
    res.status(201).json({
        success: true,
        message: "User Password Changed  Successfully",
    });
}

module.exports =  {signup,login,forgotPassword} ;