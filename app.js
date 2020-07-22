// requires
var express = require('express');
var mongoose = require('mongoose');
// console.log(process.env);

// require User model
var User = require('./models/User');

var PORT = process.env.PORT || 3000;

// connect to database
mongoose.connect("mongodb://localhost:27017/express-crud",
{ useNewUrlParser: true, useUnifiedTopology: true },
(err) => {
  console.log('Connected', err ? err : true);
})

// instantiate express app
var app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.get('/users', (req, res) => {
  User.find({},  (err, listUsers) => {
    if(err) return next(err);
    res.json({users: listUsers});
  })
})

app.get('/users/:id', (req, res, next) => {
  var userId = req.params.id;
  User.findById(userId, (err, singleUser) => {
    res.send(singleUser)
  })
})

app.post('/users', (req, res, next) => {
  User.create(req.body, (err, createdUser) => {
    if(err) return next(err);
    res.send(createdUser);
  })
})

app.put('/users/:email', (req, res) => {
  var email = req.params.email;
  User.findOneAndUpdate({ email }, req.body, {new: true}, (err, updatedUser) => {
    res.send(updatedUser)
  })
})

app.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.send(deletedUser.name + 'has been deleted');
  })
})

// error handler middleware
// 404 handler
app.use((req, res, next) => {
  // res.statusCode = 404;
  // res.send('Page Not Found')
  res.status(404).send('Page Not Found');
})

// custom error either by client or by server
app.use((err, req, res, next) => {
  res.status(400).send(err);
})
// listener
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})