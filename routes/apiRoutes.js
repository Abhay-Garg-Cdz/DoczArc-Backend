const express = require("express");
const fileUpload = require("express-fileupload")

const doczarcRoute = express.Router();
const {signup,login,forgotPassword} = require("../controllers/auth.controller");
const {addDocument,getDocument,getDocumentList} = require("../controllers/docs.controller");


doczarcRoute.use(fileUpload());


doczarcRoute.post('/signup',signup);
doczarcRoute.post("/login",login);
doczarcRoute.post("/forgot-password",forgotPassword);
doczarcRoute.post("/addDocument",addDocument);
doczarcRoute.post("/getDocument",getDocument);
doczarcRoute.post("/getDocumentList",getDocumentList);

module.exports = doczarcRoute;