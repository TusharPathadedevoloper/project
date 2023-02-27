const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/userSchema');
const router = express.Router();

require('../db/conn')

// const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send("hello world from router")
})

router.post('/register', async (req, res) => {
  const { name, email, phone, tahsil, password, cpassword } = req.body;

  if (!name || !email || !phone || !tahsil || !password || !cpassword) {
    return res.status(422).json({ error: "pls filled all field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'email already exist' })
    }
    if (password != cpassword) {
      return res.status(404).json({ message: "password and confirm password should be same" });
    }
    const u = new User({ name, email, phone, tahsil, password, cpassword });
    await u.save();

    res.status(200).json({ Message: 'user  registered successfully' })
    console.log("user register")


  }
  catch (err) {
    console.log(err);
  }

})

//login route

router.post('/signin', async (req, res) => {
  // console.log(req.body);
  // res.json({message:'awesome  devoleper'})
  // // const {email, password}=req.body;
  // if( !email || !password){
  //   return res.status(422).json({error:"pls filled all field properly"});
  //  }
  try {
   let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "pls filled all field properly" });
    }

    const userLogin = await User.findOne({ email: email })
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

       token= await userLogin.generateToken();
       console.log(token);

       res.cookie("jwtoken",token,{
        expires :new Date(Date.now()+25890832382),
        httpOnly:true
       });

      if (!isMatch) {
        res.status(402).json({ message: 'user error' })
      }
      else {
        res.json({ message: 'success' })
      }
    } else {
      res.status(402).json({ message: 'user error' })
    }

  } catch (err) {

  }

})

module.exports = router;