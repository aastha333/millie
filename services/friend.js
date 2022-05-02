const friendRequest= require('../model/friendRequest')
const friend=require('../model/friend')
const userProfile = require("../model/userProfile")
const interest=require("../model/interest")
const {ObjectId}=require("bson")
//const res = require('express/lib/response')
//const res = require('express/lib/response')

const update=async(Model,id,data)=>{
    try{
        const result=Model.findOneAndUpdate({user:id,$push:data},{new:true})
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
const pull=async(Model,id,data)=>{
    try{
    const result=Model.findOneAndUpdate({user:id,$pull:data},{new:true})
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
    const result=Model.findOneAndUpdate({user:id,$push:data},{new:true})
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
            //select:{'firstName':1,'lastName':1},
            //perDocumentLimit:2
            // options: {
            //     limit: 3,
            //     //sort: { created: -1},
            //     skip: req.params.page*3
        
            // }
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
const findFriend=(user,id)=>{
    try{
        const result=friend.findOne({user:ObjectId(user),friends:ObjectId(id)})
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
    update,
    push,
    pull,
    get,
    findFriend
}