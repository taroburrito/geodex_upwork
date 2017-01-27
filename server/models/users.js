/**
 * User model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var randtoken = require('rand-token');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var moment = require('moment');
var common = require('../utilities/common.js');
var ogs = require('open-graph-scraper');



var userModel = {
    convertRowsToUserProfileObject: function (rows) {
        var objString=JSON.stringify(rows);
        var obj=JSON.parse(objString);
        return obj;

    },

    /*
     func:get LoggedIn user basic data
     params: userId
     return: userProfileData
    */
    getLoggedInUserData: function(userId,callback){
      var dbConnection = dbConnectionCreator();
      var getUserSettingsSqlString = constructGetUserProfileSqlString(userId);
        dbConnection.query(getUserSettingsSqlString,function(error,result,fields){
        if(error){
          dbConnection.end();
          return(callback({error:"Failed to login",status:400,message:"Error in logged In query"}));
        }else if (result.length == 0) {
          dbConnection.end();
          return(callback({error:"No result found for userid:"+userId,status:400,message:"No record found with these parameters"}));
        }else {
            var userObject = userModel.convertRowsToUserProfileObject(result[0]);

          dbConnection.end();
             return(callback({userObject:userObject, status:200, message:"Login success"}));
        }
      });
    },


    /*
     func:Confirm friend request
     params: request id
     return: success or error
    */
    confirmFriendRequest: function(requestId, callback){
      var dbConnection = dbConnectionCreator();
      var confirmFriendRequestSqlString = constructConfirmFriendRequestSqlString(requestId);
      dbConnection.query(confirmFriendRequestSqlString, function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:error}));
        }else if (results.affectedRows === 0) {
          dbConnection.end();
          return(callback({error:"Not updated record"}));
        }else{
          dbConnection.end();
          return(callback({success:"Confirm Friend successfully"}));
        }
      });
    },

    /*
     func:delete friend request
     params: request id
     return: success or error
    */
    deleteFriendRequest: function(requestId, callback){
      var dbConnection = dbConnectionCreator();
      var deleteFriendRequestSqlString = constructDeleteFriendRequestSqlString(requestId);
      dbConnection.query(deleteFriendRequestSqlString, function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:error,status:400}));
        }else if (results.affectedRows === 0) {
          dbConnection.end();
          return(callback({error:"Error in delete friend request",status:400}));
        }else{
          dbConnection.end();
          return(callback({success:"Deny Friend successfully",status:200}));
        }
      });
    },

    /*
     func:get friend requests of LoggedIn user
     params: userId
     return: friend Requests List
    */
    getFreindRequests: function(userId,callback){
        var dbConnection = dbConnectionCreator();
        var getFriendRequestsSqlString = constructFriendRequestsSqlString(userId);
        dbConnection.query(getFriendRequestsSqlString,function(error,results,field){
          if(error){
            dbConnection.end();
            return(callback({error:error}));
          }else if (results.length === 0) {
            dbConnection.end();
            return(callback({friendRequests:null}));
          }else {
            var friends = {};
            results.forEach(function (result) {
                friends[result.request_id] = userModel.convertRowsToUserProfileObject(result);
            });
            dbConnection.end();
            return(callback({friendRequests:friends}));
          }
        });
    },

    /*
     func:get LoggedIn user dashboard data
     params: userId
     return: latestPost,categories,friendslist,friendsLatestPost
    */
    getDashboardData: function(userId,catId, callback){

      var dbConnection = dbConnectionCreator();
      var getLatestPostSqlString = constructLatestPostSqlString(userId);
      var getUsersCategoriesSqlString = constructGetUserCategoriesSqlString(userId);
      var getUserFriendsListSqlString = constructgetUserFriendsListSqlString(userId);
      if(!catId){

      var getFriendsListForDashboardSqlString = constructFriendListForDashboardSqlString(userId);
    }else{
      var getFriendsListForDashboardSqlString = constructFriendListByCatForDashboardSqlString(userId,catId);
    }
      var profileData;
      var userCategoriesData;

      dbConnection.query(getLatestPostSqlString, function (error, results, fields) {
          if (error) {

              dbConnection.end(); return(callback({error: "Error in latest post query"}));
          }else {

            if (results.length === 0) {
                var latestPost = null;
            }else{
              /* create object of latestPost */
              var latestPost = userModel.convertRowsToUserProfileObject(results[0]);
              }

            /*Get categories result of a user and admin*/
            dbConnection.query(getUsersCategoriesSqlString, function (error1, results1, fields1) {
              if (error1) {


                  dbConnection.end(); return(callback({error: error1}));
              }else {

                if (results1.length === 0) {
                    var categories = null;
                }else{
                  /* Create object of all categories*/
                  var categories = {};
                  results1.forEach(function (resultIndex) {
                      categories[resultIndex.id] = userModel.convertRowsToUserProfileObject(resultIndex);
                  });
                }


                /*Get friendList of user*/
                dbConnection.query(getFriendsListForDashboardSqlString,function(error3,result3,fields3){
                  if(error3){
                  return(callback({error: "Error in get friends for dashboard query",status:400,query:getFriendsListForDashboardSqlString}));
                  }else {

                     if (result3.length === 0) {
                      var friends = null;
                    }else {
                      var friends = {};
                      var friendsIds = [];
                      var i = 0;
                      result3.forEach(function (friendIndex) {
                          friends[i] = userModel.convertRowsToUserProfileObject(friendIndex);
                          friends[i].prev = true;
                          //if(friendIndex.status == 1)
                          friendsIds.push(friendIndex.id);
                          i++;


                      });


                    }
                      if(friendsIds && friendsIds.length >0){
                        var getFriendsPostImagesSqlString = constructFreindsPostImagesSqlString(friendsIds);
                        dbConnection.query(getFriendsPostImagesSqlString,function(error4,result4,fileds4){
                          if(error4){
                            return(callback({error:"Error in friends image query"}));
                          }else{
                            if(result4.length == 0){
                              var postImage = null;
                            }else{
                              var postImage = {};
                              result4.forEach(function (freindsPostId) {
                                if(postImage[freindsPostId.user_id]){
                                  postImage[freindsPostId.user_id].push(freindsPostId);
                                  // console.log('current length is: '+ postObj[friendsPost.user_id].length)
                                } else{
                                  var temp = [];
                                  temp.push(freindsPostId);
                                  postImage[freindsPostId.user_id] = temp;
                                }

                              });
                            }
                            dbConnection.end(); return(callback({latestPost: latestPost,categories: categories,friends:friends,friendsPostImages:postImage}));
                          }
                        });
                      }else{
                        dbConnection.end(); return(callback({latestPost: latestPost,categories: categories,friends:null,friendsPostImages:null}));
                      }



                  }
                });


              }
            });

          }
      });
    },

    getUserProfile: function (userId, callback) {
        var dbConnection = dbConnectionCreator();
        var getUserSettingsSqlString = constructGetUserProfileSqlString(userId);
        var getUsersCategoriesSqlString = constructGetUserCategoriesSqlString(userId);
        var getUserFriendsListSqlString = constructgetUserFriendsListSqlString(userId);
        var createGetPostsByUserSql = constructGetPostByUserSqlString(userId);
        var profileData;
        var userCategoriesData;
  //dbConnection.end(); return(callback({error: getUsersCategoriesSqlString}));
        dbConnection.query(getUserSettingsSqlString, function (error, results, fields) {
            if (error) {


                dbConnection.end(); return(callback({error: error}));
            } else if (results.length === 0) {
                dbConnection.end(); return(callback({error: "User not found."}));
            } else {
              userProfileData = userModel.convertRowsToUserProfileObject(results[0]);
              dbConnection.query(getUsersCategoriesSqlString, function (error1, results1, fields1) {
                if (error1) {


                    dbConnection.end(); return(callback({error: error1}));
                } else if (results1.length === 0) {
                    dbConnection.end(); return(callback({error: "User Categories not found."}));
                }else {
                  var categories = {};
                  results1.forEach(function (resultIndex) {
                      categories[resultIndex.id] = userModel.convertRowsToUserProfileObject(resultIndex);
                  });
                  dbConnection.query(createGetPostsByUserSql,function(error2,result2,fields2){
                    if(error2){
                      var posts = null;
                      dbConnection.end(); return(callback({userData: userProfileData,userCategories: categories,posts:posts}));
                    }else{
                      var posts = {};
                          result2.forEach(function (postIndex) {
                          posts[postIndex.id] = userModel.convertRowsToUserProfileObject(postIndex);
                      });

                      dbConnection.query(getUserFriendsListSqlString,function(error3,result3,fields3){
                        if(error3){
                          dbConnection.end(); return(callback({userData: userProfileData,userCategories: categories,posts:posts,friendList:error3}));
                        }else if (result3.length === 0) {
                          dbConnection.end(); return(callback({userData: userProfileData,userCategories: categories,posts:posts,friendList:null}));
                        }else {
                          var friends = {};
                          var friendsIds = [];
                          result3.forEach(function (friendIndex) {
                              friends[friendIndex.id] = userModel.convertRowsToUserProfileObject(friendIndex);
                              if(friendIndex.status == 1)
                              friendsIds.push(friendIndex.user_id);

                          });
                          dbConnection.end(); return(callback({userData: userProfileData,userCategories: categories,posts:posts,friendList:friends,friendsArray:friendsIds}));
                        }
                      });

                    }
                  });


                }
              });

            }
        });
    },

    /*
    func: getAllFriends
    params: userId
    return: friendList, categorizedFriendList
    */

    getAllFriends: function(userId, callback){
      var dbConnection = dbConnectionCreator();
      var getUserFriendsListSqlString = constructgetUserFriendsListSqlString(userId);
      var getAllCategorisedFriendSqlString = constructGetAllCategorisedFriendSqlString(userId);
    //  dbConnection.end(); return(callback({error: getUserFriendsListSqlString}));
      //console.log("ANGEL: getting user details");
      dbConnection.query(getUserFriendsListSqlString, function (error, results, fields) {
          if (error) {


              dbConnection.end(); return(callback({error: error}));
          } else if (results.length === 0) {
              dbConnection.end(); return(callback({error: "Empty friends list"}));
          } else {
            var friends = {};
            results.forEach(function (result) {
                friends[result.id] = userModel.convertRowsToUserProfileObject(result);
            });

            dbConnection.query(getAllCategorisedFriendSqlString,function(error1,results1,fields1){
              if(error1){
                return(callback({error: error1}));
              }else if (results1.length == 0) {
                return callback({friendList: friends, categorizedFriendList:null});
              }else{
                var categorizedFriends = {};
                results1.forEach(function (result) {
                    categorizedFriends[result.friend_id] = userModel.convertRowsToUserProfileObject(result);
                });
                dbConnection.end();
                  return callback({friendList: friends, categorizedFriendList:categorizedFriends});
              }
            });

          }
      });
    },

    getUserProfileByToken: function (token, token_type, callback) {
        var dbConnection = dbConnectionCreator();
        var getUserSettingsSqlString = constructGetUserProfileByTokenSqlString(token, token_type);
        dbConnection.query(getUserSettingsSqlString, function (error, results, fields) {
            if (error) {


                dbConnection.end(); return(callback({error: error}));
            } else if (results.length === 0) {
                dbConnection.end(); return(callback({error: "Token not found."}));
            } else {
                    dbConnection.end(); return(callback({userData: userModel.convertRowsToUserProfileObject(results)}));
            }
        });
    },
    generateForgotPasswordToken: function (email, callback) {
        var dbConnection = dbConnectionCreator();
        var token = randtoken.generate(16);
        var generateForgotPasswordTokenQuery = constructGenereateForgotPasswordTokenQuery(email,token);

        dbConnection.query(generateForgotPasswordTokenQuery, function (error, results, fields) {
            if (error) {


                dbConnection.end(); return(callback({error: "Error in forget password query", status:400}));
            } else if (results.affectedRows === 1) {
                dbConnection.end(); return(callback({result_token: token,status:200}));

            } else {
                dbConnection.end(); return(callback({error: "User not found.",status:400}));
            }
        });
    },

    resetPasswordByToken: function(data,callback){

      var dbConnection = dbConnectionCreator();
      var resetPasswordByTokenQuery = constructresetPasswordByTokenQuery(data.token,data.pwd);
      dbConnection.query(resetPasswordByTokenQuery, function (error, results, fields) {
          if (error) {


              dbConnection.end(); return(callback({error: resetPasswordByTokenQuery}));
          } else if (results.affectedRows === 1) {
              dbConnection.end(); return(callback({success: "Success"}));

          } else {
              dbConnection.end(); return(callback({error: "Error in update pwd query"}));
          }
      });
    },

    // Send forgot password mail function
    sendForgotPasswordMail(token,from,to,subject,callback){
      var content = '<b>Hello,</b><br/><p>Please click on the link below to reset your password.</p>' +
              '<br/><a href="http://localhost:6969/#/admin/resetPassword/' + token + '" target="_blank">Click here</a>';
              var sendMail = sendMailToUser(token,from,to,subject,content);
      if(sendMail == "success"){
        dbConnection.end(); return(callback({success: "Sent forgot password email", status:200}));
      }else{
          dbConnection.end(); return(callback({success: "Please check your mail to change password",status:200}));
      }


    },


