const express = require('express');
const router = express.Router();
const controller = require('../controller/attendance')
const { isLoggedIn, isAdmin } = require('../middleware');


router.route('/home/:id')
    .post(isLoggedIn, controller.markAttendance)

router.route('/attendancestatus')
    .get(isLoggedIn, controller.renderAttendanceStatus)

router.route('/attendancestatus/:id')
    .post(isLoggedIn, controller.attendanceStatus)

router.route('/actionattendance')
    .get(isLoggedIn, isAdmin, controller.renderactionAttendance)

router.route('/actionattendance/:id')
    .post(isLoggedIn, isAdmin, controller.actionAttendance)



module.exports = router