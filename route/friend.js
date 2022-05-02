const express=require('express');
const router=express.Router();
//const login=require('../controller/loginController');
//const signup=require('../controller/signupController');
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const auth=require('../middleware/auth');
const validate=require('../validation/userValidation')
const friend=require('../controller/friendController')

router.post('/sendRequest',auth.JWT,friend.sendRequest)
router.post('/acceptRequest',auth.JWT,friend.acceptRequest)
router.put('/rejectRequest',auth.JWT,friend.rejectRequest)
router.get('/getRequest',auth.JWT,friend.getRequest)
router.get('/getFriend',auth.JWT,friend.getFriend)


module.exports=router;