// Signup Function
    signUp: function(data,req,callback){
      //  if(var baseUrl=req.protocol+"://"+req.get('host')){
      //
      //  }else {
      //
      //  }
       var baseUrl ="http://ec2-54-66-221-16.ap-southeast-2.compute.amazonaws.com/#/";
       var dbConnection = dbConnectionCreator();
       var token = randtoken.generate(16);
       data.verify_token = token;
       var signUpQuery = constructsignUpQuery(data);

       // Signup Query for gx_users table
       dbConnection.query(signUpQuery, function (error, results, fields) {
           if (error) {

               if(error.errno == 1062){
                 dbConnection.end(); return(callback({error: "This email is already used.",status:400}));
               }else{
                   dbConnection.end(); return(callback({error: error,status:400}));
               }


          } else if (results.affectedRows === 1) {

            var lastInsertId = results.insertId;
            data.user_id = lastInsertId;
            var inserUserDetailsQuery = constructInsertUserDetailQuery(data);
            //signup query for gx_user_details table
            dbConnection.query(inserUserDetailsQuery,function(errors,result,field){

              if(errors){


                dbConnection.end(); return(callback({error: errors}));
              }else if (result.affectedRows === 1) {

                // Send signup email to user
                //var content = '<b>Hello,</b><br/><p>Please click on the link below to verify and complete your signup.</p>' +
                  //    '<br/><a href="'+baseUrl+'"/#/verifySignUp/' + data.token + '" target="_blank">Click here</a>';
                var content = '<h3>Welcome to Ambulist</h3><br/><a href="'+baseUrl+'"/#/ target="_blank">Click here to login</a>';
                var sendmail = sendMailToUser(data.verify_token,'admin@geodex.com',data.email,'Welcome to Ambulist',content);
                if(sendmail == 'success'){
                  dbConnection.end(); return(callback({success: "Successfully sent verify signup email",status:200}));
                }else{
                  dbConnection.end(); return(callback({success: "send email",status:200}));
                }

              }else {
              dbConnection.end(); return(callback({error: "Error in insert user details",status:400}));
              }
            });

          } else {
              dbConnection.end(); return(callback({error: "Error in signup ", status:400}));
          }
      });

    },


    /* func: Update User Profile
      params: userObject
      return: success or error
    */
    updateUserProfile: function(data,callback){
        var dbConnection = dbConnectionCreator();
        var updateUserQuery=constructupdateUserQuery(data);
        var updateUserDetailsQuery = constructupdateUserDetailQuery(data);
        // Update Query for gx_users table

        dbConnection.query(updateUserQuery, function (error, results, fields) {
            if (error) {


                dbConnection.end(); return(callback({error: error, status:400}));
            } else{

                //Update query for gx_user_details table
                dbConnection.query(updateUserDetailsQuery,function(errors,result,field){
                  if(errors){

                        dbConnection.end(); return(callback({error: "error in update profile",status:400}));
                    }else {
                      dbConnection.end(); return(callback({success: "Updated user data successfully", status:200}));
                    }
                });

            }
        });
    },

    // update user data

    updateUserData(req, callback){

      var uploadImage = common.uploadProfileImage(req.val,req.id);
      if(uploadImage){
        req.val = uploadImage;
      }else{
        dbConnection.end();
        return(callback({error:"Error in uploading"}));
      }

      var dbConnection = dbConnectionCreator();
      var updateUserDataQuery = constructupdateUserDataQuery(req);
      // Update Query for gx_users table


      dbConnection.query(updateUserDataQuery, function (error, results, fields) {
          if (error) {
            dbConnection.end(); return(callback({error: error,status:400}));
          } else if (results.affectedRows === 1) {
            var getUserData = constructGetUserProfileSqlString(req.id);
            dbConnection.query(getUserData,function(error,results,fields){
              if(error){
                dbConnection.end();
                return(callback({error:error, status:200}));
              }else if (results.length == 0) {
                dbConnection.end();
                return(callback({error:"Error in get user details", status:400}));
              }else {
                var userProfile = userModel.convertRowsToUserProfileObject(results[0]);
                dbConnection.end();
                return(callback({success:"Successfully updated image",status:200, userData:userProfile}));

              }
            });

          } else {

            dbConnection.end();
            return(callback({error: "Error in update data",status:400}));

          }
      });
    },

    // change password

    changePassword: function(data,callback){

      var dbConnection = dbConnectionCreator();

      var getUserByEmail = constructGetUserProfileByEmail(data.email);
      dbConnection.query(getUserByEmail, function (error, results, fields) {
          if (error) {


              dbConnection.end(); return(callback({error: error}));
          } else {
             var changePasswordQuery = constructchangePasswordQuery(data.email,data.new_pwd);

              dbConnection.query(changePasswordQuery, function (error, results, fields) {
                  if (error) {


                      dbConnection.end(); return(callback({error: changePasswordQuery}));
                  } else if (results.affectedRows === 1) {
                      dbConnection.end(); return(callback({success: "Success"}));

                  } else {
                      dbConnection.end(); return(callback({error: "Error in update pwd query"}));
                  }
              });

          }

      });

    },

    blockUser: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var blockUserQuery = constructblockUserQuery(data);

      dbConnection.query(blockUserQuery, function (error, results, fields) {
          if (error) {


              dbConnection.end(); return(callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully blocked user"}));
          } else {
              dbConnection.end(); return(callback({error: "Error in block user "}));
          }
      });
    },

    addFriendRequest: function(data, callback){
      var dbConnection = dbConnectionCreator();
      var addFriendQuery = constructAddFriendQuery(data.sender.id,data.receiver.id);
      var checkFriendStatusSqlString = constructFriendStatusSqlString(data.sender.id,data.receiver.id);
      var friendStatus;

      // check if already friend
      dbConnection.query(checkFriendStatusSqlString,function(error,results,fields){
        if(error){
          return(callback({error:error,status:400}))
        }else if (results.length > 0) {
          return(callback({error:"You already have sent friend request to this user",status:400}))
        }else{

          // add friend to friend list
          dbConnection.query(addFriendQuery, function (error, results, fields) {
              if (error) {

                  dbConnection.end(); return(callback({error: error,status:400}));
              } else if (results.affectedRows === 1) {

                var lastInsertId = results.insertId;
                var getFriendRequestByIdSqlString = constructFriendRequestByIdSqlString(lastInsertId);

                dbConnection.query(getFriendRequestByIdSqlString,function(error,results,fields){
                  if(error){
                    return(callback({error:error, status:400}));
                  }else{
                    friendStatus = userModel.convertRowsToUserProfileObject(results[0]);


                    var mailContent = '<b>Hello,</b><br/><p>You have received new friend request from <b>' + data.sender.email + ' </b></p>' +
                            '<br/><a href="http://localhost:6969/#/user/' + data.sender.id + '" target="_blank">Click here</a>';

                    //Send notification email on success
                    //token,from,to,subject,content


                    if(sendMailToUser('','admin@geodex.com',data.receiver.email,'New friend request',mailContent)){
                      return(callback({success:"Successfully sent friend request",status:200,friendStatus:friendStatus}));
                    }else{
                      return(callback({success:"Success added friend request",status:200,friendStatus:friendStatus}));
                    }
                  }
                });


              } else {
                  dbConnection.end(); return(callback({error: "error in add request",status:400}));
              }
          });
        }
      });
    },

    deleteFriend: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var deleteFriendQuery = constructdeleteFriendQuery(data);
      //return callback({success:deleteFriendQuery});
      dbConnection.query(deleteFriendQuery, function (error, results, fields) {
          if (error) {


              dbConnection.end(); return(callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully deleted friend"}));
          } else {
              dbConnection.end(); return(callback({error: results}));
          }
      });
    },

    updateFriendList: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var updateFriendListQuery = constructUpdateFriendListQuery(data);
      dbConnection.query(updateFriendListQuery, function (error, results, fields) {
          if (error) {


              dbConnection.end(); return(callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully Updated friend list"}));
          } else {
              dbConnection.end(); return(callback({error: results}));
          }
      });
    },

    /*
    acceptFriendRequest
    params: requestid
    return: success,status,error
    */

    acceptFriendRequest: function(reqId,callback){
      var dbConnection = dbConnectionCreator();
      var acceptFriendRequestSqlString = constructAcceptFriendRequestSqlString(reqId);

      dbConnection.query(acceptFriendRequestSqlString,function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:acceptFriendRequestSqlString, status:400}));
        }else if (results.affectedRows == 0) {
          dbConnection.end();
          return(callback({error:"Error in accept request query", status:400}));
        }else{
          dbConnection.end();
          return(callback({success:"Successfully accepted request", status:200}));
        }
      });
    },

    /*
     Get all friends requests
     param: userID
    */
    getFriendsRequests(userID){
      var dbConnection = dbConnectionCreator();
      var getFriendsRequestsQuery = constructGetFriendsRequestsQuery(userId);
    },

    /*
    getCategoryByUserId
    params: userId
    return: categories
    */
    getCategoryByUserId: function(userId, callback){
        var dbConnection = dbConnectionCreator();
        var getCategoiresByUserSqlString = constructGetUserCategoriesSqlString(userId);
        dbConnection.query(getCategoiresByUserSqlString,function(error,results,fields){
            if(error){
              dbConnection.end();
              return(callback({error:error}));
            }else if (results.length == 0) {
              dbConnection.end();
              return(callback({error:"No categories found for this user"}));
            }else {
              /* Create object of all categories*/
              var categories = {};
              results.forEach(function (resultIndex) {
                  categories[resultIndex.id] = userModel.convertRowsToUserProfileObject(resultIndex);
              });
              dbConnection.end();
              return(callback({categories:categories}));
            }
        });
    },

    /*
    changeFriendCat
    params: userId,friendId,catId,
    return:
    */
    changeFriendCat: function(data, callback){
      var dbConnection = dbConnectionCreator();
      var checkFriendCatSqlString = constructCheckFriendCatSqlString(data.userId, data.friendId);
      var insertFriendCatSqlString = constructInsertFriendCatSqlString(data.userId, data.friendId, data.catId);
      var updateFriendCatSqlString = constructUpdateFriendSqlString(data.userId, data.friendId, data.catId);
      var friendCat = {};
      dbConnection.query(checkFriendCatSqlString,function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error: error,status:400}));
        }else if (results.length == 0) {
          //Insert New entry
          dbConnection.query(insertFriendCatSqlString,function(error1,result1,field1){
            if(error1){
              dbConnection.end();
              return(callback({error:error1, status:400}));
            }else if (result1.affectedRows == 0) {
              dbConnection.end();
              return(callback({error: "Error in inserting friend cat", status:400}));
            }else {
              var lastInsertId = result1.insertId;
              var getFriendCatById = constructGetFriendCatById(lastInsertId);

              dbConnection.query(getFriendCatById,function(error,results,fields){
                if(error){
                  dbConnection.end();
                  return(callback({error:error, status:400}));
                }else if (results.length == 0) {
                  dbConnection.end();
                  return(callback({error:"Error in getting new record",status:400}))
                }else{
                  friendCat[data.friendId] = userModel.convertRowsToUserProfileObject(results[0]);
                  dbConnection.end();
                  return(callback({success: "successfully enterd friend cat", status:200,categorizedFriends:friendCat}));
                }
              });


            }
          });
        }else {
          //update query
          dbConnection.query(updateFriendCatSqlString,function(error1,result1,field1){
            if(error1){
              dbConnection.end();
              return(callback({error:error1, status:400}));
            }else if (result1.affectedRows == 0) {
              dbConnection.end();
              return(callback({error: "Error in updating friend cat", status:400}));
            }else {

              dbConnection.query(checkFriendCatSqlString,function(error,results,fields){
                if(error){
                  dbConnection.end();
                  return(callback({error:error, status:400}));
                }else if (results.length == 0) {
                  dbConnection.end();
                  return(callback({error:"Error in getting  record",status:400}))
                }else{
                  friendCat[data.friendId] = userModel.convertRowsToUserProfileObject(results[0]);
                  dbConnection.end();
                  return(callback({success: "successfully updated friend cat", status:200,categorizedFriends:friendCat}));
                }
              });



            }
          });
        }
      });
    },

    searchUser:function(str, callback){
      var dbConnection = dbConnectionCreator();
      var searchUserSqlString = constructSearchUserSqlString(str);
      dbConnection.query(searchUserSqlString,function(errors,results,fields){
        if(errors){
          dbConnection.end();
          return(callback({error:error,status:400}));
        }else if (results.length == 0) {
          dbConnection.end();
          return(callback({error:"No rrecord found",status:400}));
        }else {
          var records = {};
          results.forEach(function (resultIndex) {
              records[resultIndex.id] = userModel.convertRowsToUserProfileObject(resultIndex);
          });
          dbConnection.end();
          return(callback({searchResult:records,status:200,success:"user founds successfully"}));
        }
      });
    },

    /*
    getVisitedProfileData
    params:userId,profileId
    response:userProfileData,posts,friendStatus,status
    */

    getVisitedProfileData:function(userId,profileId,callback){
      var dbConnection = dbConnectionCreator();
      var getUserProfileSqlString = constructGetUserProfileSqlString(profileId);
      var getPostsByUserSqlString = constructGetPostByUserSqlString(profileId);
      var getFriendStatusSqlString = constructFriendStatusSqlString(userId,profileId);
      var userProfileData;
      var friendStatus;
      dbConnection.query(getUserProfileSqlString,function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:error,status:400}));
        }else if (results.length == 0) {
          dbConnection.end();
          return(callback({error:"empty result",status:400}));
        }else{
          userProfileData = userModel.convertRowsToUserProfileObject(results[0]);

          //Get Friend Status
          dbConnection.query(getFriendStatusSqlString,function(error,results,fields){
            if(error){
              dbConnection.end();
              return(callback({error:error,status:400}));
            }else if (results.length == 0) {
               friendStatus = null;
            }else{
              friendStatus = userModel.convertRowsToUserProfileObject(results[0]);
            }
          });

          // get posts of user
          dbConnection.query(getPostsByUserSqlString,function(error,results,fields){
            if(error){
              dbConnection.end();
                return(callback({error:error,status:400}));
            }else if (results.length == 0) {
              dbConnection.end();
                return(callback({userProfileData:userProfileData,status:200,posts:null,friendStatus:friendStatus}));
            }else{
              var posts = {}; var i = 0;
                  results.forEach(function (postIndex) {
                  posts[i] = userModel.convertRowsToUserProfileObject(postIndex);
                  i++;
              });
              dbConnection.end();
              return(callback({userProfileData:userProfileData,status:200,posts:posts,friendStatus:friendStatus}));
            }

          });
        }
      });
    },

    /*
    sendEmailFromDashboard
    params: {from,to,subject,content}
    response:success,error,status
    */
    sendEmailFromDashboard:function(data,callback){
      if (sendMailToUser('',data.from,data.to,data.subject,data.content)) {
        //dbConnection.end();
        return(callback({success:"Sent mail successfully", status:200}));
      }else{
        //dbConnection.end();
        return(callback({success:"Sent mail successfully", status:200}));
      }
    },

    checkNews(data, callback){
      var options = {'url': data.url,'timeout': 2000};
      ogs(options, function (err, results,source) {
        if(err){
          return (callback({error:err,source:source}));
        }else {
          return (callback({success:true,news:results.data,source:source}));
            //return results;
        }
      });
    },



};

