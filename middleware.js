const AddUser = require('./models/newUser')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdmin = async (req, res, next) => {
    const type = req.user.type
    // console.log(type)
    if (!(type === "admin")) {
        req.flash('error', "You do not have permission to do that!")
        return res.redirect('/home')
    }
    next()
}
