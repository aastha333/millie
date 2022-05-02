//const passport =require("passport") ;
//import dotenv from "dotenv";
//const strategy =require("passport-facebook") ;
//const FacebookStrategy = strategy.Strategy;
const userProfile = require('../model/userProfile')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users=require('../services/user');
const otpResetPwd = require("../model/otpResetPwd");
const otpLogin = require('../model/otpLogin');
const social=require('../model/socialLogin')
const {ObjectId}=require('bson')
 

// const loginProfile=async(req,res)=>
//     {
//         userProfile.find({ email:req.body.email})
//         .exec()
//         .then(data=>
//             {
//                 if(data.length<1)
//                 {
//                     return res.status(401).json({
//                         message: "user not found"
//                     })
//                 }
//                 else{
//                     var privateKey="csfrdtfynumj447678uyueewfeacdsz";
//                     //console.log("blablabla")
//                     bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
//                         console.log("blala")
//                         if(!result){
//                             res.status(401).json({
//                                 message:"password matching fail"
//                             })
//                         }
//                         if(result)
//                         {
//                             console.log(result)
//                             const token =jwt.sign({
//                                 //name:data[0].name,
//                                 //email:data[0].email,
//                                 id:data[0]._id
//                             },
//                             privateKey,
//                             {
//                                 expiresIn:"24h"
//                             }
//                             );
//                             res.status(200).send ({
//                                 "status": "true",
//                                 "msg": "Successfully login",
//                                 "response": data,
//                                 "code":200,
//                                 "error": {
//                                 },
//                                 token:token
//                             })
//                         }
//                     })
//                 }
//             })
//             .catch(err=>
//                 {
//                     res.status(500).json(
//                         {
//                             "status": true,
//                             "response": null,
//                             "code": 200,
//                             "error": {
//                             "errCode": "FAILED",
//                             "errMsg": "Failed to login"
//                             },
//                         })
//                 })
//     }

// const socialLogin=async(req,res)=>{
//     users.findEmail(userProfile,req.body.email).then((data)=>{
//         if(data){
//            // console.log(data)
//            const id=data._id
//         users.findSocial(social,id,req.body.socialType).then((result)=>{
//             //console.log(result)
//             var privateKey="csfrdtfynumj447678uyueewfeacdsz";
//             if(result==null){
//                 const val={
//                     userId:id,
//                     socialType:req.body.socialType,
//                     socialId:req.body.socialId,
//                 }
//                 users.create(social,val).then(value=>{
//                     const token =jwt.sign({
//                         //name:data[0].name,
//                         //email:data[0].email,
//                         id:id
//                     },
//                     privateKey,
//                     {
//                         expiresIn:"24h"
//                     }
//                     );
//                     res.status(200).send ({
//                         "status": "true",
//                         "msg": "Successfully login",
//                         "response": data,
//                         "code":200,
//                         "error": {
//                         },
//                         token:token
//                     })
//                 })
//             }
//             else{
//                if(result.socialId==req.body.socialId){
//                 const token =jwt.sign({
//                     //name:data[0].name,
//                     //email:data[0].email,
//                     id:data._id
//                 },
//                 privateKey,
//                 {
//                     expiresIn:"24h"
//                 }
//                 );
//                 res.status(200).send ({
//                     "status": "true",
//                     "msg": "Successfully login",
//                     "response": data,
//                     "code":200,
//                     "error": {
//                     },
//                     token:token
//                 })
//                }
//                else{
//                    res.json("Please enter correct socialId")
//                }
//             }
           
//         })
//         }
//         else{
//             res.json("Please Signup!")
//         }
//     })
        
