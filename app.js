const express=require('express');
const app=express();
const mongoose=require('mongoose');
require("dotenv").config();
const profile=require('./route/profile');
const interest=require('./route/interest');
const friend=require('./route/friend');
const chat=require('./route/chat')

//let db=process.env.DB;
mongoose.connect('mongodb+srv://Aastha:mqtkSMVqNXuijFDa@cluster0.9kzsa.mongodb.net/Millie?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Mongo Connected!');
})


let port= process.env.PORT||6000;
//let host= process.env.HOST;

//app.set('view engine','ejs');



// app.get('/cool',function(req,res){
//     res.render('index.ejs');
// })
app.use('/',profile)
app.use('/',interest )
app.use('/',friend)
app.use('/',chat)

app.listen(port,()=>{
    console.log(`We are listening to server on port ${port}`);
})