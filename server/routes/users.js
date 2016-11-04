var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply when needed
var userModel = require('../models/users.js');

var config = require('../config/config');

var setUserRoutes = function (router) {

    router.get('/api/v1/users/:id',
            function (req, res) {
                var userId = req.params.id;
                userModel.getUserProfile(userId, function (result) {
                    return res.json(result);
                }
                );
            }
    );

    //verify forgot password token
    router.get('/api/v1/users/verifyToken/:token',
            function (req, res) {
              console.log(req.params.token);
                var token = req.params.token;
                var token_type = 'forgot_password_token';
                userModel.getUserProfileByToken(token, token_type, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    //verify email token
    router.get('/api/v1/users/verifyEmail/:token',
            function (req, res) {
              console.log(req.params.token);
                var token = req.params.token;
                var token_type = 'verify_token';
                userModel.getUserProfileByToken(token, token_type, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    router.post('/api/v1/users/resetPassword',
            function (req, res) {
              console.log(req.params.token);
                var token = req.body.token;
                var pwd = req.body.pwd;
                var data = {token:token,pwd:pwd};
                userModel.resetPasswordByToken(data, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    router.post('/api/v1/users/signUp',
            function (req, res) {

                var data = req.body;
                userModel.signUp(data, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    router.post('/forgetSubmit',
            function (req, res) {

                var email = req.body.email;
                console.log(email);
                userModel.generateForgotPasswordToken(email, function (result) {
                    if (result.result_token) {
                        var token = result.result_token;
                      userModel.sendForgotPasswordMail(token,'admin@geodex.com',email,'Reset Password',function(results){
                        if(results.success){
                            return res.json("success");
                        }else{
                          return res.json(results);
                        }
                    //return res.json("success");
                      });

                    } else {
                        return res.json(result);
                    }

                });
            }
    );
    router.post('/api/v1/user/update/:id',
        function (req, res) {

            console.log(req.body);
            userModel.updateUser(req.body,function(results){
                if(results.success){
                    return res.json("success");
                }else{
                    return res.json(results);
                }
            });

        }
    );

}

module.exports = setUserRoutes;
