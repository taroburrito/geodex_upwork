var router = require('express').Router();
var path = require('path');


// Rest API
require(path.join(__dirname, './', 'todos'))(router);
require(path.join(__dirname, './', 'users'))(router);
require(path.join(__dirname, './', 'pages'))(router);
require(path.join(__dirname, './', 'categories'))(router);

// Homepage/Client
router.get('/', function (req, res, next) { 
    // res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
    res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
});

router.get('/admin', function (req, res, next) { 
     res.sendFile(path.join(__dirname, '../../', 'client', 'admin.html'));
    //res.sendFile(path.join(__dirname, '../', 'client', 'admin.html'));
});

module.exports = function (app, passport) {
    // set authentication routes
    require('./authentication.js')(app, passport);

    // set other routes
    app.use('/', router);
    app.use('/admin',router)



};
