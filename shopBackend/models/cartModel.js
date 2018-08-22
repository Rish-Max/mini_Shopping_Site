var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  userId : { type:Schema.Types.ObjectId ,ref: 'Users'},
  products : [{ productId: {type: String},
                title    : {type :String},
                quantity : {type : Number},
                price    : {type : Number},
                imagePath: {type : String}
             }],
  tquantity : { type: Number}
});

module.exports = mongoose.model('Cart',schema);
