const mongoose =require('mongoose');
require('../model/userSchema')

const uri='mongodb+srv://tushar:P1UiSA994cTvCsjI@cluster0.nesprgp.mongodb.net/tusharData?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(uri
).then(()=>{
    console.log("connected Succesfully")
}).catch((err)=>console.log("sorry, rejected to connect"));