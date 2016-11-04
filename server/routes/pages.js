var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply when needed
var pageModel = require('../models/pages.js');

var setPageRoutes = function (router) {
    /*return all cms pages*/
    router.get('/api/v1/pages',
            function (req, res) {
                pageModel.getAllPages(function (result) {
                    return res.json(result);
                }
                );
            }
    );

    /*return single cms page*/
    router.get('/api/v1/pages/:id',
            function (req, res) {
                var pageId = req.params.id;
                pageModel.getPageDetails(pageId, function (result) {
                  console.log(result);
                    return res.json(result);
                }
                );
            }
    );

    /*create new cms page*/
    //router.post('/api/v1/pages/addPage', authenticationMiddleware.isLoggedIn,
    router.post('/api/v1/pages/addPage',
            function (req, res) {

                pageModel.createPage(req.body.slug,
                        req.body.title,
                        req.body.content,
                        req.body.status,
                        req.body.meta_tags,
                        req.body.meta_description,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

    /*edit cms page*/
    router.post('/api/v1/pages/editPage/:id',
            function (req, res) {
          
                var pageId = req.params.id;
                pageModel.updatePage(pageId,
                        req.body.slug,
                        req.body.title,
                        req.body.content,
                        req.body.status,
                        req.body.meta_tags,
                        req.body.meta_description,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

    /*delete cms page*/
    router.delete('/api/v1/pages/:id',
            function (req, res) {

                var pageId = req.params.id;
                pageModel.deletePage(pageId,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

}

module.exports = setPageRoutes;
