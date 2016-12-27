/**
 * category model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var moment = require('moment');

var categoryModel = {
    convertRowToObject: function (row) {
        return {
            id: row.id,
            category_name: row.category_name,
            status: row.status,
            last_updated: row.last_updated,
            date_created: row.date_created
        };
    },
    createCategory: function (req, callback) {
        var dbConnection = dbConnectionCreator();
        var checkDuplicatEntry = constructCheckDuplicateEntry(req);
        var createCategorySqlString = constructCreateCategorySqlString(req);
        //dbConnection.end(); return(callback({success:createCategorySqlString}));


        dbConnection.query(checkDuplicatEntry, function (error, results, fields) {
            if (error) {

                dbConnection.end(); return(callback({error: error, status:400}));
            }else if (results.length > 0) {
                dbConnection.end(); return(callback({error: "You already added this category", status:400}));
            } else {

              dbConnection.query(createCategorySqlString, function (error, results, fields) {
                if(error){
                  return(callback({error:"Error in insert category",status:400}));
                }else if (results.affectedRows == 0) {
                  return(callback({error:"No category inserted",status:400}));
                }else{
                  var getCategorySqlString = getCategoryDetailSqlString(results.insertId);
                  dbConnection.query(getCategorySqlString, function (error, results, fields) {

                      if (error) {
                          dbConnection.end(); return(callback({error: error, when: "reading",status:400}));
                      } else {
                          dbConnection.end(); return(callback({status:200,category: categoryModel.convertRowToObject(results[0])}));
                      }
                  });
                }

              });





            }
        });
    },
    updatecategory: function (catId, name, status, callback) {
        var dbConnection = dbConnectionCreator();
        var updatecategorySqlString = constructUpdateCategorySqlString(catId, name, status);
        dbConnection.query(updatecategorySqlString, function (error, results, fields) {
            if (error) {

                dbConnection.end(); return(callback({error: error, when: "updating"}));
            } else {
                var getCategorySqlString = getCategoryDetailSqlString(catId);
                dbConnection.query(getCategorySqlString, function (error, results, fields) {

                    if (error) {
                        dbConnection.end(); return(callback({error: error, when: "reading"}));
                    } else {
                        dbConnection.end(); return(callback({category: categoryModel.convertRowToObject(results[0])}));
                    }
                });
            }
        });
    },
    deleteCategory: function (pageId, callback) {
        var dbConnection = dbConnectionCreator();
        var deleteCategorySqlString = constructDeleteCategorySqlString(pageId);
        dbConnection.query(deleteCategorySqlString, function (error, results, fields) {
            if (error) {

                dbConnection.end(); return(callback({error: error, when: "updating"}));
            } else {
                dbConnection.end(); return(callback({success: "deleted successfully"}));
            }
        });
    },
    getAllCategories: function (callback) {
        var dbConnection = dbConnectionCreator();
        var sqlString = getAllCategoriesSqlString();
        dbConnection.query(sqlString, function (error, results, fields) {

            if (error) {
              dbConnection.end();
                return callback({error: error});
            } else {
                var categories = {};
                results.forEach(function (result) {
                    categories[result.id] = categoryModel.convertRowToObject(result);
                });
                dbConnection.end();
                return callback({categories: categories});
            }
        });
    },
    getCategoryDetails: function (catId, callback) {
        var dbConnection = dbConnectionCreator();
        var sqlString = getCategoryDetailSqlString(catId);
        dbConnection.query(sqlString, function (error, results, fields) {

            if (error) {
              dbConnection.end();
                return callback({error: error});
            } else {
                var category = {};
                results.forEach(function (result) {
                    category[result.id] = categoryModel.convertRowToObject(result);
                });
                dbConnection.end();
                return callback({category: category});
            }
        });
    }

};

function constructCheckDuplicateEntry(req){
  var sql = "SELECT * FROM gx_categories  WHERE user_id="+req.user_id+" AND category_name='"+req.category_name+"'";
  return sql;
}

function constructCreateCategorySqlString(req) {
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query = "INSERT INTO gx_categories SET " +
              " user_id = " + mysql.escape(req.user_id) +
            ", category_name = " + mysql.escape(req.category_name) +
            ", added_by = " + mysql.escape(req.added_by) +
            ", status = 1" +
            ", date_created = '" + formatted + "'";

    return query;
}

function constructUpdateCategorySqlString(catId, name,  status) {
    var query = "UPDATE gx_categories SET " +
            "category_name = " + mysql.escape(name) +
            ", status = " + mysql.escape(status) +
            " WHERE id = " + mysql.escape(catId);
    return query;
}

function constructDeleteCategorySqlString(catId) {
    var query = "DELETE from gx_categories " +
            " WHERE id = " + mysql.escape(catId);
    return query;
}

function getAllCategoriesSqlString() {
    var query = " SELECT * FROM gx_categories where status = 1 AND added_by = 'admin'";
    return query;
}

function getCategoryDetailSqlString(catId) {
    var query = " SELECT * FROM gx_categories where id =" + mysql.escape(catId);
    return query;
}

module.exports = categoryModel;
