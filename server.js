//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const cart = require('./models/CartModel')


//uvoz modula s definiranom funkcionalnosti ruta
const homeRouter = require('./routes/home.routes');
const orderRouter = require('./routes/order.routes');
const loginRoute = require('./routes/login.routes');
const logoutRoute = require('./routes/logout.routes');
const signupRoute = require('./routes/signup.routes');
const cartRoute = require('./routes/cart.routes');
const userRoute = require('./routes/user.routes');
const checkoutRoute = require('./routes/checkout.routes');
const onSiteRoute = require('./routes/on-site.routes');


//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

//middleware - dekodiranje parametara
app.use(express.urlencoded({
    extended: true
}));

//####################### ZADATAK #######################

//pohrana sjednica u postgres bazu korštenjem connect-pg-simple modula

app.use(
    session({
        store: new pgSession({
            pool: db.pool, // Connection pool
            tableName: "session",
        }),
        // secret: process.env.FOO_COOKIE_SECRET,
        secret: "tajnaKljuca", //izracunava hash od toga za nesto
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        } // 7 days

        // Insert express-session options here
    })

)

// // I was stuck with the same proble and solved it

// // 1-) Connection details
// const conObject = {
//     user: 'mehmood',
//     password: 'mehmood',
//     host: 'localhost', // or whatever it may be
//     port: 5432,
//     database: 'test_db'
// };

// // 2-) Create an instance of connect-pg-simple and pass it session
// const pgSession = require('connect-pg-simple')(session);

// // 3-) Create a config option for store
// const pgStoreConfig = {
//     pgPromise: require('pg-promise')({
//         promiseLib: require('bluebird')
//     })({
//         conObject
//     }), // user either this
//     //conString: 'postgres://mehmood:mehmood@localhost:5432/test_db', // or this
//     // conObject: conObject,// or this,
//     // pool: new (require('pg').Pool({ /* pool options here*/}))// or this

// }
// // 4-) use the store configuration to pgSession instance
// app.use(session({
//     store: new pgSession(pgStoreConfig),
//     secret: 'jW8aor76jpPX', // session secret
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 30 * 24 * 60 * 60 * 1000
//     } // 30 days 
// }));



//Ako kosarica ne postoji
app.use((req, res, next) => {

    if (req.session.cart === undefined || (req.session.cart.invalid === true)) {
        console.log("RADIM NOVU SADA")
        req.session.cart = cart.createCart();
    }

    next();
});

//#######################################################


//definicija ruta
app.use('/', homeRouter);
app.use('/order', orderRouter);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/signup', signupRoute);
app.use('/cart', cartRoute);
app.use('/user', userRoute);
app.use('/checkout', checkoutRoute);
app.use('/view', onSiteRoute);



//pokretanje poslužitelja na portu 3000
app.listen(3000);