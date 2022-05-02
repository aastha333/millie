const mongoose = require('mongoose')

const otpLoginSchema = new  mongoose.Schema({
    number:{
        type:String,
        //required :true
    },
    Otp:{
       type:Number,
       required:true
    },
    expireIn:{
        type:Date,
        default:Date.now,
        index:{expires:500}
    }
})

module.exports = mongoose.model('otpLogin', otpLoginSchema)