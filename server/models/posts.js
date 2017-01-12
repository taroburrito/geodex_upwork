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
        youtube_image: row.youtube_image,
        youtube_url: row.youtube_url,
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
      if(!formData.image && !formData.youtube_image){
        var image = null;
      }else{
        if(formData.image){
          var uploadImage = common.uploadPostImage(formData.image,formData.thumbImage,formData.user_id);
        }else if (formData.youtube_image) {
          var uploadImage = common.uploadYoutubePostImage(formData.youtube_image,formData.user_id);
        }

        if(uploadImage && formData.image){
          formData.image = uploadImage;
        }else if(uploadImage && formData.youtube_image){
          formData.youtube_image = uploadImage;
        }else{
          dbConnection.end();
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

    fetchPreviousPost: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var createGetPostSiblingSql = constructGetPostSibling(data.postid,data.userid);

      dbConnection.query(createGetPostSiblingSql,function(error, results, fields){
        if(error){
          dbConnection.end(); return(callback({error: error}));
        }else{
          dbConnection.end();
          return(callback({post: results[0]}));
        }
      });
    },

    fetchNextPost: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var createGetPostSiblingSql = constructGetNextPost(data.postid,data.userid);
      dbConnection.query(createGetPostSiblingSql,function(error, results, fields){
        if(error){
          dbConnection.end(); return(callback({error: error}));
        }else{
          dbConnection.end();
          return(callback({post: results[0]}));
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
            dbConnection.end();
            return(callback({status:400,error:"Error in comments query"}));
          }else if (results.length == 0) {
            dbConnection.end();
            return(callback({status:400, error:"No comments found for this post"}));
          }else {
            var comments = [];
            results.forEach(function (result) {
              comments.push(postModel.convertRowsToObject(result));
                // comments[result.id] = postModel.convertRowsToObject(result);
            });
            dbConnection.end();
            return(callback({status:200,comments}));
          }
        })
    },

    postComment: function(data,callback){
      var dbConnection = dbConnectionCreator();
      var postCommentSqlString = constructPostCommentSqlString(data);
      var comment = null;
      dbConnection.query(postCommentSqlString,function(error,results,fields){
        if (error) {
          return(callback({error:"Error in post comment",status:400,query:postCommentSqlString}));
        }else if (results.affectedRows === 1) {
          //var CommentId = results.insertId
          var getCommentsByPostSqlString = constructGetCommentsByIdSqlString(data.post_id);
          dbConnection.query(getCommentsByPostSqlString,function(error,results,fields){
            if(error){
              return(callback({error:error,status:400}))
            }else if (results.length == 0) {
              //return(callback({error:"No comments found"}))
                return(callback({success:"Success post comment",status:200,comment:comment}));
            }else{
               comment = postModel.convertRowsToObject(results[0]);
                 return(callback({success:"Success post comment",status:200,comment:comment}));
            }
          });

        }else{
          return(callback({error:"Error in post comment query",status:400}));
        }
      });
    },

    getUniversalPosts: function(userId,callback){
      var dbConnection = dbConnectionCreator();
      var getUniversalPostsSql = constructUniversalPostsSql(userId);


      dbConnection.query(getUniversalPostsSql,function(error,results,fields){
        if(error){

          return(callback({error:error,status:400,query:getUniversalPostsSql,message:"Error in get all posts"}));
        }else if (results.length == 0) {

          return(callback({error:"empty result",status:400,message:"No post to show"}));
        }else{

          var posts = [];
          results.forEach(function (result) {
            posts.push(postModel.convertRowsToObject(result));
          //  posts['test'] = "testing";
              // comments[result.id] = postModel.convertRowsToObject(result);
          });
          dbConnection.end();

          return(callback({status:200,posts}));
        }
      })
    },

    getPostByFriendsCategory: function(userId,catId,callback){
      var dbConnection = dbConnectionCreator();

      var getPostsByFriendsSql = constructPostsByFriendsSql(userId,catId);
      //return(callback(query:constructPostsByFriendsSql));


      dbConnection.query(getPostsByFriendsSql,function(error,results,fields){
        if(error){

          return(callback({error:error,status:400,query:constructPostsByFriendsSql,message:"Error in get all posts"}));
        }else if (results.length == 0) {

          return(callback({error:"empty result",status:400,message:"No post to show"}));
        }else{

          var posts = [];
          results.forEach(function (result) {
            posts.push(postModel.convertRowsToObject(result));
          //  posts['test'] = "testing";
              // comments[result.id] = postModel.convertRowsToObject(result);
          });
          dbConnection.end();

          return(callback({status:200,posts}));
        }
      })
    },




};

