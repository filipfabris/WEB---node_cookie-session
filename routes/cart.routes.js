const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    //####################### ZADATAK #######################
    // prikaz košarice uz pomoć cart.ejs


    res.render('cart', {
        title: 'Cart',
        user: req.session.user,
        linkActive: 'cart',
        cart: req.session.cart, //popravi
        err: undefined
    });

    //#######################################################
});


router.get('/add/:id', async function (req, res, next) {
    //####################### ZADATAK #######################
    //dodavanje jednog artikla u košaricu

    let id = parseInt(req.params.id);

    await cart.addItemToCart(req.session.cart, id, 1);



    res.send(Promise.resolve(1));
    // ili res.end();

    //#######################################################

});

router.get('/remove/:id', async function (req, res, next) {
    //####################### ZADATAK #######################
    //brisanje jednog artikla iz košarice

    let id = parseInt(req.params.id);

    await cart.removeItemFromCart(req.session.cart, id, 1);

    res.send(Promise.resolve(1));

    //#######################################################


});

module.exports = router;