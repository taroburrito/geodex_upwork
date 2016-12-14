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
    }



};

function constructgetAllUsersSqlString(){
  var sql = "SELECT a.*, b.first_name, b.last_name, b.address,b.profile_image"+
   " FROM gx_users as a, gx_user_details as b  WHERE a.id = b.user_id AND a.role !='admin'";
  return sql;
}
module.exports = adminModel;