function constructGetCommentsByIdSqlString(postId){
  var sql = "SELECT a.*,"+
            "CONCAT(b.first_name, ' ', b.last_name) NAME,"+
            "b.profile_image,b.address,b.user_id, c.email"+
            " from gx_post_comments as a,"+
            " gx_user_details as b,"+
            " gx_users as c"+
            " WHERE b.user_id = a.user_id"+
            " AND c.id  = a.user_id"+
            " AND post_id="+postId+" ORDER by a.id DESC LIMIT 1";
  return sql;
}
function constructPostsByFriendsSql(userId,catId){
  var sql = "SELECT a.*,"+
            "CONCAT(b.first_name, ' ', b.last_name) NAME,"+
            "b.profile_image,b.address,b.user_id, c.email"+
            " from gx_posts as a,"+
            " gx_user_details as b,"+
            " gx_users as c"+
            " WHERE a.user_id IN (SELECT friend_id FROM `gx_friends_category` WHERE user_id ='"+userId+"'  AND category_id = '"+catId+"') AND b.user_id = a.user_id"+
            " AND c.id  = a.user_id"+
            " ORDER BY a.id DESC LIMIT 30 ";

            return sql;

}

function constructCommentsByPostId(postId){
  var sql = "Select * from gx_post_comments WHERE post_id="+postId;
  return sql;
}

function constructUniversalPostsSql(userId){
  var sql = "SELECT a.*,"+
            "CONCAT(b.first_name, ' ', b.last_name) NAME,"+
            "b.profile_image,b.address,b.user_id, c.email"+
            " from gx_posts as a,"+
            " gx_user_details as b,"+
            " gx_users as c"+
            " WHERE b.user_id = a.user_id"+
            " AND c.id  = a.user_id"+
            " AND a.user_id IN (SELECT receiver_id FROM `gx_friends_list` WHERE sender_id ='"+userId+"'  AND STATUS = 1 UNION SELECT sender_id  FROM `gx_friends_list` WHERE receiver_id ='"+userId+"' AND STATUS = 1)"+
            " ORDER BY a.id DESC ";
  return sql;
}

function constructPostCommentSqlString(data){
  var timestamp = moment();
  var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
  var query = "INSERT INTO gx_post_comments SET " +
          "  post_id = " + mysql.escape(data.post_id) +
          ", parent_id = " + mysql.escape(data.parent_id) +
          ", user_id = " + mysql.escape(data.user_id) +
          ", comment = " + mysql.escape(data.comment) +
          ", status = " + mysql.escape(data.status) +
          ", created = " + mysql.escape(formatted);
  return query;
}

function constructGetCommentsByPostSqlString(postId){
  var sql = "SELECT a.*,"+
            "CONCAT(b.first_name, ' ', b.last_name) NAME,"+
            "b.profile_image,b.address,b.user_id, c.email"+
            " from gx_post_comments as a,"+
            " gx_user_details as b,"+
            " gx_users as c"+
            " WHERE b.user_id = a.user_id"+
            " AND c.id  = a.user_id"+
            " AND post_id="+postId;
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

function constructGetPostSibling(postid,userId){
  var query="SELECT (a.user_id) id, LOWER(first_name) first_name, LOWER(last_name) last_name, dob, gender, address, latitude, longitude, profile_image, cover_image, c.id post_id, (image) post_image, (content) post_content,(select count(1) from gx_posts where user_id = a.user_id) post_count, youtube_url, youtube_image, u.email, modified, (c.created) post_date FROM `gx_user_details` a, (SELECT * FROM gx_posts WHERE id = (SELECT MAX(id) FROM gx_posts WHERE id < "+postid+" AND user_id = "+userId+")) c, gx_users u WHERE a.user_id = "+userId+" AND a.user_id = c.user_id AND a.user_id = u.id GROUP BY a.user_id ORDER BY c.id DESC ";
  return query;
}

function constructGetNextPost(postid,userId){
  var query="SELECT (a.user_id) id, LOWER(first_name) first_name, LOWER(last_name) last_name, dob, gender, address, latitude, longitude, profile_image, cover_image, c.id post_id, (image) post_image, (content) post_content,(select count(1) from gx_posts where user_id = a.user_id) post_count, youtube_url, youtube_image, u.email, modified, (c.created) post_date FROM `gx_user_details` a, (SELECT * FROM gx_posts WHERE id = (SELECT MIN(id) FROM gx_posts WHERE id > "+postid+" AND user_id = "+userId+")) c, gx_users u WHERE a.user_id = "+userId+" AND a.user_id = c.user_id AND a.user_id = u.id GROUP BY a.user_id ORDER BY c.id DESC ";
  return query;
}

function constructCreatePostSqlString(formData) {
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query = "INSERT INTO gx_posts SET " +
            "  user_id = " + mysql.escape(formData.user_id) +
            ", content = " + mysql.escape(formData.content) +
            ", youtube_url = " + mysql.escape(formData.youtube_url) +
            ", youtube_image = " + mysql.escape(formData.youtube_image) +
            ", image = " + mysql.escape(formData.image) +
            ", status = 1 "+
            ", created = '" + formatted+"'" ;

    return query;
}
module.exports = postModel;
