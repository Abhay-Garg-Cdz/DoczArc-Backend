const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const signup = async (req, res) => {
  
  let { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(203).json({
      success: false,
      message: "Please provide all the required fields",
    });
    return;
  }
    
  userName = userName.toLowerCase();
  const folderName = path.join('E:','Projects','DoczArc','user_docs',userName);  

  const existingUser = await User.findOne({ userName: userName });
  if (existingUser) {
    res.status(203).json({
      success: false,
      message: "User Already Exists",
    });
    return;
  }

  //Create the user
  const user = await User.create({ userName, email, password });
  //  create folder in the directory under user name
if(user){
    fs.mkdir(folderName,{ recursive: true },(err)=>{
        if(err) {
            console.log(err);
            return err};
        // console.log("Directory Created")
      });

      res.status(201).json({
        success: true,
        message: "Signup Successfully",
      });
}
  
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(203)
      .json({ success: false, message: "Email or Password Missing" });
    return;
  }
  const user = await User.findOne({ email: email, password: password });
  // console.log(user);
  if (user) {
    res.status(201).json({
      success: true,
      userName: user.userName,
      message: "Logged in  Successfully",
    });
  } else {
    res.status(203).json({
      success: false,
      message: "Please Enter correct credentials!!",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    await User.updateOne({ email: email }, { $set: { password: password } });
    res.status(201).json({
      success: true,
      message: "Password Changed  Successfully",
    });
  } else {
    res.status(203).json({
      success: false,
      message: "Email Not Matched!!!",
    });
  }
};

module.exports = { signup, login, forgotPassword };
