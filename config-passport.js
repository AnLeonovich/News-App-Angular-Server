const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const User = require('./public/scheme/user')

const user = {
  id: 1,
  username: 'FFF',
  password: '456'
}

passport.serializeUser(function(user, done) {
  console.log('SERIALIZE')
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  console.log('DESERIALIZE')
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password,done){
  User.findOne({ username },function(err,user){
    return err 
      ? done(err)
      : user
        ? password === user.password
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));
