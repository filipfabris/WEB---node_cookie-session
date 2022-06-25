const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')
const cart = require('../models/CartModel')
const db = require('../db')




router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu

    res.render('login', {
        title: 'Login',
        user: req.session.user,
        linkActive: 'login',
        err: req.session.err
    });
    //#######################################################

});

router.post('/', async function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika

    let user = await User.fetchByUsername(req.body.user);

    if (user.id === undefined) {
        //User nije nadjen
        res.render('Login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: 'Unknown does not exists or Incorect password.',
        });
        return;
    }

    if (!user.checkPassword(req.body.password)) {
        //Kriva lozinka
        res.render('Login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: 'Unknown does not exists or Incorect password.',
        });
        return;
    }


    //Uspjesna prijava

    req.session.user = user;
    res.redirect('/');

    //#######################################################

});


module.exports = router;