var express=require('express');
var router = express.Router();
var empty = require('is-empty');
var User = require('../models/userModel');
var bcrypt =require('bcrypt');
var jwt = require('jsonwebtoken');
var cart =require('../models/cartModel');

router.post('/login',(req,res) =>{
  console.log(req.body);
User.findOne({ email: req.body.email },{},(err,user) => {
  console.log(user);
  if(empty(user))
  {
    res.statusMessage = "noUser";
    res.status(202).send({token:" "});
  }
  else {
    if(bcrypt.compareSync(req.body.pass, user.pass))
    {
      res.statusMessage ="UserFound";
      console.log("Successful login");
      res.status(201).send({token : user.tokens.token})
    }
    else
    {
      res.statusMessage ="IncorrectPassword";
      res.status('202').send({token:" "});
    }
  }
})
});

router.post('/signup',(req,res) =>{
User.findOne({email : req.body.email},{},(err,user) =>{
  if(!empty(user))
  {
   console.log(user);
   res.statusMessage ="AlreadyExist";
   res.status(200).send({token: "",status: "Already Added"});
  }
  else
  {
    var token =jwt.sign({
      name : req.body.name,
      email:req.body.email,
      auth :'client'
    },'super-secret');

    var user = new User({
      name : req.body.name,
      email: req.body.email,
      pass : bcrypt.hashSync(req.body.pass,4),
      tokens:{
        auth:'client',
        token:token
      }
    });
    user.save((err) =>{
    if(err)
    {
      console.log(error);
    }
    else {
      console.log("new user Added");
      res.statusMessage ="Successful";
      res.status(200).send({token: token,status: "new Added"});
      }
     });
    }
  });
});



module.exports = router;
