var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title:{type:String},
  price:{type: Number},
  category:{type:String},
  imagePath:{type:String},
});

module.exports = mongoose.model('Products',schema);
