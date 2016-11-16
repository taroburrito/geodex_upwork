/**
 * Posts model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var moment = require('moment');

var postModel = {

    createPost: function (formData, callback) {
        var dbConnection = dbConnectionCreator();
        var createPostSqlString = constructCreatePostSqlString(formData);

        dbConnection.query(createPostSqlString, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();
                return (callback({error: error, when: "inserting"}));
            } else if (results.affectedRows === 1) {
              return(callback({success:"Posted successfully"}));
            }else{
              return(callback({error:"Error in post query"}));
            }
        });
    }


};

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
