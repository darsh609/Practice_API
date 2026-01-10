const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

//auth
exports.auth = async (req, res, next) => {
    try{

    //  console.log("Inside auth middleware",req..token);
       const token = req.cookies.token 
                 ||    req.header("Authorization").replace("Bearer ", "") || req.body.token ;


        console.log("Printing token from auth middleware ", token);
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json(
            {
            success:false,
            message:'Something went wrong while validating the token',
        }
    );
    }
}

//isStudent
exports.isUser = async (req, res, next) => {
 try{
        if(req.user.role !== "USER") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}

exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.role);
           if(req.user.role !== "ADMIN") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }