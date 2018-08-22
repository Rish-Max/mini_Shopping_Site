var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = new Schema({
  shipping : {
                name: {type :String},
                addressLine1 : {type : String},
                addressLine2 : {type : String},
                city :{ type : String}
              },
   products : [{
                title : { type : String},
                quantity : { type : Number},
                price : { type : Number}
              }],
    usertoken : { type : String},
    date : {type : Date, default : Date.now()}
});

module.exports = mongoose.model('Order',order);
