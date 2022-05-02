const mongoose = require('mongoose')

const privacyPolicySchema = new  mongoose.Schema({
   privacyPolicy:{
       type:String
   }
});

module.exports = mongoose.model('privacyPolicy', privacyPolicySchema);