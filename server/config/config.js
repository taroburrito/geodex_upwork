module.exports = {
    mysqlParams: {
        host: 'localhost',
        user: "root",
         password: "root",
      //  password: "Geodex@321",
        database: "geodex",
        multipleStatements: true // allows for multiple queries. consider making this a different connection?
    },
    sessionOptions: {
        secret: 'somesecretkeythatweshouldgenerateandstoresomewhere', //TODO make real secret
        saveUninitialized: true, // save new sessions
        resave: false, // do not automatically write to the session store
        cookie: {
            httpOnly: true,
            maxAge: 2419200000
        } // TODO set secure to true when https is used

    },
    commonSettings: {
        localhost: 'http://localhost:6969'

    }

};
