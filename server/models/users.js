/**
 * User model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var randtoken = require('rand-token');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var moment = require('moment');



var userModel = {
    convertRowsToUserProfileObject: function (rows) {
        var objString=JSON.stringify(rows);
        var obj=JSON.parse(objString);
        return obj;
        /*var userInfo = {
            id: rows[0].id,
            email: rows[0].email,
            role:rows[0].role,
            forgot_password_token:rows[0].forgot_password_token,
            date_created:rows[0].date_created,

        }
        return {
            userInfo: userInfo,
            //userCreatedTodos: todos
        };*/
    },

    getUserProfile: function (userId, callback) {
        var dbConnection = dbConnectionCreator();
        var getUserSettingsSqlString = constructGetUserProfileSqlString(userId);
        var getUsersCategoriesSqlString = constructGetUserCategoriesSqlString(userId);
        var getUserFriendsListSqlString = constructgetUserFriendsListSqlString(userId);
        var createGetPostsByUserSql = constructGetPostByUserSqlString(userId);
        var profileData;
        var userCategoriesData;
  //return (callback({error: getUsersCategoriesSqlString}));
        dbConnection.query(getUserSettingsSqlString, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();

                return (callback({error: error}));
            } else if (results.length === 0) {
                return (callback({error: "User not found."}));
            } else {
              userProfileData = userModel.convertRowsToUserProfileObject(results);
              dbConnection.query(getUsersCategoriesSqlString, function (error1, results1, fields1) {
                if (error1) {
                    dbConnection.destroy();

                    return (callback({error: error1}));
                } else if (results1.length === 0) {
                    return (callback({error: "User Categories not found."}));
                }else {
                  var categories = {};
                  results1.forEach(function (resultIndex) {
                      categories[resultIndex.id] = userModel.convertRowsToUserProfileObject(resultIndex);
                  });
                  dbConnection.query(createGetPostsByUserSql,function(error2,result2,fields2){
                    if(error2){
                      var posts = null;
                      return (callback({userData: userProfileData,userCategories: categories,posts:posts}));
                    }else{
                      var posts = {};
                          result2.forEach(function (postIndex) {
                          posts[postIndex.id] = userModel.convertRowsToUserProfileObject(postIndex);
                      });

                      dbConnection.query(getUserFriendsListSqlString,function(error3,result3,fields3){
                        if(error3){
                          return (callback({userData: userProfileData,userCategories: categories,posts:posts,friendList:error3}));
                        }else if (result3.length === 0) {
                          return (callback({userData: userProfileData,userCategories: categories,posts:posts,friendList:null}));
                        }else {
                          var friends = {};
                          var friendsIds = [];
                          result3.forEach(function (friendIndex) {
                              friends[friendIndex.id] = userModel.convertRowsToUserProfileObject(friendIndex);
                              if(friendIndex.status == 1)
                              friendsIds.push(friendIndex.user_id);

                          });
                          return (callback({userData: userProfileData,userCategories: categories,posts:posts,friendList:friends,friendsArray:friendsIds}));
                        }
                      });

                    }
                  });


                }
              });

            }
        });
    },

    getAllFriends: function(userId, callback){
      var dbConnection = dbConnectionCreator();
      var getUserFriendsListSqlString = constructgetUserFriendsListSqlString(userId);
    //  return (callback({error: getUserFriendsListSqlString}));
      //console.log("ANGEL: getting user details");
      dbConnection.query(getUserFriendsListSqlString, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();
              console.log("error: ", error);
              return (callback({error: error}));
          } else if (results.length === 0) {
              return (callback({error: "User not found."}));
          } else {
            var friends = {};
            results.forEach(function (result) {
                friends[result.id] = userModel.convertRowsToUserProfileObject(result);
            });
            return callback({friendList: friends});
          }
      });
    },

    getUserProfileByToken: function (token, token_type, callback) {
        var dbConnection = dbConnectionCreator();
        var getUserSettingsSqlString = constructGetUserProfileByTokenSqlString(token, token_type);
        dbConnection.query(getUserSettingsSqlString, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();
                console.log("error: ", error);
                return (callback({error: error}));
            } else if (results.length === 0) {
                return (callback({error: "Token not found."}));
            } else {
                    return (callback({userData: userModel.convertRowsToUserProfileObject(results)}));
            }
        });
    },
    generateForgotPasswordToken: function (email, callback) {
        var dbConnection = dbConnectionCreator();
        var token = randtoken.generate(16);
        var generateForgotPasswordTokenQuery = constructGenereateForgotPasswordTokenQuery(email,token);

        dbConnection.query(generateForgotPasswordTokenQuery, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();

                return (callback({error: generateForgotPasswordTokenQuery}));
            } else if (results.affectedRows === 1) {
                return (callback({result_token: token}));

            } else {
                return (callback({error: "User not found."}));
            }
        });
    },

    resetPasswordByToken: function(data,callback){

      var dbConnection = dbConnectionCreator();
      var resetPasswordByTokenQuery = constructresetPasswordByTokenQuery(data.token,data.pwd);
      dbConnection.query(resetPasswordByTokenQuery, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();

              return (callback({error: resetPasswordByTokenQuery}));
          } else if (results.affectedRows === 1) {
              return (callback({success: "Success"}));

          } else {
              return (callback({error: "Error in update pwd query"}));
          }
      });
    },

    // Send forgot password mail function
    sendForgotPasswordMail(token,from,to,subject,callback){
      var content = '<b>Hello,</b><br/><p>Please click on the link below to reset your password.</p>' +
              '<br/><a href="http://localhost:6969/#/admin/resetPassword/' + token + '" target="_blank">Click here</a>';
      var sendMail = sendMailToUser(token,from,to,subject,content);
      if(sendMail == 'success'){
        return (callback({success: "Sent forgot password email"}));
      }else{
          return (callback({success: "Sent forgot password email"}));
      }


    },


