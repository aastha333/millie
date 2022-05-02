const express=require('express');
const router=express.Router();
const interest=require('../controller/interestController')
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const auth=require('../middleware/auth');
const validation=require('../validation/userValidation')

router.post('/addInterest',jsonEncoder,interest.addInterest);
router.get('/getInterest',jsonEncoder,interest.getInterest);
router.put('/selectInterest',jsonEncoder,validation.update,auth.JWT,interest.selectInterest);
router.put('/selectSubInterest',jsonEncoder,auth.JWT,interest.selectSubInterest);

module.exports=router;