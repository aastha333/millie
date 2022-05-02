const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const userChatDetailsSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    chatWith:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})
module.exports = mongoose.model('userChatDetails', userChatDetailsSchema);