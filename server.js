const
    express = require('express'),
    app = express(),
    ejs = require('ejs'),
    dotenv = require('dotenv'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    usersRouter = require('./routes/users.js'),
    citiesRouter = require('./routes/citiesRouter.js')
// environment port
const
    port = process.env.PORT || 3000,
    mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/wayfarer-project'

// mongoose connection
mongoose.connect(mongoConnectionString,{ useNewUrlParser: true }, (err) => {
    console.log(err || "Connected to MongoDB (passport-authentication)")
})

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
});

// middleware
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(flash())
app.use(bodyParser.json())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
//middleware to override for patch
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

// session + passport
app.use(session({
    secret: "you're doing it, Peter!",
    cookie:{maxAge : 60000000},
    resave: true,
    saveUninitialized: false,
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    app.locals.currentUser = req.user // currentUser now available in ALL views
    app.locals.loggedIn = !!req.user // a boolean loggedIn now available in ALL views

    next()
})

//root route
app.get('/', (req,res) => {
    res.render('index')
})

app.use('/users', usersRouter)
app.use('/cities', citiesRouter)

app.listen(port, (err) => {
    console.log(err || "Server running on port " + port)
})