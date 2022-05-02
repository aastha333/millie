const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const auth=require('../middleware/auth')
const chat=require('../controller/chatController')
const validate=require('../validation/userValidation')

router.post('/sendMessage',auth.JWT,chat.sendMessage)

module.exports=router;