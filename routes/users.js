const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../public/scheme/user')

/* GET users listing. */

router.get('/cool', function(req, res, next) {
  res.send('You\'re so cool');
});

router.post('/register', function(req, res, next) {
  User.findOne({ username: req.body.email } , (err, news) => {
    if (err) {
      res.send(err)
    }

    if (news) {
      res.send('Email is already registered')
    } else {
      let user = new User({ username: req.body.email, password: req.body.password});
      user.save()
      .then(function(doc){
          console.log("Сохранен пользователь", doc);
      })
      .catch(function (err){
          console.log(err);
      })
      res.redirect('/')
    }
  })
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/news');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
