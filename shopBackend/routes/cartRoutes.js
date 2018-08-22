var express = require('express');
var route = express.Router();
var cart = require('../models/cartModel');


route.post('/create',(req,res) => {
   console.log(req.body.product);
      var newCart = new cart({
        products: [req.body.product],
        tquantity: 1
      });

    newCart.save((err,result) =>{
      if(err)
      {
        console.log(err);
      }
      res.send({cartId : result._id,cart : result});
    });
})


route.post('/addProduct',(req,res) => {
 let id = req.body.id;
 let product = req.body.product;
let check =true;
 cart.findById(id,(err,Cart) => {
      var tquantity = Cart.tquantity;
      for (var item of Cart.products) {
        if(item.productId == product.productId)
        {
          check = false;
          let id =item._id;
          let quantity = item.quantity;
          cart.update({'products._id' : id },{'$set' : { 'products.$.quantity' : quantity+1}},(err,Cart) => {
           res.send("Item Added");
          })
        }
      }
      if(check)
      {
        cart.findOneAndUpdate({_id : req.body.id },{$push : { "products" : req.body.product}},{safe: true, upsert: true},(err,Cart) =>{
          res.send("Item Inserted");
        })
      }
      cart.findOneAndUpdate({_id : req.body.id},{$set : {'tquantity' : tquantity +1}},(err,cart) =>{
        console.log("updated");
      });
 })

});

route.post('/removeProduct',(req,res) =>{
  cart.findById(req.body.id,(err,Cart) =>{
    var tquantity = Cart.tquantity;
    for (let item of Cart.products) {
        if(item.productId == req.body.product)
        {
          let id =item._id;
          let quantity = item.quantity;
          cart.update({'products._id' : id },{'$set' : { 'products.$.quantity' : quantity-1}},(err,Cart) => {
              res.send("Item Removed");
        })
      }
    }
    cart.findOneAndUpdate({_id : req.body.id},{$set : {'tquantity' : tquantity - 1}},(err,cart) =>{
      console.log("updated");
    });
  })
})

route.post("/fetchCart",(req,res) => {
  cart.findById(req.body.id,(err,Cart) =>{

      res.send({product : Cart.products});
  });
})

route.post("/fetchTquantity",(req,res) => {

  cart.findById(req.body.id,(err,Cart) =>{
      res.send({quantity : Cart.tquantity});
  });
})

route.post("/fetchProduct",(req,res) => {
    var productId = req.body.productId;
    var quantity = 0 ;
    var check  = true;
  cart.findById(req.body.id,(err,Cart) =>{

      for (let obj of Cart.products) {
        if(obj.productId == req.body.productId)
        {
          check = false;
          productId = obj.productId;
          quantity  = obj.quantity ;
        }
      }
       res.send({product : productId,quantity: quantity});

  });
})

route.post("/clearCart",(req,res) => {
  var cartId = req.body.id;
  cart.findById(cartId,(err,Cart) =>{
    for (var item of Cart.products) {
      let id =item._id;
      cart.update({'products._id' : id },{'$set' : { 'products.$.quantity' : 0}},(err,Cart) => {
          console.log(id);
      })
    }
    cart.findOneAndUpdate({_id : req.body.id},{$set : {'tquantity' : 0}},(err,cart) =>{
      console.log("updated");
    });
  });
  res.send("removed");
});


module.exports = route;
