const User = require('../models/newUser')
const Attendance = require('../models/attendance')

let flag = 1
module.exports.markAttendance = async (req, res) => {
    try {
        const { id } = req.params
        let attendance = new Attendance({
            check: 'Checkin',
            status: 'Pending'
        })
        const user = await User.find({ 'id': id })
        if (flag === 0) {
            attendance.check = 'Checkout'
            flag = 1
        }
        else {
            flag = 0
        }
        user[0].attendance.push(attendance)
        await attendance.save()
        await user[0].save();
        console.log(attendance.check)
        res.redirect('/home')
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.renderAttendanceStatus = async (req, res) => {
    const detail = req.user
    const flag = true
    const user = await User.findById(req.user._id).populate('attendance')
    res.render('attendancestatus', { detail, flag, user })
}

module.exports.attendanceStatus = async (req, res) => {
    const { id } = req.params
    await Attendance.findByIdAndDelete(id)
    res.redirect('/attendancestatus')

}

module.exports.renderactionAttendance = async (req, res) => {
    const detail = req.user
    const alluser = await User.find().populate('attendance')
    const users = [];
    for (let user of alluser) {
        if (!(user.id === detail.id)) {
            users.push(user)
        }
    }
    const user = await User.findById(req.user._id).populate('attendance')
    res.render('actionattendance', { detail, alluser, users })
}

module.exports.actionAttendance = async (req, res) => {
    const detail = req.user
    const { id } = req.params
    console.log(id)
    await Attendance.findByIdAndUpdate(id, { 'status': 'Approved' })
    res.redirect('/actionattendance')
}