const mongoose=require("mongoose");

const interestSchema = new mongoose.Schema({
    interest:{
        type:String
    }

})

module.exports=mongoose.model("interest",interestSchema)