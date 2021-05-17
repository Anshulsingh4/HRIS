if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const ejsMate = require('ejs-mate');
const path = require('path')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const User = require('./models/newUser')
const Attendance = require('./models/attendance')
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const session = require('express-session');
const { isLoggedIn, isAdmin } = require('./middleware')
const MongoDBStore = require('connect-mongo');
const newUser = require('./models/newUser');

const userRoutes = require('./routes/user');
const attendanceRoutes = require('./routes/attendance')


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/hris'
//process.env.DB_URL ||

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use(session({
    secret: 'foo',
    store: MongoDBStore.create({ mongoUrl: dbUrl }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', userRoutes);
app.use('/', attendanceRoutes)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

port = 4000;
app.listen(port, () => {
    //res.send("Hey There")
    console.log(`Serving @ ${port}`)
})