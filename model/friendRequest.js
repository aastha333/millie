const mongoose = require('mongoose')

const friendRequestSchema = new  mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile'
  },
  requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProfile'
  }]
});

module.exports = mongoose.model('friendRequest', friendRequestSchema);