// Signup Function
    signUp(data,callback){

       var dbConnection = dbConnectionCreator();
       var token = randtoken.generate(16);
       data.verify_token = token;
       var signUpQuery = constructsignUpQuery(data);

       // Signup Query for gx_users table
       dbConnection.query(signUpQuery, function (error, results, fields) {
           if (error) {
               dbConnection.destroy();

              return (callback({error: error}));
          } else if (results.affectedRows === 1) {

            var lastInsertId = results.insertId;
            data.user_id = lastInsertId;
            var inserUserDetailsQuery = constructInsertUserDetailQuery(data);

            //signup query for gx_user_details table
            dbConnection.query(inserUserDetailsQuery,function(errors,result,field){

              if(errors){

                dbConnection.destroy();
                return (callback({error: errors}));
              }else if (result.affectedRows === 1) {

                // Send signup email to user
                var content = '<b>Hello,</b><br/><p>Please click on the link below to verify and complete your signup.</p>' +
                        '<br/><a href="http://localhost:6969/#/verifySignUp/' + data.token + '" target="_blank">Click here</a>';
                if(sendMailToUser(data.verify_token,'admin@geodex.com',data.email,'Verify Signup',content)){
                  return (callback({success: "Successfully sent verify signup email"}));
                }else{
                  return (callback({success: "Successfully sent verify signup email"}));
                }

              }else {
              return (callback({error: "Error in insert user details"}));
              }
            });

          } else {
              return (callback({error: "Error in signup "}));
          }
      });

    },


    // Update User Function

    updateUser(data,callback){
        var dbConnection = dbConnectionCreator();
        var updateUserQuery=constructupdateUserQuery(data);
        var updateUserDetailsQuery = constructupdateUserDetailQuery(data);
        // Update Query for gx_users table

        dbConnection.query(updateUserQuery, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();

                return (callback({error: error}));
            } else if (results.affectedRows === 1) {

                //Update query for gx_user_details table
                dbConnection.query(updateUserDetailsQuery,function(errors,result,field){
                  if(errors){
                    dbConnection.destroy();
                        return (callback({error: errors}));
                    }else if (result.affectedRows === 1) {
                      return (callback({success: "Update user data successfully"}));
                    }else {
                        return (callback({error: "Error in updating user details"}));
                    }
                });

            } else {
                return (callback({error: "Error in update "}));
            }
        });
    },

    // update user data

    updateUserData(req, callback){
      var dbConnection = dbConnectionCreator();
      var updateUserDataQuery = constructupdateUserDataQuery(req);
      // Update Query for gx_users table


      dbConnection.query(updateUserDataQuery, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();

              return (callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully updated cover"}));
          } else {
              return (callback({error: "Error in update "}));
          }
      });
    },

    // change password

    changePassword: function(data,callback){

      var dbConnection = dbConnectionCreator();

      var getUserByEmail = constructGetUserProfileByEmail(data.email);
      dbConnection.query(getUserByEmail, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();

              return (callback({error: error}));
          } else {
             var changePasswordQuery = constructchangePasswordQuery(data.email,data.new_pwd);

              dbConnection.query(changePasswordQuery, function (error, results, fields) {
                  if (error) {
                      dbConnection.destroy();

                      return (callback({error: changePasswordQuery}));
                  } else if (results.affectedRows === 1) {
                      return (callback({success: "Success"}));

                  } else {
                      return (callback({error: "Error in update pwd query"}));
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
              dbConnection.destroy();

              return (callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully blocked user"}));
          } else {
              return (callback({error: "Error in block user "}));
          }
      });
    },

    addFriendRequest: function(data, callback){
      var dbConnection = dbConnectionCreator();
      var addFriendQuery = constructAddFriendQuery(data.sender.id,data.receiver.user_id);

      dbConnection.query(addFriendQuery, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();

              return (callback({error: error}));
          } else if (results.affectedRows === 1) {

            var mailContent = '<b>Hello,</b><br/><p>You have received new friend request from <b>' + data.sender.email + ' </b></p>' +
                    '<br/><a href="http://localhost:6969/#/user/' + data.sender.id + '" target="_blank">Click here</a>';

            //Send notification email on success
            //token,from,to,subject,content
            sendMailToUser('','admin@geodex.com',data.receiver.email,'New friend request',mailContent);
            return(callback({success:"Successfully sent friend request"}));
          } else {
              return (callback({error: results}));
          }
      });
    },

    deleteFriend: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var deleteFriendQuery = constructdeleteFriendQuery(data);
      //return callback({success:deleteFriendQuery});
      dbConnection.query(deleteFriendQuery, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();

              return (callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully deleted friend"}));
          } else {
              return (callback({error: results}));
          }
      });
    },

    updateFriendList: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var updateFriendListQuery = constructUpdateFriendListQuery(data);
      dbConnection.query(updateFriendListQuery, function (error, results, fields) {
          if (error) {
              dbConnection.destroy();

              return (callback({error: error}));
          } else if (results.affectedRows === 1) {
            return(callback({success:"Successfully Updated friend list"}));
          } else {
              return (callback({error: results}));
          }
      });
    },



};

