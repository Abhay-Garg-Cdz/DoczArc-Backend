const path = require("path");
const fs = require("fs");
const User = require("../models/User");


const addDocument = async(req,res)=>{
    if(req.body.userName && req.files.file){
        const {userName,document_name} = req.body;
        const {file} = req.files;
        
        file.name = document_name+path.extname(file.name);
        
        const existingUser = await User.findOne({ userName: userName });
        
        if(existingUser){
        let {documents} = existingUser;
        documents = [...documents, document_name];
        await User.updateOne({ userName: userName },{$set:{documents:documents}})

        //Save Doc in directory
        
       const filePath =  path.join('E:','Projects','DoczArc','user_docs',userName,file.name);
    //    console.log(filePath)
            file.mv(filePath)
            res.status(201).json({
               success: true,
               message: "Document Uploaded",
           })
        }
        else{
        res.status(203).json({
            success: false,
            message: "User doesn't exist",
          });
        }
    }
    else {
        res.status(203).json({
          success: false,
          message: "Error Occured uploading file!!",
        });
      }

    
}





const getDocument = async(req,res)=>{
    if(req.body.userName){
        const {userName,document_name} = req.body;
        
        
        const existingUser = await User.findOne({ userName: userName });
        
        if(existingUser){
            
            
            const filePath =  path.join('E:','Projects','DoczArc','user_docs',userName,document_name);
            

            

            res.status(201).json({
               success: true,
               message: "Document Send Successfully",
              
           })
        }
        else{
        res.status(203).json({
            success: false,
            message: "User doesn't exist",
          });
        }
    }
    else {
        res.status(203).json({
          success: false,
          message: "Please login First",
        });
      }
}






const getDocumentList= async(req,res)=>{
    if(!req.body.userName){
        return res.status(203).json({
            success:false,
            message:"Please send the username or login first !"
        })
    }
    const {userName} = req.body;
    const user = await User.findOne({ userName: userName });
    if(user){
        const documents = user.documents;
        res.status(201).json({
            success:true,
            documents: documents,
            message: "List of Documents of user send",
        })
    }
    else{
        res.status(203).json({
            success:false,
            message: "User doesn't exist",
        })
    }
}



module.exports = {addDocument, getDocument, getDocumentList}   ; 