function constructAcceptFriendRequestSqlString(reqId){
  var sql = "UPDATE gx_friends_list set status=1 WHERE id="+reqId;
  return sql;
}

function constructFriendRequestByIdSqlString(id){
  var query = "SELECT * FROM gx_friends_list WHERE id="+id;
  return query;
}

function constructFriendStatusSqlString(userId,profileId){
  var sql = "SELECT * from gx_friends_list WHERE (sender_id="+profileId+" AND receiver_id="+userId+") OR(sender_id="+userId+" AND receiver_id="+profileId+")";
  return sql;
}

function constructSearchUserSqlString(str){

  var sql = "SELECT DISTINCT(u.id),u.email, ud.first_name,ud.last_name FROM gx_users u,"+
            " gx_user_details ud WHERE (u.email LIKE '"+str+"%' OR  ud.first_name LIKE '"+str+"%' OR last_name LIKE '"+str+"%')"+
            " AND u.id = ud.user_id LIMIT 10 ";
  return sql;
}

function constructInsertFriendCatSqlString(userId,friendId,catId){
  var timestamp = moment();
  var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
  var query = "INSERT INTO `gx_friends_category` (`id`, `user_id`, `friend_id`, `category_id`, `created`)"+
  " VALUES ('', '" + userId + "', '" + friendId + "', '" + catId + "',  '" + formatted + "')";
  return query;
}

