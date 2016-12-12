/**
 * Posts model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var common = require('../utilities/common.js');
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
      if(!formData.image){
        var image = null;
      }else{
        var uploadImage = common.uploadPostImage(formData.image,formData.user_id);
        if(uploadImage){
          formData.image = uploadImage;
        }else{
          return(callback({error:"Error in uploading"}));
        }

        //return(callback({error:uploadImage}));
        // var image = common.decodeBase64Image(formData.image);
        // var newPath = 'public/images/test.jpg';
        //    // make copy of image to new location
        //    fs.writeFile(newPath, image.data, (err) => {
        //      if(err){
        //        return(callback({error:err}));
        //      }
        //      return(callback({file:newPath}));
        //
        //    });
          //return(callback({data:image.data}));
      }

    //  return(callback({success:"die here"}))

        var dbConnection = dbConnectionCreator();
        var createPostSqlString = constructCreatePostSqlString(formData);

        dbConnection.query(createPostSqlString, function (error, results, fields) {
            if (error) {
                
                dbConnection.end(); return(callback({error: error, when: "inserting", status:400}));
            } else if (results.affectedRows === 1) {
                var last_insert_id = results.insertId;
                var createGetPostsByIdSql = constructGetPostById(last_insert_id);
                dbConnection.query(createGetPostsByIdSql,function(error1,result1,fields1){
                  if(error1){
                    dbConnection.end(); return(callback({error: "Error while fetching last data", status:400}));
                  }else{
                    var posts = {};
                    dbConnection.end(); return(callback({status:200,post: postModel.convertRowsToPostObject(result1[0])}));
                  }
                });

            }else{
              return(callback({error:"Error in post query", status:400}));
            }
        });
    },

    getPostsByUserId: function(userId,callback){
      var dbConnection = dbConnectionCreator();
      var createGetPostsByUserSql = constructGetPostByUserSqlString(userId);

      dbConnection.query(createGetPostsByUserSql,function(error, results, fields){
        if(error){
          dbConnection.end(); return(callback({error: error}));
        }else{

          dbConnection.end(); return(callback({success:results}));
        }
      });
    },

    getPostsById: function(id,callback){
      var dbConnection = dbConnectionCreator();
      var createGetPostsByIdSql = constructGetPostById(id);

      dbConnection.query(createGetPostsByIdSql,function(error, results, fields){
        if(error){
          dbConnection.end(); return(callback({error: error}));
        }else{

          dbConnection.end(); return(callback({success:results}));
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
            var posts = []
            var users_array = []

            // results.forEach(function (result) {
            //     var user_id = result.user_id;
            //     if(users_array.indexOf(user_id) == -1){
            //       users_array.push(user_id);
            //       posts[result.user_id] = postModel.convertRowsToObject(result);
            //     }else{
            //       var abc = [posts[result.user_id]];
            //
            //       abc.push(postModel.convertRowsToObject(result));
            //       posts[result.user_id] = abc;
            //     }
            //
            //
            // });


            dbConnection.end(); return(callback({friendsPost:results}));
          }
        });

    },

    /*
    getComments
    params:postId
    return:comments object or error
    */
    getComments: function(postId,callback){
        var dbConnection = dbConnectionCreator();
        var getCommentsByPostSqlString = constructGetCommentsByPostSqlString(postId);
        dbConnection.query(getCommentsByPostSqlString, function(error,results,fields){
          if(error){
            return(callback({status:400,error:"Error in comments query"}));
          }else if (results.length == 0) {
            return(callback({status:400, error:"No comments found for this post"}));
          }else {
            var comments = {};
            results.forEach(function (result) {
                comments[result.id] = postModel.convertRowsToObject(result);
            });
            return(callback({status:200,comments}));
          }
        })
    }



};

function constructGetCommentsByPostSqlString(postId){
  var sql = "SELECT * from gx_post_comments WHERE post_id="+postId;
  return sql;
}

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
