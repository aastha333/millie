const bcrypt = require('bcrypt');
const userProfile = require('../model/userProfile');
const otpLogin=require('../model/otpLogin');
const jwt = require('jsonwebtoken');
const privacy=require('../model/privacyPolicy');
const terms = require('../model/terms');
const users=require('../services/user');
//const { user } = require('../validation/userValidation');

const signupProfile=function(req,res) {  
    try{
        bcrypt.hash(req.body.password,10,(err,hash)=>
        {
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {   //console.log(hash)
            if(req.body.email&&req.body.accountType&&req.body.password&&req.body.confirmPassword&&req.body.mobileNo){
                if(req.body.password==req.body.confirmPassword){
                    //console.log(req.body.email)
                    const profile = {
                        email:req.body.email,
                        accountType:req.body.accountType, 
                        mobileNo:req.body.mobileNo,           
                        password :hash,
                        }
                    const OTP=users.otpGenerate()
                    //console.log(OTP)
                    const data={
                       Otp: OTP,
                       number:req.body.mobileNo
                    }

                    //const otp=users.create(otpLogin,data)
                    //console.log(otp)
                    users.signup(req.body.email,profile,data).then(data=>{
                        if(data==0){
                            res.json("this is an active profile please login")
                            
                        }
                        else {
                            res.status(200).send({
                                msg:"OTP send successfully",
                                data:data
                                });
                        }
                        
                    });
                            
                         
                        //  .catch(err=>{
                        //     res.status(500).send(
                        //         {
                        //             "status": true,
                        //             "response": null,
                        //             "code": 200,
                        //             "error": {
                        //             "errCode": "AUTHORIZE_FAILED",
                        //             "errMsg": "Failed to Authorize"
                        //             },
                        //         })
                        //     })
                }
                else{
                    res.send("password doesn't match confirm password");
                }
            }
            else{
                res.send("Please enter all fields");
            }
        }
        })
    }
    catch(err){
        res.json(err)
    }
       
}
const resendOtp=(req,res)=>{
    const otp=users.otpGenerate(req.body.mobileNo)
    users.signup(req.body.email,otp).then((data)=>{
        res.json(data)
    })
}

const verifyOtp= (req,res)=>
    {
        // userProfile.findOne({mobileNo:req.body.mobileNo}).then(value=>{
        // otpLogin.find({ number:req.body.mobileNo})
        // .exec()
        users.verify(req.body.mobileNo)
        .then(data=>
            { //console.log(data)  
                if(data==0)
                {
                    return res.status(401).json({
                        message: "OTP Expired"
                    })
                }
                else if(data==1){
                    res.json("This is a verified user.Please login")
                }
                else{
                    //var privateKey="csfrdtfynumj447678uyueewfghjk";
                    //bcrypt.compare(req.body.otp,data[0].Otp,(err,result)=>{
                        if(req.body.otp!=data.Otp){
                            res.status(401).json({
                                message:"otp wrong"
                            })
                        }
                        else 
                        {
                            users.update(req.body.mobileNo).then((value)=>{
                                res.status(200).send ({
                                    "status": "true",
                                    "msg": "Successfully signedUp",
                                    "response": value,
                                    "code":200,
                                    "error": {
                                    },
                                })
                            })

                            }
                            
                        }
                    //})
                })
            }
        


const completeProfile= async function(req,res){
    if(req.body.firstName&&req.body.lastName&&req.body.DOB&&req.body.gender&&req.body.primaryLocation){
        const val={
            nickName:req.body.nickName,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            DOB:req.body.DOB,
            gender:req.body.gender,
            primaryLocation:req.body.primaryLocation
            }
        users.updateById(req.user,val).then(data=>{
            if(data){
                res.json(data)
            }
            else{
                res.json("not updated")
            }
        })
            
    }
    else{
        res.send("Please enter correct data")
    }

}
const getProfile=async(req,res)=>{
    try{
        await users.findId(userProfile,req.user)
        .populate('interest')
        .then((data)=>{
            if(data){
                res.json(data);
            }
            else{
                res.json("data not found")
            }
        })
    }
    catch(err){
        res.json(err)
    }
}
const updateProfile=async(req,res)=>{
    try{
        //await userProfile.findByIdAndUpdate(req.user,{
            const data={
                nickName:req.body.nickName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                DOB:req.body.DOB,
                gender:req.body.gender,
                primaryLocation:req.body.primaryLocation,
                mobileNo:req.body.mobileNo
            }
        users.updateById(req.user,data).then((result)=>{
            if(result){
                res.json(result)
            }
            else{
                res.json("not updated")
            }
          
        })
    }
    catch(err){
        res.json(err)
    }
}
const privacyPolicy=async(req,res)=>{
    try{
        await privacy.find().then((data)=>{
            res.json(data)
        })
    }
    catch(err){
        res.json(err)
    }
}
const termsAndCondition=async(req,res)=>{
    try{
        await terms.find().then((data)=>{
            res.json(data)
        })
    }
    catch(err){
        res.json(err)
    }
}


module.exports={
    signupProfile,
    completeProfile,
    verifyOtp,
    getProfile,
    updateProfile,
    privacyPolicy,
    termsAndCondition,
    resendOtp
}