function constructUpdateFriendSqlString(userId,friendId,catId){
  var query = "UPDATE gx_friends_category set category_id="+catId+
              " WHERE user_id="+userId+" AND friend_id="+friendId;
              return query;
}

function constructCheckFriendCatSqlString(userId,friendId){
  var query = "Select * from gx_friends_category WHERE user_id="+userId+" AND friend_id="+friendId;
  return query;
}

function  constructGetFriendCatById(id){
  var query = "Select * from gx_friends_category WHERE id="+id;
  return query;
}

function constructDeleteFriendRequestSqlString(requestId){
  var query = "DELETE from  gx_friends_list  WHERE id="+requestId;
  return query;
}

function constructConfirmFriendRequestSqlString(requestId){
  var query = "UPDATE gx_friends_list set status=1 WHERE id="+requestId;
  return query;
}

function constructFriendRequestsSqlString(userId){
  var query = "SELECT (a.id) request_id, b.user_id,CONCAT(b.first_name,' ', b.last_name) Name,"+
              " b.address, b.profile_image, b.gender FROM gx_friends_list a"+
              " LEFT JOIN gx_user_details b ON b.user_id=a.sender_id"+
              " WHERE a.receiver_id="+userId+" AND a.status=0";
  return query;
}

function constructFreindsPostImagesSqlString(friendsIds){
  var query = "Select id,user_id, (image) post_image, youtube_image, youtube_url, content from gx_posts WHERE user_id IN("+friendsIds+") AND (image!='' OR youtube_image!='') order by id DESC";
  return query;
}

