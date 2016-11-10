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
        var createCategorySqlString = constructCreateCategorySqlString(req);
        //return (callback({success:createCategorySqlString}));
        dbConnection.query(createCategorySqlString, function (error, results, fields) {
            if (error) {
                dbConnection.destroy();
                return (callback({error: error, when: "inserting"}));
            } else {
                var getCategorySqlString = getCategoryDetailSqlString(results.insertId);
                dbConnection.query(getCategorySqlString, function (error, results, fields) {
                    dbConnection.destroy();
                    if (error) {
                        return (callback({error: error, when: "reading"}));
                    } else {
                        return (callback({category: categoryModel.convertRowToObject(results[0])}));
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
                dbConnection.destroy();
                return (callback({error: error, when: "updating"}));
            } else {
                var getCategorySqlString = getCategoryDetailSqlString(catId);
                dbConnection.query(getCategorySqlString, function (error, results, fields) {
                    dbConnection.destroy();
                    if (error) {
                        return (callback({error: error, when: "reading"}));
                    } else {
                        return (callback({page: categoryModel.convertRowToObject(results[0])}));
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
                dbConnection.destroy();
                return (callback({error: error, when: "updating"}));
            } else {
                return (callback({success: "deleted successfully"}));
            }
        });
    },
    getAllCategories: function (callback) {
        var dbConnection = dbConnectionCreator();
        var sqlString = getAllCategoriesSqlString();
        dbConnection.query(sqlString, function (error, results, fields) {
            dbConnection.destroy();
            if (error) {
                return callback({error: error});
            } else {
                var categories = {};
                results.forEach(function (result) {
                    categories[result.id] = categoryModel.convertRowToObject(result);
                });
                return callback({categories: categories});
            }
        });
    },
    getCategoryDetails: function (catId, callback) {
        var dbConnection = dbConnectionCreator();
        var sqlString = getCategoryDetailSqlString(catId);
        dbConnection.query(sqlString, function (error, results, fields) {
            dbConnection.destroy();
            if (error) {
                return callback({error: error});
            } else {
                var category = {};
                results.forEach(function (result) {
                    category[result.id] = categoryModel.convertRowToObject(result);
                });
                return callback({category: category});
            }
        });
    }

};

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
