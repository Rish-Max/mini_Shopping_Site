const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var users = require('./routes/userRoutes');
var admin = require('./routes/adminRoutes');
var cart = require('./routes/cartRoutes');
var order = require('./routes/orderRoutes');

const port = 3000;

//connection to database
mongoose.connect('mongodb://localhost/Shop');
var db = mongoose.connection;
db.on('error',() => {
  console.log("error");
})
db.once('open',() => {
  console.log('Database connected');
})

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});



app.use('/user',users);
app.use('/admin',admin);
app.use('/cart',cart);
app.use('/order',order);

app.listen(port,() => {
  console.log("Server is connected at "+port)
});

module.exports=app;



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     return res.render('index');
// });