function constructFriendListForDashboardSqlString(userId){
  var query="SELECT (a.user_id) id, LOWER(first_name) first_name, LOWER(last_name) last_name, dob,gender,address,latitude,longitude,"+
             "profile_image,cover_image,c.id post_id,(image) post_image,(content) post_content,(select count(1) from gx_posts where user_id = a.user_id) post_count, youtube_url, youtube_image, u.email, (b.modified) created,(c.created) post_date"+
            " FROM `gx_user_details` a,(SELECT receiver_id, modified FROM `gx_friends_list` WHERE sender_id ='"+userId+"'  AND STATUS = 1 UNION SELECT sender_id, modified FROM `gx_friends_list` WHERE receiver_id ='"+userId+"' AND STATUS = 1) b,"+
            " (SELECT t1.* FROM gx_posts t1  WHERE t1.id = (SELECT t2.id FROM gx_posts t2 WHERE t2.user_id = t1.user_id ORDER BY t2.id DESC LIMIT 1) ) c,"+
            " gx_users u WHERE (a.user_id =  '"+userId+"' AND a.user_id = c.user_id AND a.user_id = u.id)"+
            " OR (a.user_id = b.receiver_id AND a.user_id = c.user_id AND a.user_id = u.id) GROUP BY a.user_id  ORDER BY c.id desc";
            return query;
}

