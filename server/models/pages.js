/**
 * Pages model
 */
var mysql = require('mysql');
var dbConnectionCreator = require('../utilities/mysqlConnection.js');
var moment = require('moment');

var pageModel = {
    convertRowToObject: function (row) {
        return {
            id: row.id,
            slug: row.slug,
            title: row.title,
            content: row.content,
            meta_tags: row.meta_tags,
            meta_description: row.meta_description,
            last_updated: row.last_updated,
            date_created: row.date_created,
        };
    },
    createPage: function (slug, title, content, status, meta_tags, meta_description, callback) {
        var dbConnection = dbConnectionCreator();
        var createPageSqlString = constructCreatePageSqlString(slug, title, content, status, meta_tags, meta_description);
        dbConnection.query(createPageSqlString, function (error, results, fields) {
            if (error) {

                dbConnection.end(); return(callback({error: error, when: "inserting"}));
            } else {
                var getPageSqlString = getPageDetailSqlString(results.insertId);
                dbConnection.query(getPageSqlString, function (error, results, fields) {

                    if (error) {
                        dbConnection.end(); return(callback({error: error, when: "reading"}));
                    } else {
                        dbConnection.end(); return(callback({page: pageModel.convertRowToObject(results[0])}));
                    }
                });
            }
        });
    },
    updatePage: function (pageId, slug, title, content, status, meta_tags, meta_description, callback) {
        var dbConnection = dbConnectionCreator();
        var updatePageSqlString = constructUpdatePageSqlString(pageId, slug, title, content, status, meta_tags, meta_description);

        dbConnection.query(updatePageSqlString, function (error, results, fields) {
            if (error) {

                dbConnection.end(); return(callback({error: error, when: "updating"}));
            } else {
                var getPageSqlString = getPageDetailSqlString(pageId);
                dbConnection.query(getPageSqlString, function (error, results, fields) {

                    if (error) {
                        dbConnection.end(); return(callback({error: error, when: "reading"}));
                    } else {
                        dbConnection.end(); return(callback({page: pageModel.convertRowToObject(results[0])}));
                    }
                });
            }
        });
    },
    deletePage: function (pageId, callback) {
        var dbConnection = dbConnectionCreator();
        var deletePageSqlString = constructDeletePageSqlString(pageId);
        dbConnection.query(deletePageSqlString, function (error, results, fields) {
            if (error) {

                dbConnection.end(); return(callback({error: error, when: "updating"}));
            } else {
                dbConnection.end(); return(callback({success: "deleted successfully"}));
            }
        });
    },
    getAllPages: function (callback) {
        var dbConnection = dbConnectionCreator();
        var sqlString = getAllPagesSqlString();
        dbConnection.query(sqlString, function (error, results, fields) {

            if (error) {
              dbConnection.end();
                return callback({error: error});
            } else {
                var pages = {};

                results.forEach(function (result) {
                    pages[result.id] = pageModel.convertRowToObject(result);
                });
                dbConnection.end();
                return callback({pages: pages});
            }
        });
    },
    getPageDetails: function (pageId, callback) {
        var dbConnection = dbConnectionCreator();
        var sqlString = getPageDetailSqlString(pageId);
        dbConnection.query(sqlString, function (error, results, fields) {


            if (error) {
              dbConnection.end();
                return callback({error: "Error in get page",status:400});
            } else {
                if(results.length == 0){
                  dbConnection.end();
                    return callback({error: "No record found",status:400});
                }
                var pages = {};
                results.forEach(function (result) {
                    pages = pageModel.convertRowToObject(result);
                });
                dbConnection.end();
                return callback({pages: pages,success:"Successfully get page",status:200});
            }
        });
    }

};

function constructCreatePageSqlString(slug, title, content, status, meta_tags, meta_description) {
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query = "INSERT INTO gx_pages SET " +
            "  slug = " + mysql.escape(slug) +
            ", title = " + mysql.escape(title) +
            ", status = " + mysql.escape(status) +
            ", content = " + mysql.escape(content) +
            ", meta_tags = " + mysql.escape(meta_tags) +
            ", meta_description = " + mysql.escape(meta_description)+
            ", date_created = '" + formatted+"'" ;

    return query;
}

function constructUpdatePageSqlString(pageId, slug, title, content, status, meta_tags, meta_description) {
    var timestamp = moment();
    var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss Z');
    var query = "UPDATE gx_pages SET " +
            "slug = " + mysql.escape(slug) +
            ", title = " + mysql.escape(title) +
            ", content = " + mysql.escape(content) +
            ", status = " + mysql.escape(status) +
            ", meta_tags = " + mysql.escape(meta_tags) +
            ", meta_description = " + mysql.escape(meta_description) +
            ", last_updated = '" + formatted+"'" +
            " WHERE id = " + mysql.escape(pageId);
    return query;
}

function constructDeletePageSqlString(pageId) {
    var query = "DELETE from gx_pages " +
            " WHERE id = " + mysql.escape(pageId);
    return query;
}

function getAllPagesSqlString() {
    var query = " SELECT * FROM gx_pages";
    return query;
}

function getPageDetailSqlString(pageId) {
     var page_Id = parseInt(pageId);
        if(!page_Id){
            var query = " SELECT * FROM gx_pages where slug =" + mysql.escape(pageId) + " LIMIT 1";
        }else{
            var query = " SELECT * FROM gx_pages where id =" + mysql.escape(pageId)+ " LIMIT 1";
        }

    return query;
}

module.exports = pageModel;
