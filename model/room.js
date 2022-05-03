const mongoose = require('mongoose'),
Schema = mongoose.Schema;


const roomSchema = new Schema({
    roomId:{
        type:Number,
        default:1
    } ,
    user1:{
        type: Schema.Types.ObjectId,
        ref: 'userProfile'
    },
    user2:{
        type: Schema.Types.ObjectId,
        ref: 'userProfile' 
    }
})
module.exports = mongoose.model('room', roomSchema);