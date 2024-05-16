const mongoose = require("mongoose");
require("dotenv").config();

dbConnect = async () => {
  try{
    await mongoose.connect(process.env.DATABASE_URI);
  }catch(error) {
    console.log("Database Error: -- "+ error);
  }
};

module.exports = dbConnect;