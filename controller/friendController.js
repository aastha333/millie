const friendRequest=require("../model/friendRequest");
const friend=require('../model/friend')
const users=require('../services/user')
const friends=require('../services/friend')

const sendRequest=async(req,res)=>{
   friends.findFriend(friend,req.user,req.query.request).then(data=>{
       if(!data){
        friends.findRequest(req.user,req.query.request).then((result)=>{
            if(result){
                friends.push(friendRequest,req.user,{requests:req.query.request}).then((value)=>{
                    if(value){
                        res.json(value)
                    }
                    else{
                        res.json("Request failed")
                    }
                })
            }
            else{
                friends.findFriend(friendRequest,req.user,req.query.request).then((result)=>{
                    if(!result){
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
                    else{
                        res.json("Already Requested")
                    }
                    
                })

            }
        })
       }
       else{
           res.json("Already friends")
       }
    
   })
    
}
const acceptRequest=async(req,res)=>{
    
    friends.pull(friendRequest,req.user,{requests:req.query.acceptRequest}).then((value)=>{
        //console.log("blabla")
        if(value){

            //console.log(value)
            users.findUser(friend,req.user).then(result=>{
                if(result){
                    //console.log(result)
                    friends.push(friend,req.user,{friends:req.query.acceptRequest}).then(data=>{
                       // console.log(data)
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
            res.json("No friendRequest is there")
        }
    })
}
const rejectRequest=async(req,res)=>{
    friends.pull(friendRequest,req.user,{requests:req.query.rejectRequest}).then(value=>{
        if(value){
            res.json("Rejected")
        }
        else{
            res.json("Not Rejected Please try again")
        }
    })
}
const getRequest=async(req,res)=>{
    friends.get(friendRequest,req.user,'requests').then(value=>{
        if(value){
            const data=paginate(val,3,req.query.page)
            res.json(data)
        }
        else{
            res.json("No pending Request")
        }
    })
}
const getFriend=async(req,res)=>{
    friends.get(friend,req.user,'friends').then(value=>{
        if(value){
            //res.json(value)
            if(req.query.search){
            const val=search(value.friends,req.query.search)
            //array.forEach(element => {
            //});
            //console.log(val)
            res.json(val)
            //const page= req.query.page||1
            //const data=paginate(val,3,page)
            //res.json(data)
            }
            else{
                const page= req.query.page||1
                const data=paginate(value.friends,3,page)
                res.json(data)  
            }
            
        }
        else{
            res.json("No friends")
        }
    })
}
function search(array,search){
    //console.log(array[0]._id)
    //array.forEach(element => {
        const result=array.filter(el=>el==search);
        if(result){
            return result
        }
        else{
            return 0
        }
    //});
    //const result=array.includes(search);
    //console.log(result)
    
}
function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    const result= array.slice((page_number - 1)*page_size , page_number*page_size);
    if(result){
        return result
    }
    else{
        return 0
    }
  }
module.exports={
    sendRequest,
    acceptRequest,
    rejectRequest,
    getRequest,
    getFriend
}