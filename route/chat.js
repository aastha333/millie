const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const auth=require('../middleware/auth')
const chat=require('../controller/chatController')
const validate=require('../validation/userValidation')

router.post('/sendMessage',jsonEncoder,auth.JWT,chat.sendMessage)
router.get('/getMessage',auth.JWT,chat.getMessage)
router.get('/chatHistory',auth.JWT,chat.chatHistory)

module.exports=router;