function constructGetPostByUserSqlString(userId){
    var query = "select * from gx_posts where user_id="+userId;
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
                "' WHERE id="+data.user_id;
    return query;
}
function constructupdateUserDetailQuery(data){
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query ="UPDATE gx_user_details SET " +
        "first_name = " + mysql.escape(data.first_name) +
        ", last_name = " + mysql.escape(data.last_name) +
        ", dob = " + mysql.escape(data.dob) +
        ", gender = " + mysql.escape(data.gender) +
        ", address = " + mysql.escape(data.address) +
        ", latitude = " + mysql.escape(data.latitude) +
        ", longitude = " + mysql.escape(data.longitude) +
        ", profile_image = " + mysql.escape(data.profile_image) +
        ", last_updated = '" + formatted+"'" +
        " WHERE user_id = " + mysql.escape(data.user_id);
    return query;
}
function sendMailToUser(token,from,to,subject,content){
  var smtpTransport = require('nodemailer-smtp-transport');

  var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
         user: 'celebsingh1313@gmail.com', // Your email id
         pass: 'edc@12345' // Your password
      }
  }));

  var mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      // text: token //, // plaintext body
      html: content
  };
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {

          return false;
      } else {

        return true;
      }


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
  var query = "INSERT INTO `gx_user_details` (`id`, `user_id`, `first_name`, `last_name`, `dob`, `gender`, `address`,"+
  " `latitude`, `longitude`, `zip`, `profile_image`, `last_updated`, `date_created`)"+
  " VALUES ('', '" + data.user_id + "', '" + data.first_name + "', '" + data.last_name + "', " + data.dob + ", "+
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
    var query = " SELECT  *, profile_image " +
            " FROM gx_users LEFT JOIN gx_user_details " +
            " ON gx_user_details.user_id = gx_users.id" +
            " WHERE  gx_users.id = " + mysql.escape(userId);
    return query;

}

function constructgetUserFriendsListSqlString(userId){
  var query = "SELECT gfl.*, gud.user_id, gud.first_name, gud.last_name, gud.address, gud.profile_image from gx_friends_list as gfl"+
  " left join gx_user_details as gud on gfl.receiver_id = gud.user_id"+
  " WHERE  gfl.sender_id="+ mysql.escape(userId)+" Union"+
  " SELECT gfl.*, gud.user_id, gud.first_name, gud.last_name, gud.address, gud.profile_image from gx_friends_list as gfl"+
  " left join gx_user_details as gud on gfl.sender_id = gud.user_id"+
  " WHERE   gfl.receiver_id="+ mysql.escape(userId);
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
