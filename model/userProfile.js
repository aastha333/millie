const mongoose=require("mongoose");
//const {Address,ObjectAddressId}=require('../model/addressCustomer')
//const { ObjectId }=mongoose.Types;


const userProfileSchema = new mongoose.Schema({
    email:{
        type:String,
        //required:true,
        //unique:true,
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    accountType:{
        type:String,
        enum:['Individual','Organization']

    },
    nickName:{
        type:String,
        minlength:2,
        maxlength:20,
        match:[/^[a-z .'-]+$/i,"Enter valid Nick name"]
    },
    firstName:{
        type:String,
        //required:true,
        minlength:2,
        maxlength:20,
        match:[/^[a-z .'-]+$/i,"Enter valid first name"]
    },
    lastName:{
        type:String,
        //required:true,
        minlength:2,
        maxlength:20,
        match:[/^[a-z .'-]+$/i,"Enter valid last name"]
    },
    gender:{
        type:String,
        enum:['Male','Female','Transgender','male','female','transgender','Not prefer to say'],
        //required:true
    },
    DOB:{
        type:Date,
        min:1967-01-01,
        max:Date.now()
    },
    primaryLocation:{
       type:String,

    },
    mobileNo:{
      type:Number,
      minlength:10,
      maxlength:10
    },
    password:{
        type:String,
        //match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,"Weak Password"]
    },
    interest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'interest',
        //validate: [arrayLimit, '{PATH} exceeds the limit of 4']
    }],
    subInterest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subInterest',
        //validate: [arrayLimit, '{PATH} exceeds the limit of 4']

    }],
    privacyPolicy:{
        type:Boolean,
        default:true
    },
    termsAndCondition:{
        type:Boolean,
        default:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    
})

// Validations for assignedTo employees' size
userProfileSchema.path('interest').validate(function (value) {
    console.log(value.length)
    if (value.length > 4) {
      throw new Error("Assigned person's size can't be greater than 4!");
    }
  });

module.exports= mongoose.model("userProfile",userProfileSchema)
