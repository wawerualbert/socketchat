var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

//passport config
 passport = require('./config/passport');


var app = express();

//db config
 db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, {useNewUrlParser: true })
.then(function() {
 console.log('MongoDB connected...');
}

.catch(function(err) {
    console.log(err);
},
//ejs
app.use(expressLayouts),
app.set('view engine', 'ejs'),

//bodyparser
app.use(express.urlencoded({ extended:false })),

//express session
app.use(session({
    secret:'secret',
    resave:'true',
    saveUninitialized:'true'

})),

//passport middleware

app.use(passport.initialize()),
app.use(passport.session()),


//concet flash
app.use(flash()),

//global vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
}),

//routes
app.use('/', require('./routes/index')),
app.use('/users', require('./routes/users')),



PORT = process.env.PORT || 5000,

app.listen(PORT, console.log('server started on port ${PORT}'))));