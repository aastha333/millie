const mongoose = require('mongoose')

const friendSchema = new  mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile'
  },
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile'
  }]
});

module.exports = mongoose.model('Friends', friendSchema);