const Joi = require('joi')
const user=(req,res,next)=>{
  //console.log(">>>>>>>>>>>>>>>>>>>>>>")
  const Schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(6).required(),  
    mobileNo:Joi.string().length(10).pattern(/^[0-9]+$/).required()
  })
  try{
    const value=Schema.validate(req.body,{stripUnknown:{objects:true}});
    if(value.error){
        //console.log(error);
        return res.send(value.error.message);
    }
    if(!value.error){
       // console.log(result);
       return next()
        //res.send('successfully posted data');
    }
  }
  catch(error){
    return next(error)
  }
   
  next()
}
const update=(req,res,next)=>{
  //console.log(">>>>>>>>>>>>>>>>>>>>>>")
  const Schema = Joi.object({
    email: Joi.string().trim().email().lowercase(),
    password: Joi.string().min(6),  
    mobileNo:Joi.string().length(10).pattern(/^[0-9]+$/),
    interest:Joi.array().max(4)
  })
  try{
    const value=Schema.validate(req.body,{stripUnknown:{objects:true}});
    if(value.error){
        //console.log(error);
        return res.send(value.error.message);
    }
    if(!value.error){
       // console.log(result);
       return next()
        //res.send('successfully posted data');
    }
  }
  catch(error){
    return next(error)
  }
   
  next()
}


module.exports = {
  user,
  update
}