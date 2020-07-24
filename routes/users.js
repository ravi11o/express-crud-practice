var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/', (req, res) => {
  User.find({},  (err, listUsers) => {
    if(err) return next(err);
    res.render('listUsers', {users: listUsers});
  })
})

router.get('/new', (req, res) => {
  res.render('userForm');
})

router.get('/:id', (req, res, next) => {
  var userId = req.params.id;
  User.findById(userId, (err, user) => {
    res.render('singleUser', { user })
  })
});



router.post('/', (req, res, next) => {
  User.create(req.body, (err, createdUser) => {
    if(err) return next(err);
    res.redirect('/users')
  })
})

router.put('/:email', (req, res) => {
  var email = req.params.email;
  User.findOneAndUpdate({ email }, req.body, {new: true}, (err, updatedUser) => {
    res.send(updatedUser)
  })
})

router.get('/:id/delete', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.redirect('/users');
  })
})

module.exports = router;

