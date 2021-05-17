const express = require('express');
const router = express.Router();
const User = require('../models/newUser')
const controller = require('../controller/user')
const { isLoggedIn, isAdmin } = require('../middleware')
const passport = require('passport');

router.route('/login')
    .get(controller.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), controller.login)

router.route('/newUser')
    .get(isLoggedIn, isAdmin, controller.renderNewForm)
    .post(isLoggedIn, isAdmin, controller.newForm)

router.route('/home')
    .get(isLoggedIn, controller.home)

router.route('/fulldetails')
    .get(isLoggedIn, controller.fullDetails)

router.route('/logout')
    .get(controller.logout)

router.route('/alluser')
    .get(isLoggedIn, controller.renderAllUser)

router.route('/alluser/:id')
    .post(isLoggedIn, isAdmin, controller.allUser)

router.route('/edit/:id')
    .get(isLoggedIn, controller.renderEditForm)
    .post(isLoggedIn, controller.edit)

router.route('/empdir')
    .get(isLoggedIn, controller.renderEmpDir)
    .post(isLoggedIn, controller.empDir)

module.exports = router