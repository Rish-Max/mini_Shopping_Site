var express = require('express');
var router = express.Router();
var order = require('../models/orderModel');

router.post("/addOrder",(req,res) => {

 var newOrder = new order(req.body.shipping);

  newOrder.save((err,Order) => {
  if(err){
    res.send({status:"Not able to place Order"});
  }
  else {
    console.log(Order);
    res.send({status:"Order Place",orderId : Order._id});
    }
  })
});

router.get('/viewAll',(req,res) => {
  order.find({},{},(err,Order) =>{
    res.send({order : Order}); 
  })
})


router.get('/view/:id',(req,res) => {
  let productId = req.params.id;
  order.findOne({_id : productId},{},(err,Order) =>{
    if(err)
    {
      console.log("error");
    }
    res.send({order : Order}); 
  })
})

router.get('/show/:id',(req,res) =>{

  let user = req.params.id;
  order.find({usertoken : user},{},(err,Orders) =>{
    if(err)
    {
      console.log(err);
    }

    if(!Orders){
      res.statusMessage = "No order Yet Placed";
    }
    else{
      res.statusMessage = "User have placed order in Past";
      res.send({order : Orders});
    }

  })
})

module.exports = router;
