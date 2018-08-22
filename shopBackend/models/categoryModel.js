const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name:{type: String},
  type:{type: String}
});

module.exports = mongoose.model('Category',schema);
