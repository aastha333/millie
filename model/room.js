const mongoose = require('mongoose'),
Schema = mongoose.Schema;
let counter = 1;
let CountedId = {type: Number, default: () => counter++};

const roomSchema = new Schema({
    roomId: CountedId ,
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