const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    // - obrisati sadržaj košarice
    // - odjaviti registriranog korisnika iz sustava
    // - napraviti redirect na osnovnu stranicu


    res.clearCookie("connect.sid"); //brisanje cookia
    res.redirect("/");


    //#######################################################

});

module.exports = router;