function constructFriendListByCatForDashboardSqlString(userId,catId){
  var query="SELECT (a.user_id) id, LOWER(first_name) first_name,last_name,dob,gender,address,latitude,longitude,"+
             "profile_image,cover_image,c.id post_id,(image) post_image,(content) post_content,(select count(1) from gx_posts where user_id = a.user_id) post_count, u.email, (b.modified) created, fc.category_id"+
            " FROM `gx_user_details` a,(SELECT receiver_id, modified FROM `gx_friends_list` WHERE sender_id ='"+userId+"'  AND STATUS = 1 UNION SELECT sender_id, modified FROM `gx_friends_list` WHERE receiver_id ='"+userId+"' AND STATUS = 1) b,"+
            " (SELECT t1.* FROM gx_posts t1 WHERE t1.id = (SELECT t2.id FROM gx_posts t2 WHERE t2.user_id = t1.user_id ORDER BY t2.id DESC LIMIT 1) ) c,  gx_users u, gx_friends_category fc WHERE a.user_id = b.receiver_id AND a.user_id = c.user_id AND a.user_id = u.id AND a.user_id = fc.friend_id AND fc.category_id='"+catId+"' GROUP BY a.user_id ORDER BY c.id desc";
            return query;
}
function constructLatestPostSqlString(userId){
  var query = "Select * from gx_posts WHERE user_id="+userId+" Order By id desc Limit 1";
  return query;
}

