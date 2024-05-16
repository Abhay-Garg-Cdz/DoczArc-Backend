const express = require("express");
const doczarcRoute = express.Router();
const {signup,login,forgotPassword} = require("../controllers/auth.controller");




doczarcRoute.post('/signup',signup);
doczarcRoute.post("/login",login);
doczarcRoute.post("/forgot-password",forgotPassword);

module.exports = doczarcRoute;