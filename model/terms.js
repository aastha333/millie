const mongoose = require('mongoose')

const termsSchema = new  mongoose.Schema({
   
   termsAndCondition:{
       type:String
   }
});

module.exports = mongoose.model('terms', termsSchema);