function constructGetPostByUserSqlString(userId){
    var query = "select * from gx_posts where user_id="+userId+" order by id DESC";
    return query;
}

function constructUpdateFriendListQuery(data){
  var query ="UPDATE gx_friends_list SET " +
        data.field+ "= '" + data.val+"'" +
      " WHERE receiver_id = " + mysql.escape(data.id);
  return query;
}

function constructAddFriendQuery(sender,receiver){
  var timestamp = moment();
  var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
  var query = "INSERT INTO `gx_friends_list` (`id`, `sender_id`, `receiver_id`, `status`, `blocked_by`, `created`)"+
  " VALUES ('', '" + sender + "', '" + receiver + "', '', '', '" + formatted + "')";
  return query;
}


function constructGetUserCategoriesSqlString(userId){
  var query = "Select * from gx_categories"+
              " WHERE gx_categories.user_id="+mysql.escape(userId)+
              " OR added_by='admin'";
  return query;

}

function constructdeleteFriendQuery(data){
  var query = "DELETE FROM gx_friends_list WHERE id="+data.id;
  return query;
}

function constructblockUserQuery(data){
  var query ="UPDATE gx_friends_list SET " +
        " blocked_by=" + mysql.escape(data.user)+
      " WHERE sender_id = " + mysql.escape(data.sender)+" AND receiver_id="+mysql.escape(data.receiver);
  return query;

}

