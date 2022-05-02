//const promise  = require("ejs")
const promise=require("promise")
const otpLogin = require("../model/otpLogin")
const userProfile = require("../model/userProfile")
const otpGenerator = require('otp-generator');
const socialLogin = require("../model/socialLogin");
const {ObjectId}=require("bson")
//const { user } = require("../validation/userValidation")
const otpGenerate=()=>{
    const Otp=otpGenerator.generate(6,{
        digits:true,alphabets:false,upperCase:false,specialChars:false
        });
   
    return Otp;
}


const signup=(email,profile,otp)=>{
    return new promise(function(resolve,reject){
        userProfile.findOne({email:email,isActive:false},(error,result)=>{
            if(result){
                //console.log("fugih")
                otpLogin.create((otp),(error,data)=>{
                    if(data){
                        resolve(data)
                    }
                    else{
                        resolve(error)
                    }
                })
            }
            else{
                userProfile.create((profile),(error,result)=>{
                    if(result){
                        otpLogin.create((otp),(error,data)=>{
                            if(data){
                                resolve(data)
                            }
                            else{
                                resolve(0)
                            }
                        })
                    }
                    else{
                        resolve(0)
                    }
                })
            }
        })
        
    })
}
const verify=(mobileNo)=>{
    const data=userProfile.findOne({mobileNo:mobileNo,isActive:false})
        if(data){
            const otp=otpLogin.findOne({number:mobileNo})
            if(otp){
                return otp
            }
            else{
                return 0
            }
        }
        else{
            return 1
        }
}
const update=(mobileNo)=>{
    const data=userProfile.findOneAndUpdate({mobileNo},{$set:{isActive:true}},{new:true,runValidators:true})
        if(data){
            return data
        }
        else{
            return 0
        }
}
const login=(email)=>{
    return new promise(function(resolve,reject){
        userProfile.findOne((email),(error,result)=>{
            if(error){
                resolve(error)
            }
            else{
                resolve(result)
            }
        })
    })
}
const findEmail=(Model,data)=>{
    const result=Model.findOne({email:data})
    if(result!=null){
        return result
    }
    else{
        return 0
    }
}
const create=(Model,data)=>{
    const result=Model.create(data)
    if(result){
        return result
    }
    else{
        return 0
    }
}
const findId=(Model,data)=>{
    const result=Model.findById(data)
    //console.log(result
    if(result!=null){
        return result
    }
    else{
        return 0
    }
}
const updateQuery=(Model,email,data)=>{
    //return new promise(function(resolve,reject){
    const result=Model.findOneAndUpdate({email:email},{$set:data},{new:true})
    //,(error,result)=>{
           // console.log("989")
            if(result!=null){
                return result
            }
            else{
                return 0      
            }
       // })
    //console.log(result.email)
        
   // })
}
const findUser=(Model,id)=>{
    const result=Model.findOne({userId:id})
    if(result){
        return result
    }
    else{
        return 0
    }
}
const findSocial=(Model,id,data)=>{
    const result=Model.findOne({userId:id,loginType:data})
    if(result){
        return result
    }
    else{
        return 0
    }
}
const updateById=(id,data)=>{
    const result=userProfile.findByIdAndUpdate(id,{$set:data},{new:true})
    if(result){
        return result
    }
    else{
        return 0
    }
}

module.exports={
    signup,
    login,
    otpGenerate,
    verify,
    update,
    findEmail,
    create,
    findId,
    updateQuery,
    findUser,
    findSocial,
    updateById
}