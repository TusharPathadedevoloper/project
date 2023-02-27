const mongoose=require('mongoose');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema=mongoose.Schema;
const userSchema= new Schema   
({
    name :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:[true,'please enter the email '],
        unique:true
    },
    phone:{
        type:Number,
        require:[true,'please enter the phone number']
        
    },
    tahsil:{
        type:String,
        require:true,
        minlength:5
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    tokens:
            [{
            token:{
                type:String,
                require:true
            }}
           ]
        

});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})

userSchema.methods.generateToken=async function(){
    try{
       
      let token= jwt.sign({email : this.email},'MYNAMEISTUSHARSANTOSHPATHADEBESTOFLUCK')
      this.tokens=this.tokens.concat({token:token});
      await this.save();
      return token;
      
    }catch(err){
      console.log(err);
    }
}

const User=mongoose.model('User', userSchema);

module.exports=User;