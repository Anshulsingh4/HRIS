const User = require('../models/newUser')

module.exports.renderNewForm = (req, res) => {
    res.render('users/newUserForm')
}

module.exports.newForm = async (req, res) => {
    console.log("User added")
    const { id, username, fullname, contactNumber, type, department, role, dob, gender, email, password } = req.body
    const user = new User({ id, username, fullname, contactNumber, type, department, dob, gender, role, email })
    const newUser = await User.register(user, password)
    await newUser.save()
    req.flash('success', "User Added")
    console.log("Saved in DB")
    res.redirect('/home')
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Logged in !')
    res.redirect('/home')
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('error', "Goodbye!");
    res.redirect('/login');
}

module.exports.home = async (req, res) => {
    // let flag = 0
    const detail = req.user
    const alluser = await User.find()
    res.render('home.ejs', { detail, alluser })
}

module.exports.fullDetails = (req, res) => {
    const detail = req.user
    res.render('fulldetails', { detail })
}

module.exports.renderAllUser = async (req, res) => {
    const detail = req.user
    const alluser = await User.find()
    res.render('alluser', { detail, alluser })
}

module.exports.allUser = async (req, res) => {
    const detail = req.user
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted User')
    res.redirect('/alluser');
}

module.exports.renderEditForm = async (req, res) => {
    const detail = req.user
    const { id } = req.params
    const user = await User.findById(id)
    res.render('edit', { detail, user })
}

module.exports.edit = async (req, res) => {
    const detail = req.user
    const { id } = req.params
    //console.log(req.body)
    const update = await User.findByIdAndUpdate(id, req.body)
    // console.log(update)
    await update.save()
    req.flash('success', 'Successfully Updated')
    res.redirect('/home')
}

module.exports.renderEmpDir = async (req, res) => {
    const detail = req.user
    res.render('empdir', { detail })
}

module.exports.empDir = async (req, res) => {
    const detail = req.user
    const { name } = req.body
    const searchUser = await User.find({ 'username': name })
    if (!searchUser[0]) {
        // console.log("In if")
        req.flash('error', "User doesn't exist")
        return res.redirect('/empdir')
    }
    // console.log('Not in if')
    const user = searchUser[0]
    res.render('empdiruser', { detail, user })
}