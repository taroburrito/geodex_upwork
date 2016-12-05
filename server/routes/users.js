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

    router.post('/api/v1/users/changeFriendCat',
            function (req, res) {
                userModel.changeFriendCat(req.body, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    router.post('/api/v1/users/changePassword',
            function (req, res) {
                var email = req.body.email;
                var new_pwd = req.body.new_pwd;
                var data = {email:email,new_pwd:new_pwd};
                userModel.changePassword(data, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    router.post('/api/v1/users/signUp',
            function (req, res) {

                var data = req.body;
                userModel.signUp(data,req, function (result) {
                   return res.json(result);
                }
                );
            }
    );

    router.post('/forgetSubmit',
            function (req, res) {

                var email = req.body.email;
                userModel.generateForgotPasswordToken(email, function (result) {
                    if (result.result_token) {
                        var token = result.result_token;
                      userModel.sendForgotPasswordMail(token,'admin@geodex.com',email,'Reset Password',function(results){
                        return res.json(results);

                    //return res.json("success");
                      });

                    } else {
                        return res.json(result);
                    }

                });
            }
    );
    router.post('/api/v1/users/update/',
        function (req, res) {

          //  console.log(req.body);
            userModel.updateUserProfile(req.body,function(results){
                return res.json(results);

            });

        }
    );

    router.post('/api/v1/user/updateData/',
        function (req, res) {

            userModel.updateUserData(req.body, function(results){
              return res.json(results);

            });

        }
    );

    // router.post('/api/v1/user/updateProfileImage/:id',
    //     function (req, res) {
    //
    //       //  console.log(req.body);
    //         userModel.updateUser(req.body,function(results){
    //             if(results.success){
    //                 return res.json(results);
    //             }else{
    //                 return res.json(results);
    //             }
    //         });
    //
    //     }
    // );

    router.post('/api/v1/user/deleteFriend/:id',
        function (req, res) {

          //  console.log(req.body);
            userModel.deleteFriend(req.params,function(results){
                if(results.success){
                    return res.json(results);
                }else{
                    return res.json(results);
                }
            });

        }
    );

    router.post('/api/v1/user/blockUser/',
        function(req,res){
            userModel.blockUser(req.body,function(results){
              return res.json(results);
            });
        }
      );

      router.post('/api/v1/user/addFriendRequest/',
          function(req,res){

              userModel.addFriendRequest(req.body,function(results){
                return res.json(results);
              });
          }
        );

        router.post('/api/v1/user/updateFriendList/:id',
            function(req,res){

                // userModel.updateFriendList(req.body,function(results){
                //   return res.json(results);
                // });
            }
          );

          router.post('/api/v1/users/acceptFriendRequest/:reqId',
              function(req,res){
                  var reqId = req.params.reqId;
                  userModel.acceptFriendRequest(reqId,function(results){
                    return res.json(results);
                  });
              }
            );

          /* Get all pending friend requests of a user*/
          router.get('/api/v1/users/getFriendRequests/:userId',
                  function (req, res) {
                      var userId = req.params.userId;
                    //return res.json({success:"here"});
                      userModel.getFreindRequests(userId, function (result) {
                         return res.json(result);
                      }
                      );
                  }
          );

          router.post('/api/v1/users/confirmFriendRequest/',
              function(req,res){
                  userModel.confirmFriendRequest(req.body.id,function(results){
                    return res.json(results);
                  });
              }
            );

            router.delete('/api/v1/users/deleteFriendRequest/:id',

                function(req,res){
                    userModel.deleteFriendRequest(req.params.id,function(results){
                      return res.json(results);
                    });
                }
              );

              router.get('/api/v1/users/getCategoryByUserId/:userId',

                      function (req, res) {
                        return res.json({success:"Sdsds"});
                          var userId = req.params.userId;
                          // userModel.getCategoryByUserId(userId, function (result) {
                          //    return res.json(result);
                          // }
                        //  );
                      }
              );

              router.get('/api/v1/users/searchUser/:str',
                      function (req, res) {
                          var str = req.params.str;
                          userModel.searchUser(str, function (result) {
                              return res.json(result);
                          }
                          );
                      }
              );

              router.post('/api/v1/users/sendEmailFromDashboard',function(req,res){
                  userModel.sendEmailFromDashboard(req.body,function(result){
                    return res.json(result);
                  });

              }
              );

}

module.exports = setUserRoutes;