// }
const login=(req,res)=>{
    users.findEmail(userProfile,req.body.email).then(data=>{
        if(data){
            const loginType=req.body.loginType
            //console.log(loginType)
            if(loginType=='manually'){
                var privateKey="csfrdtfynumj447678uyueewfeacdsz";
                //console.log("blablabla")
                bcrypt.compare(req.body.password,data.password,(err,result)=>{
                    //console.log("blala")
                    if(!result){
                        res.status(401).json({
                            message:"password matching fail"
                        })
                    }
                    if(result)
                    {
                        //console.log(result)
                        const token =jwt.sign({
                            //name:data[0].name,
                            //email:data[0].email,
                            id:data._id
                        },
                        privateKey,
                        {
                            expiresIn:"24h"
                        }
                        );
                        res.status(200).send ({
                            "status": "true",
                            "msg": "Successfully login",
                            "response": data,
                            "code":200,
                            "error": {
                            },
                            token:token
                        })
                    }
                })
            }
            else if(req.body.loginType=='google'||req.body.loginType=='facebook'){

                const id=data._id
                console.log(id)
        users.findSocial(social,id,req.body.loginType).then((result)=>{
            //console.log(result)
            var privateKey="csfrdtfynumj447678uyueewfeacdsz";
            if(result==null){
                const val={
                    userId:id,
                    loginType:req.body.loginType,
                    socialId:req.body.socialId,
                }
                users.create(social,val).then(value=>{
                    const token =jwt.sign({
                        //name:data[0].name,
                        //email:data[0].email,
                        id:id
                    },
                    privateKey,
                    {
                        expiresIn:"24h"
                    }
                    );
                    res.status(200).send ({
                        "status": "true",
                        "msg": "Successfully login",
                        "response": data,
                        "code":200,
                        "error": {
                        },
                        token:token
                    })
                })
            }
            else{
               if(result.socialId==req.body.socialId){
                const token =jwt.sign({
                    //name:data[0].name,
                    //email:data[0].email,
                    id:data._id
                },
                privateKey,
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).send ({
                    "status": "true",
                    "msg": "Successfully login",
                    "response": data,
                    "code":200,
                    "error": {
                    },
                    token:token
                })
               }
               else{
                   res.json("Please enter correct socialId")
               }
            }
           
        })
        }
        else{
            res.json("Please enter valid login Type")
        }
}
else{
    res.json("Please SignUp!")
}
})
}
const forgotPassword=(req,res)=>{
    users.findEmail(userProfile,req.body.email).then(data=>{
        if(data){
            const otp={
                otp:users.otpGenerate(),
                email:req.body.email
            }
            //const otp=users.create()
            if(otp){
                users.create(otpResetPwd,otp).then((value)=>{
                    if(value){
                        res.json(otp.otp)
                    }
                    else{
                        res.json("OTP not sent try again")
                    }
                    
                })
            }
        }
    })
}
const verifyOTP=async(req,res)=>{
    try{
        //id=req.user
        const data= await users.findEmail(userProfile,req.body.email);
        //email=data.email
       if(data){
        await users.findEmail(otpResetPwd,req.body.email).then(val=>{
            
            if(val){
                if(req.body.otp==val.otp){
                    res.json("Otp verified! Now reset password");
                }
                else{
                    res.json("Wrong Otp");
                }
            }
            else{
                return res.status(401).json({
                    message: "OTP Expired"
                    })
            }
        })
       }
       else{
           res.json("enter correct email");
       }
        
    }
        catch(err){
            //console.log(err.message);
            res.json(err);
        }
}
const resetPassword=async(req,res)=>{
    try{
        if(req.body.newPassword==req.body.confirmPassword){
            bcrypt.hash(req.body.newPassword,10,(err,hash)=>
        {
            const Password=hash
            console.log(Password)
        if(err)
        { 
            return res.status(500).json({
                error:err
            })
        }
        
        else{
            //console.log("ggih")
            users.updateQuery(userProfile,req.body.email,{password:Password}).then(data=>{
                //console.log("ghj",data)
                if(data){
                    res.json({
                        message:"Password reset successfully",
                        data:data})
                }
                else{
                    res.send("not updated")
                }
            })
            
        }
        
        })
        }
        else{
            res.json("confirm password does not match new password")
        }
        
    }
    catch(err){
        res.json(err)
    }
}

module.exports={
    //loginProfile,
    //socialLogin,
    forgotPassword,
    verifyOTP,
    resetPassword,
    login

}