function constructupdateUserDataQuery(data){
  var timestamp = moment();
  var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
  var query ="UPDATE gx_user_details SET " +
        data.field+ "= '" + data.val+"'" +
      ", last_updated = '" + formatted+"'" +
      " WHERE user_id = " + mysql.escape(data.id);
  return query;
}
function constructchangePasswordQuery(email,new_pwd){
  var salt = bcrypt.genSaltSync(10);
  var passwordHashNew = bcrypt.hashSync(new_pwd, salt);
  var query = " UPDATE  gx_users set password ="+mysql.escape(passwordHashNew)+"  WHERE email = " + mysql.escape(email);
  return query;
}
function constructupdateUserQuery(data){
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query = "UPDATE  `gx_users` SET  `email`="+mysql.escape(data.email)+
                ", `last_updated`='"+formatted+
                "' WHERE id="+data.id;
    return query;
}
function constructupdateUserDetailQuery(data){
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var dob=moment(new Date(data.dob)).format('YYYY-MM-DD');

     var query ="UPDATE gx_user_details SET " +
        "first_name = " + mysql.escape(data.first_name) +
        ", last_name = " + mysql.escape(data.last_name) +
        ", dob = '" + dob+
        "', gender = " + mysql.escape(data.gender) +
        ", address = " + mysql.escape(data.address) +
        ", latitude = " + mysql.escape(data.latitude) +
        ", longitude = " + mysql.escape(data.longitude) +
        ", last_updated = '" + formatted+"'" +
        " WHERE user_id = " + mysql.escape(data.id);

    return query;
}
function sendMailToUser(token,from,to,subject,content){
  //var smtpTransport = require('nodemailer-smtp-transport');

  var options ={
      user: "talentelgia.testing@gmail.com", // Your gmail address.
      clientId: "1049106362726-4eei3tl0inuf3j46ecseqsevbendthcv.apps.googleusercontent.com",
      clientSecret: "7gSMmOvpUBQC6jVy5C_C41mJ",
      refreshToken: "1/8genCpzLHqq32GWGT5cmNcQwlrbkqzjqx1QkRbJ37s4",
      accessToken:"ya29.Ci-KAyJAGea8pMrMWelab6NTdPcTOQWDe_IeR-2o7l5EeAZmhXiMQMtWqZQMyrnfog"
     };
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2:options
  }
});

  var mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      // text: token //, // plaintext body
      html: content
  };
  smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    return "error";
  } else {
    return "success";
  }
  smtpTransport.close();
  });
}

function constructsignUpQuery(data){
  var salt = bcrypt.genSaltSync(10);
  var passwordHash = bcrypt.hashSync(data.password, salt);
  var timestamp = moment();
  var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
  var query = "INSERT INTO `gx_users` (`id`, `role`, `user_name`, `email`, `password`, `is_authenticated`, `verify_token`, `forgot_password_token`, `last_updated`, `date_created`)"+
  " VALUES ('', 'user', '" + data.first_name + "', '" + data.email + "', '" + passwordHash + "', '0', '" + data.verify_token + "', '', '', '" + formatted + "')";
  return query;
}

function constructInsertUserDetailQuery(data){
  var timestamp = moment();
  var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
  var dob=moment(new Date(data.dob)).format('YYYY-MM-DD');

  var query = "INSERT INTO `gx_user_details` (`id`, `user_id`, `first_name`, `last_name`, `dob`, `gender`, `address`,"+
  " `latitude`, `longitude`, `zip`, `profile_image`, `last_updated`, `date_created`)"+
  " VALUES ('', '" + data.user_id + "', '" + data.first_name + "', '" + data.last_name + "', '" + dob+ "', "+
  " '" + data.gender + "', '" + data.address + "', '" + data.latitude + "', '" + data.longitude + "', '', '', '',  '" + formatted + "')";
  return query;
}

function constructresetPasswordByTokenQuery(token, pwd){
  var salt = bcrypt.genSaltSync(10);
  var passwordHash = bcrypt.hashSync(pwd, salt);
  var query = " UPDATE  gx_users set password ="+mysql.escape(passwordHash)+", forgot_password_token=''  WHERE  forgot_password_token = " + mysql.escape(token);
  return query;
}

function constructGetUserProfileSqlString(userId) {

    var query = "SELECT  a.id, a.email,a.role,"+
      " profile_image,cover_image,first_name, last_name, gender, dob, address,latitude,longitude"+
      " FROM gx_users a LEFT JOIN gx_user_details b ON b.user_id = a.id"+
      " WHERE  a.id = " + mysql.escape(userId);

    return query;

}

function constructgetUserFriendsListSqlString(userId){
  var query = "SELECT gfl.*,gu.email, gud.user_id, gud.first_name, gud.last_name, gud.address, gud.profile_image from gx_friends_list as gfl"+
  " left join gx_user_details as gud on gfl.receiver_id = gud.user_id"+
  " left join gx_users as gu on gu.id = gud.user_id"+
  " WHERE  gfl.sender_id="+ mysql.escape(userId)+" Union"+
  " SELECT gfl.*, gu.email,gud.user_id, gud.first_name, gud.last_name, gud.address, gud.profile_image from gx_friends_list as gfl"+
  " left join gx_user_details as gud on gfl.sender_id = gud.user_id"+
   " left join gx_users as gu on gu.id = gud.user_id"+
  " WHERE   gfl.receiver_id="+ mysql.escape(userId);

  return query;
}

function constructGetAllCategorisedFriendSqlString(userId){
  var query = "SELECT a.*, b.category_name from gx_friends_category a, gx_categories b WHERE a.user_id='"+userId+"' AND b.id = a.category_id";
  return query;
}


function constructGetUserProfileByEmail(email) {
    var query = " SELECT  * " +
            " FROM gx_users WHERE  gx_users.email = " + mysql.escape(email);
    return query;

}
function constructGetUserProfileByTokenSqlString(token,token_type) {
    var query = " SELECT  * from gx_users  " +
            " WHERE " + token_type + "  = " + mysql.escape(token);
    return query;

}

function constructGenereateForgotPasswordTokenQuery(email, token) {

    var query = "Update gx_users set forgot_password_token='" + token + "' WHERE email='" + email + "'";
    return query;

}


module.exports = userModel;
