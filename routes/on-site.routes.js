const express = require('express');
const router = express.Router();
const Helper = require('./helpers/helper');
const authHandler = require('./helpers/auth-handler');



router.get('/', authHandler, function (req, res, next) {

    if (req.session.params === undefined) {
        req.session.params = {};
        req.session.params.email = req.session.user.email;
    }

    res.render('view', {
        title: 'View',
        user: req.session.user,
        linkActive: 'Cart',
        helper: new Helper(req.session.params),
        cart: req.session.cart
    });
});

router.post('/save', function (req, res, next) {


    if (req.body['e-mail'] !== undefined) {
        req.session.params.email = req.body['e-mail'];
    }

    if (req.body['newsletters'] !== undefined) {
        req.session.params.news = req.body['newsletters'];
    }

    req.session.params.statments = req.body['statements'];

    // console.log("req.body['statements'] = " + req.body['statements']);
    // console.log("req.session.params.statments = " + req.session.params.statments);

    res.redirect('/cart');

});


router.post('/reset', function (req, res, next) {

    req.session.params = undefined

    res.redirect('/view');

});


router.post('/order', function (req, res, next) {
    req.session.params = undefined

    res.redirect('/checkout');

});

module.exports = router;