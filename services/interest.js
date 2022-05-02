const promise=require("promise")
const userProfile = require("../model/userProfile")
const interest=require("../model/interest")
const {ObjectId}=require("bson")


const add=(data)=>{
    //console.log(data)
    return new promise((resolve,reject)=>{
        interest.create(data,(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
}
const select=(id,data)=>{
        //user
        console.log(id)
        const result=userProfile.findOneAndUpdate({_id:ObjectId(id)},{$push:{interest:data}},{new:true})
        //console.log(result)
            if(result!=null){
               return result
            }
            else{
                return 0
            }
}
const selectSub=(user,subInterest)=>{
    return new promise((resolve,reject)=>{
        userProfile.findOneAndUpdate(user,{$push:{subInterest:subInterest}},{new:true},(err,result)=>{
            if(err){
               resolve(err)
            }
            else{
                resolve(result)
            }
        })
    })
}
const findInterest=(id,int)=>{
    const result=userProfile.findOne({_id:id,'interest':{$in:int}})
    //console.log(result)
    if(result!=null){
        return result
    }
    else{
        return 0
    }
}
const findSubInterest=(id,interest)=>{
    const result=userProfile.findOne({_id:id,'subInterest':{$in:interest}})
    if(result!=null){
        return result
    }
    else{
        return 0
    }
}

module.exports={
    add,
    select,
    selectSub,
    findInterest,
    findSubInterest
}