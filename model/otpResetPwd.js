const mongoose = require('mongoose')

const otpResetPwdSchema = new  mongoose.Schema({
    email:{
        type:String,
        required :true
    },
    otp:{
       type:Number,
       required:true
    },
    expireIn:{
        type:Date,
        default:Date.now,
        index:{expires:500}
    }
});

module.exports = mongoose.model('otpResetPwd', otpResetPwdSchema);