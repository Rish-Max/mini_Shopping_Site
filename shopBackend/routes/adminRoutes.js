var express = require('express');
var router = express.Router();
var path = require('path');
var category = require('../models/categoryModel');
var products = require('../models/addproductModel');

var imagePath; //Path of image stored;
var checkImage;//Check whether its an image or not
//To store image and files in folder
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

aws.config.loadFromPath('./config.json');
aws.config.update({
  signatureVersion: 'v4'
});

var s3 = new aws.S3({});

const multer = require('multer');
var config = " ";
var upload = multer({ //multer settings
  storage: multerS3({
      s3: s3,
      bucket: 'rishabh-images',
      acl: 'public-read',
      key : function(req, file, cb) {
        cb(null,file.originalname);
      }
  }),
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      checkImage = "false";
      callback(null, false);
    } else {
      checkImage = "true";
      callback(null, true);
    }
  },

});
//For Inserting Categories by Admin
// router.post('/category/insert',(req,res) => {
//   var insertCategories = {
//     name : req.body.name,
//     type : req.body.type
//   }
//
//   var m = new category(insertCategories);
//   m.save((err)=>{
//     if(err)
//     {
//       console.log(err);
//     }
//     else {
//       console.log("Successfully Inserted");
//     }
//   });
//   res.send("i m in");
// });

router.get('/category/fetch', (req, res) => {
  category.find({}, (err, categories) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).send(categories);
    }
  });
});

router.post('/addProduct', upload.single('Path'), (req, res) => {
  if (req.file == undefined) {
    res.send({
      message: "Not an Image"
    });
  } else {
    let newProduct = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      imagePath: req.file.originalname
    }
    var modelProduct = new products(newProduct);
    modelProduct.save((err) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Internal Server Error"
        });
      } else {
        res.send({
          message: "Successfully Uploaded"
        });
      }
    })
  }
});

router.post('/updateProduct', upload.single('Path'), (req, res) => {
  if (req.file == undefined) {
    if(checkImage == "false"){
      res.send({
        message: "Not an Image"
      });
    }
      else {
        let updateProduct = {
          title: req.body.title,
          price: req.body.price,
          category: req.body.category,
          //imagePath: req.file.originalname
        }
        products.findByIdAndUpdate(req.body.id,updateProduct,{new : true},(err,tank) => {
          if (err) {
            console.log(err);
            res.send({
              message: "Internal Server Error"
            });
          } else {
            res.send({
              message: "Successfully Updated"
            });
          }
      })
  }
}
   else {
    let updateProduct = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      imagePath: req.file.originalname
    }
    products.findByIdAndUpdate(req.body.id,updateProduct,{new : true},(err,tank) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Internal Server Error"
        });
      } else {
        res.send({
          message: "Successfully Updated"
        });
      }
    })
  }
});

router.delete('/deleteProduct/:id', (req, res) => {
    products.findByIdAndRemove(req.params.id,(err,tank) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Internal Server Error"
        });
      } else {
        res.statusMessage ="Successfully Deleted";
        res.send({
          message: "Successfully Deleted"
        });
      }
    })
});

router.get('/fetchProduct',(req,res) =>{
  products.find({},{},(err,products) =>{
    if(err)
    {
      console.log('error');
    }
    else {
      res.statusMessage = "Successfully Got";
      res.send(products);
    }
  });
})

router.get('/fetchProduct/:id',(req,res) =>{
  let id =req.params.id;
  products.findById({_id : id},(err,product) =>{
    if(err)
    {
      console.log('error');
    }
    else {
      res.statusMessage = "Successfully Got";
      res.send(product);
    }
  });
})

module.exports = router;
