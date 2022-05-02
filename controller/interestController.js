//const userProfile = require('../model/userProfile');
const interest=require('../model/interest');
const interests=require('../services/interest')

const addInterest=async(req,res)=>{
    try{
        const data=({
            interest:req.body.interest
        })
        interests.add(data).then((result)=>{
            res.json(result)
        })
    }
    catch(err){
        res.json(err)
    }
}
const getInterest=async(req,res)=>{
    let perPage = 3
    let page = Number(req.query.page) || 1
    if(page>1){
        next=page+1
        previous=page-1
    }
    else{
        next=page+1
        previous="null"
    }
    let use={};
        if(req.query.search){
            use.$or=[
                { "interest" : { $regex: req.query.search, $options: 'i' } },
            ];
        }
    await interest
    .find(use)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then((data)=>{
        if(data){
            res.status(200).send ({
                "status": "true",
                "msg": "Record found.",
                "response": data,
                "code":200,
                "error": {
                },
                current: page,
                next:next,
                previous:previous
            })
        }
        else{
            res.json('data not found')
        }
    })
}
const selectInterest=async(req,res)=>{
    try{
        //const val=req.user
        await interests.select(req.user,req.query.interest).then((data)=>{
         //console.log(data)
        if(data){
            res.json(data)
        }
        else{
            res.json('data not found')
        }
    })
    }
    catch(err){
        res.json("error")
    }
    
}
const selectSubInterest=async(req,res)=>{
    interests.findInterest(req.user,req.query.subInterest).then(val=>{
        if(!val){
            interests.findSubInterest(req.user,req.query.subInterest).then(value=>{
                if(!value){
                    interests.selectSub(req.user,req.query.subInterest).then((data)=>{
                        if(data){
                            res.json(data)
                        }
                        else{
                            res.json("not found")
                        }
                    })
                }
                else{
                    res.json("Already in subInterest")
                }
                
            })
            
        }
        else{
            res.json("already in interest")
        }
    })
  
}
module.exports={
    addInterest,
    getInterest,
    selectInterest,
    selectSubInterest
}