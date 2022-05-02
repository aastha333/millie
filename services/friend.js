const friendRequest= require('../model/friendRequest')
const friend=require('../model/friend')
const userProfile = require("../model/userProfile")
const interest=require("../model/interest")
const {ObjectId}=require("bson")
//const res = require('express/lib/response')
//const res = require('express/lib/response')

// const update=async(Model,id,data)=>{
//     try{
//         const result=Model.findOneAndUpdate({user:id,$push:data},{new:true})
//         if(result!=null){
//             return result
//         }
//         else{
//             return 0
//         }
//     }
//     catch(err){

//     }
// }
const pull=async(Model,id,data)=>{
    try{
    const result=Model.findOneAndUpdate({user:id,$pull:data})
        if(result!=null){
            return result
        }
        else{
            return 0
        }
    }
    catch(err){

    }
}
const push=async(Model,id,data)=>{
    try{
    const result=Model.findOneAndUpdate({user:id,$push:data})
        if(result!=null){
            return result
        }
        else{
            return 0
        }
    }
    catch(err){
        res.json(err)
    }
}

const get=async(Model,id,data)=>{
    try{
       const result= Model.findOne({user:id}).select({data:1,'_id':0})
        .populate({
            path:data,
        })
        if(result!=null){
            return result
        }
        else{
            return 0
        }
    }
    catch(err){
        res.json(err)
    }
}
const findFriend=(Model,user,id)=>{
    try{
        const result=Model.findOne({user:user,friends:{$in:id}})
        //console.log(result)
        if(result!=null){
            return result
        }
        else{
            return 0
        }
    }
    catch(err){
        res.json(err)
    }
}

const findRequest=(user,id)=>{
    try{
        const result=friendRequest.findOne({user:user,requests:{$nin:id}})
        //console.log(result)
        if(result!=null){
            return result
        }
        else{
            return 0
        }
    }
    catch(err){
        res.json(err)
    }
}
module.exports={
    //update,
    push,
    pull,
    get,
    findFriend,
    findRequest
}