const express = require ('express');//add library express to this program
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const mongodb = require('./data/database');//add mongo library
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 5000; //declaring a port with a local variable
const app = express(); //instance to express

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Controll-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
    next();
});

app.use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(cors({ origin: '*'}));

app.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    //User.findOrCreate({ githubId: profile.id}, function (err, user){
        return done(null, profile);
    //});
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        console.log(req.user);
        req.session.user = req.user;
        res.redirect('/');
});

process.on('uncaughtException', (err, origin) =>{
    console.log(process.stderr.fd, `Caught exception: ${err}\n`+ `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
   if(err) {
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`Database is listenning and node running on port ${port}`)});
    }
});
