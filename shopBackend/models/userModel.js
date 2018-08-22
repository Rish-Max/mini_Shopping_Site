var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var schema = new Schema({
  id : {type: Schema.Types.ObjectId},
  name: {type : 'String'},
  email : { type : 'String'},
  pass : {type: 'String'},
  cart : {type: Schema.Types.ObjectId ,ref : 'Cart'},
  tokens:{
      auth : {type : 'String'},
      token: {type :'String'}
        }
});

module.exports = mongoose.model('Users',schema);
