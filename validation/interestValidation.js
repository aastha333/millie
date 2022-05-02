const Joi = require('joi')
const interest=(req,res,next)=>{
  //console.log(">>>>>>>>>>>>>>>>>>>>>>")
  const Schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(6).required(),  
    mobileNo:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
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