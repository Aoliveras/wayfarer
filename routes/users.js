const
    express = require('express'),
    passport = require('passport'),
    usersRouter = express.Router()

usersRouter.get('/login', (req, res) => {
        res.render('login')
})

usersRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login'
  }))

usersRouter.get('/signup', (req, res) => {
  res.render('signup')
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup'
  }))

usersRouter.get('/profile', isLoggedIn, (req, res) => {
    // render the user's profile (only if they are currently logged in)
    res.render('profile', {user: req.user})
})

usersRouter.get('/logout', (req, res) => {
    // destroy the session, and redirect the user back to the home page
    req.logout()
    res.redirect('/')
})

// a method used to authorize a user BEFORE allowing them to proceed to the profile page:
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

module.exports = usersRouter