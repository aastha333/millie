const mongoose = require('mongoose')

const socialLoginSchema = new  mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProfile'
    },
    loginType:{
        type:String,
        enum:['manually','facebook','google']
    },
    socialId:{
       type:String,
       unique:true
       //required:true
    }
   
})

module.exports = mongoose.model('socialLogin', socialLoginSchema)