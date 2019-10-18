const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Admin = mongoose.model('Admin')

passport.use(new LocalStrategy({
    userNameField: 'admin[userName]',
    passwordField: 'admin[password]',
  }, (userName, password, done) => {
    Admin.findOne({ userName })
      .then((admin) => {
        if(!admin || !admin.validatePassword(password)) {
          return done(null, false, { errors: { 'username or password': 'is invalid' } });
        }
  
        return done(null, admin);
      }).catch(done);
  }));