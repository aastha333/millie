const friendRequest=require("../model/friendRequest");
const friend=require('../model/friend')
const room=require('../model/room')
const messages=require('../model/message')
const users=require('../services/user')
const friends=require('../services/friend')
const chats=require('../services/chat');
const { find } = require("../model/friendRequest");
//const { response } = require("express");


const sendMessage=async(req,res)=>{
    try{
        friends.findFriend(req.user,req.query.sentTo).then(value=>{
            if(value){
                chats.findRoom(req.user,req.query.sentTo).then(data=>{
                    if(data){
                        //console.log(data.roomId)
                        //const msg=req.body.msg
                        //console.log(msg)
                        const val={roomId:data.roomId,
                            sentTo:req.query.sentTo,
                            message:req.body.msg,
                            sentBy:req.user
                        }
                        //console.log(data)
                        //console.log("vjkhhd",req.body.message)
                        users.create(messages,val).then(result=>{
                            if(result){
                                res.json(result)
                            }
                            else{
                                res.json("Not send")
                            }
                        })
                    }
                    else{
                        users.create(room,{user1:req.user,user2:req.query.sentTo}).then(result=>{
                            if(result){
                                const data={roomId:result.roomId,
                                    sentTo:req.query.sentTo,
                                    message:req.body.msg,
                                    sentBy:req.user
                                }
                                users.create(messages,data).then(result=>{
                                    if(result){
                                        res.json(result)
                                    }
                                    else{
                                        res.json("Not send")
                                    }
                                })
                            }
                            else{
                                res.json("error")
                            }
                        })
                    }
                })
            }
            else{
                res.json("Not your friend")
            }
        })
    }
    catch(err){
        res.json(err)
    }
}
const getMessage=(req,res)=>{
    try{
        chats.findMsg(req.user).then(data=>{
            if(data){
                res.json(data)
            }
            else{
                res.json("No msg sent")
            }
        })
    }
    catch(err){
        res.json(err)
    }
}
const chatHistory=async(req,res)=>{
    try{
        chats.findChat(req.user).then(data=>{
            if(data){
                res.json(data)
            }
            else{
                res.json("No chat")
            }
        })
    }
    catch(err){
        res.json(err)
    }
}

module.exports={
    sendMessage,
    getMessage,
    chatHistory
}