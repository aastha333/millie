const friendRequest= require('../model/friendRequest')
const friend=require('../model/friend')
const userProfile = require("../model/userProfile")
const interest=require("../model/interest")
const message=require("../model/message")
const room=require("../model/room")
const {ObjectId}=require("bson")

const findRoom=(id1,id2)=>{
    const result=room.findOne({$or:[{user1:id1,user2:id2},{user1:id2,user2:id1}]})
    //console.log(result)
    if(result){
        return result
    }
    else{
        return 0
    }
}
const findMsg=(id)=>{
    const result=message.find({$or:[{sentTo:id},{sentBy:id}]})
    if(result){
        return result
    }
    else{
        return 0
    }
}
const findChat=(id)=>{
    const result=message.find({sentBy:id}).distinct('roomId')
    //.populate()
    if(result){
        return result
    }
    else{
        return 0
    }
}
module.exports={
    findRoom,
    findMsg,
    findChat
}