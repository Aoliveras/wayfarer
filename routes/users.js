const
    express = require('express'),
    passport = require('passport'),
    usersRouter = express.Router()
    City = require('../models/City')

usersRouter.get('/login', (req, res) => {
        res.render('login', { message: req.flash('loginMessage')})
})

usersRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login'
  }))

usersRouter.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('signupMessage')})
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup'
  }))

usersRouter.get('/profile', isLoggedIn, (req, res) => {
  let { city } = req.params
  let  user_id = req.user._id
  City.aggregate([ { $match: { "posts.author": user_id } },
  { $unwind: "$posts" },{ $match: { "posts.author": user_id } }
  ,{
    $project: {city_id: '$_id', post_id: '$posts._id', title: "$posts.title", body: "$posts.body", author: "$posts.author" }
  }
 ])
  .exec((err, posts) => {
    console.log(posts)
    console.log(City._id)
        // render the user's profile (only if they are currently logged in)
    res.render('profile', {user: req.user, posts, city})
  })

})

usersRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('editProfile')
  })

  usersRouter.patch('/profile', isLoggedIn, (req, res) => {
    if(!req.body.password) delete req.body.password
    Object.assign(req.user, req.body)
    req.user.save((err, updatedUser) => {
      if(err) return console.log(err)
      res.redirect('/users/profile')
    })
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