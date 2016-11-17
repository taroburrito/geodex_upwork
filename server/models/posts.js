/**
 * Posts model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var moment = require('moment');

var postModel = {

  convertRowsToPostObject: function (row) {
    return {
        id: row.id,
        user_id: row.user_id,
        content: row.content,
        image: row.image,
        status: row.status,
        created: row.created,
        modified:row.modified
    };

  },

  convertRowsToObject: function (rows) {
      var objString=JSON.stringify(rows);
      var obj=JSON.parse(objString);
      return obj;

  },

    createPost: function (formData, callback) {
        var dbConnection = dbConnectionCreator();
        var createPostSqlString = constructCreatePostSqlString(formData);

        dbConnection.query(createPostSqlString, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();
                return (callback({error: error, when: "inserting"}));
            } else if (results.affectedRows === 1) {
                var last_insert_id = results.insertId;
                var createGetPostsByIdSql = constructGetPostById(last_insert_id);
                dbConnection.query(createGetPostsByIdSql,function(error1,result1,fields1){
                  if(error1){
                    return (callback({error: "Error while fetching last data"}));
                  }else{
                    var posts = {};
                    return (callback({post: postModel.convertRowsToPostObject(result1[0])}));
                  }
                });

            }else{
              return(callback({error:"Error in post query"}));
            }
        });
    },

    getPostsByUserId: function(userId,callback){
      var dbConnection = dbConnectionCreator();
      var createGetPostsByUserSql = constructGetPostByUserSqlString(userId);

      dbConnection.query(createGetPostsByUserSql,function(error, results, fields){
        if(error){
          return (callback({error: error}));
        }else{

          return (callback({success:results}));
        }
      });
    },

    getPostsById: function(id,callback){
      var dbConnection = dbConnectionCreator();
      var createGetPostsByIdSql = constructGetPostById(id);

      dbConnection.query(createGetPostsByIdSql,function(error, results, fields){
        if(error){
          return (callback({error: error}));
        }else{

          return (callback({success:results}));
        }
      });
    },

    getAllFriendsPost: function(friends, callback){

        var dbConnection = dbConnectionCreator();
        var createGetAllFriendsPostsSql = constructGetAllFriendsPostsSql(friends);
        dbConnection.query(createGetAllFriendsPostsSql,function(error,results,fields){
          if(error){

          }else if (results.length == 0) {

          }else{
            var posts = {};
            var users_array = []

            results.forEach(function (result) {
                var user_id = result.user_id;
                if(users_array.indexOf(user_id) == -1){
                  users_array.push(user_id);
                  posts[result.user_id] = postModel.convertRowsToObject(result);
                }else{
                  var abc = [posts[result.user_id]];

                  abc.push(postModel.convertRowsToObject(result));
                  posts[result.user_id] = abc;
                }


            });


            return (callback({friendsPost:posts}));
          }
        });

    }



};

function constructGetAllFriendsPostsSql(friends){
  var friends_str = friends.toString();
  var query = "Select * from gx_posts where user_id IN("+friends_str+")";
  return query;
}

function constructGetPostByUserSqlString(userId){
    var query = "select * from gx_posts where user_id="+userId;
    return query;
}

function constructGetPostById(id){
  var query = "select * from gx_posts where id="+id;
  return query;
}

function constructCreatePostSqlString(formData) {
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query = "INSERT INTO gx_posts SET " +
            "  user_id = " + mysql.escape(formData.user_id) +
            ", content = " + mysql.escape(formData.content) +
            ", image = " + mysql.escape(formData.image) +
            ", status = 1 "+
            ", created = '" + formatted+"'" ;

    return query;
}
module.exports = postModel;
