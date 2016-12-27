/**
 * Admin model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var common = require('../utilities/common.js');
var moment = require('moment');

var adminModel = {
  convertRowsToObject: function (rows) {
      var objString=JSON.stringify(rows);
      var obj=JSON.parse(objString);
      return obj;

  },

    /*
    getAllUsers

    return:usersList
    */
    getAllUsers: function(callback){

        var dbConnection = dbConnectionCreator();
        var getAllUsers = constructgetAllUsersSqlString();
        dbConnection.query(getAllUsers, function(error,results,fields){
          if(error){
            dbConnection.end();
            return(callback({status:400,fail:"Error in get all users query",error,query:getAllUsers}));
          }else if (results.length == 0) {
            dbConnection.end();
            return(callback({status:400, error:"No User found."}));
          }else {
            var userList = {};
            results.forEach(function (result) {
                userList[result.id] = adminModel.convertRowsToObject(result);
            });
            dbConnection.end();
            return(callback({status:200,userList,success:"Successfully get all user data"}));
          }
        })
    },

    /*
    fetchProfile
    params: userId
    return:userProfile
    */

    fetchProfile: function(userId,callback){
      //return(callback({success:"hello"}));
      var dbConnection = dbConnectionCreator();
      var getUserProfile = constructUserProfileSqlString(userId);
      dbConnection.query(getUserProfile,function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:error,status:400,message:"Error  in get user profile"}));
        }else if (results.length == 0) {
          dbConnection.end();
          return(callback({status:400,error:"No result found for this user"}));
        }else {

          dbConnection.end();
          return(callback({success:"Succesfully get data",status:200,userProfile:adminModel.convertRowsToObject(results[0])}));
        }
      })
    },

    deleteUser: function(userId,callback){
      var dbConnection = dbConnectionCreator();
      var deleteUserSql = constructChnageUserStatus(userId,'deleted');
      dbConnection.query(deleteUserSql,function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:error,status:400,message:"Error  in delete user",query:deleteUserSql}));
        }else if (results.affectedRows == 0) {
          dbConnection.end();
          return(callback({status:400,error:"Error in delete user"}));
        }else {

          dbConnection.end();
          return(callback({success:"Succesfully delete user",status:200}));
        }
      })
    },

    updateUserStatus: function(userId,status,callback){
      var dbConnection = dbConnectionCreator();
      var changeStatusSql = constructChnageUserStatus(userId,status);
      dbConnection.query(changeStatusSql,function(error,results,fields){
        if(error){
          dbConnection.end();
          return(callback({error:error,status:400,message:"Error  in update user",query:changeStatusSql}));
        }else if (results.affectedRows == 0) {
          dbConnection.end();
          return(callback({status:400,error:"Error in update user"}));
        }else {

          dbConnection.end();
          return(callback({success:"Succesfully updated user",status:200}));
        }
      })
    }



};

function constructChnageUserStatus(userId,status){
  var sql = "UPDATE gx_users set status='"+status+"' WHERE id="+userId;
  return sql;
}

function constructUserProfileSqlString(userId){
  var sql = "SELECT a.id,a.email,a.status,a.date_created,CONCAT(b.first_name, ' ', b.last_name)NAME, b.address,"+
            "b.profile_image,b.cover_image FROM gx_users as a, gx_user_details as b"+
            " WHERE a.id = b.user_id AND a.id="+userId;
            return sql;
}

function constructgetAllUsersSqlString(){
  var sql = "SELECT a.id, a.email, a.status, CONCAT(first_name, ' ', last_name)NAME, address,"+
            " (profile_image) image, (created) recent_activity, (a.date_created) join_date"+
            " FROM gx_users as a LEFT JOIN (select first_name,user_id,last_name,address,profile_image from gx_user_details) b"+
            " ON b.user_id = a.id left JOIN (select * from gx_posts ORDER BY created) c"+
            " ON c.user_id = a.id WHERE a.role = 'user' AND a.status !='deleted'";
  return sql;
}
module.exports = adminModel;
