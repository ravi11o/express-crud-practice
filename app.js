// requires
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
// console.log(process.env);

// require routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

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