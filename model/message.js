const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const MessageSchema = new Schema({
  roomId:{
    //$inc: { seq: 1 } 
    type:Number
    //default:1
 },
  sentTo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'userProfile'
  },
  message: {
    type: String,
    //required: true
  },
  
  sentBy: {
    type: Schema.Types.ObjectId,
    ref: 'userProfile'
  },
  status: {
    type:String,
    enum:['delivered','Seen'],
    default: 'delivered'
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('Message', MessageSchema);