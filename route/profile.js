const express=require('express');
const router=express.Router();
const login=require('../controller/loginController');
const signup=require('../controller/signupController');
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const auth=require('../middleware/auth');
const validate=require('../validation/userValidation')

router.post('/signup',jsonEncoder,validate.user,signup.signupProfile);
router.post('/verifyOtp',jsonEncoder,signup.verifyOtp);
router.post('resendOtp',jsonEncoder,signup.resendOtp)
router.post('/privacyPolicy',jsonEncoder,signup.privacyPolicy);
router.post('/termsAndCondition',jsonEncoder,signup.termsAndCondition);
router.put('/completeProfile',jsonEncoder,validate.update,auth.JWT,signup.completeProfile);
router.get('/getProfile',jsonEncoder,auth.JWT,signup.getProfile);
router.put('/updateProfile',jsonEncoder,validate.update,auth.JWT,signup.updateProfile);

//router.post('/login',jsonEncoder,login.loginProfile);
//router.post('/socialLogin',jsonEncoder,login.socialLogin);
router.post('/login',jsonEncoder,login.login);
router.post('/forgotPassword',jsonEncoder,login.forgotPassword);
router.post('/verify-OTP',jsonEncoder,login.verifyOTP)
router.put('/resetPassword',jsonEncoder,login.resetPassword)

module.exports=router;