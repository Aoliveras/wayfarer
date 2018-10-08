const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// LOCAL SIGNUP
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if(err) return done(err)
        if(user) return done(null, false)
        User.create(req.body, (err, newUser) => {
            if(err) return console.log(err)
            return done(null, newUser, null)
        })
    })
}))

// LOCAL LOGIN
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if(err) return done(err)
        if(!user || !user.validPassword(password)) return done(null, false)
        return done(null, user)
    })
}))

module.exports = passport
