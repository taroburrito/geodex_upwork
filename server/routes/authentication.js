// TODO create and use utility fuction that converts req.user to userObject
var authenticationMiddleware = require('../middlewares/authentication.js');
var userModel = require('../models/users.js');


/**
 *	Note: if user is already signed in, this will overwrite the previous session
 *				on the client side
 */
function addAuthRoute(app, passport, routePath, strategy) {
    app.post(routePath, function (req, res, next) {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
              err.status = 400;
                return next(err);
            }
            if (!user) {
              info.status = 400;
                return res.json(info);
            }
            if (user) {
                req.logIn(user, function (err) {
                    if (err) {
                      err.status = 400;
                        return next(err);
                    }else{

                      userModel.getLoggedInUserData(user.id, function (result) {
                        var final_result = Object.assign({},user,result);
                        //console.log(result);
                          return res.json(result);
                      });
                    }

                });
            }
        })(req, res, next);
    });
}

module.exports = function (app, passport) {
    addAuthRoute(app, passport, "/signup", "local-signup");
    addAuthRoute(app, passport, "/login", "local-login");

    app.post('/logout', authenticationMiddleware.isLoggedIn, function (req, res) {
        req.logout();
        req.session.destroy();
        return res.json({status:200,success:"Logged out successfully"});
    });

    app.post('/checkSession', function (req, res) {
        var isLoggedIn = req.isAuthenticated();
        if (isLoggedIn){
            // return res.json({isLoggedIn: isLoggedIn,
            //     userObject: {role: req.user.role,
            //         id: req.user.id,
            //         email: req.user.email
            //     }
            // });


            req.user.isLoggedIn = isLoggedIn;
            userModel.getLoggedInUserData(req.user.id, function (result) {
              var final_result = Object.assign({},req.user,result);
                return res.json(final_result);
            });
          }else {
              return res.json({isLoggedIn: isLoggedIn,status:400,error:"Not logged in"});
            }

        //return res.json({isLoggedIn: isLoggedIn});
    });


};
