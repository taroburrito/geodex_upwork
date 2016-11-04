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
        //console.log("ANGEL: getting user details");
        dbConnection.query(getUserSettingsSqlString, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();
                console.log("error: ", error);
                return (callback({error: error}));
            } else if (results.length === 0) {
                return (callback({error: "User not found."}));
            } else {
                  return (callback({userData: userModel.convertRowsToUserProfileObject(results)}));
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
        console.log(updateUserQuery);
        console.log(updateUserDetailsQuery);
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


                            return (callback({success: "Profile Data successfully updated"}));

                    }else {
                        return (callback({error: "Error in updating user details"}));
                    }
                });

            } else {
                return (callback({error: "Error in update "}));
            }
        });
    }


};
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
    /*"UPDATE `gx_user_details` SET  `first_name`='"+data.first_name+"', `last_name`='"+data.last_name+"', `dob`='"+data.dob+"', `gender`='"+data.gender+"', `address`='"+data.address+"',"+
        " `latitude`='"+data.latitude+"', `longitude`='"+data.longitude+"',`last_updated`='" + formatted + "' WHERE user_id="+data.id;*/
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
    var query = " SELECT  * " +
            " FROM gx_users LEFT JOIN gx_user_details " +
            " ON gx_user_details.user_id = gx_users.id" +
            " WHERE  gx_users.id = " + mysql.escape(userId);
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
