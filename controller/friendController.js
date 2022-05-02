const friendRequest=require("../model/friendRequest");
const friend=require('../model/friend')
const users=require('../services/user')
const friends=require('../services/friend')

const sendRequest=async(req,res)=>{
    users.findUser(friendRequest,req.user).then((result)=>{
        if(result){
            friends.update(friendRequest,req.user,{requests:req.query.request}).then((value)=>{
                if(value){
                    res.json(value)
                }
                else{
                    res.json("Request failed")
                }
            })
        }
        else{
            const data={
                user:req.user,
                requests:req.query.request
            }
            users.create(friendRequest,data).then((value)=>{
                if(value){
                    res.json(value)
                }
                else{
                    res.json("Request failed")
                }
            })
        }
    })
}
const acceptRequest=async(req,res)=>{
    friends.pull(friendRequest,req.user,{requests:req.query.acceptRequest}).then((value)=>{
        //console.log("blabla")
        if(value){

            //console.log("kll")
            users.findUser(friend,req.user).then(result=>{
                if(result){
                    friends.push(friend,req.user,{friends:req.query.acceptRequest}).then(data=>{
                        console.log("ghjj")
                        res.json(data)
                    })             
                 }
                else{
                    //console.log('tyyu')
                    users.create(friend,{user:req.user,friends:req.query.acceptRequest}).then(data=>{
                        res.json(data)
                    })
                }
                
            })
            
        }
        else{
            res.json("no friendRequest is there")
        }
    })
}
const rejectRequest=async(req,res)=>{
    friends.pull(friendRequest,req.user,{requests:req.query.rejectRequest}).then(value=>{
        if(value){
            res.json("Rejected")
        }
        else{
            res.json("not Rejected Please try again")
        }
    })
}
const getRequest=async(req,res)=>{
    friends.get(friendRequest,req.user,'requests').then(value=>{
        if(value){
            paginate(value,3,req.query.page)
        }
        else{
            res.json("No pending Request")
        }
    })
}
const getFriend=async(req,res)=>{
    friends.get(friend,req.user,'friends').then(value=>{
        if(value){
            paginate(value)
        }
        else{
            res.json("No friends")
        }
    })
}
function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.toString().slice((page_number - 1)*page_size , page_number*page_size);
  }
module.exports={
    sendRequest,
    acceptRequest,
    rejectRequest,
    getRequest,
    getFriend
}