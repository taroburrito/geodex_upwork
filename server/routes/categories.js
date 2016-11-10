var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply when needed
var categoryModel = require('../models/categories.js');

var setCategoryRoutes = function (router) {
/*return all cms pages*/
    router.get('/api/v1/categories',
            function (req, res) {
                categoryModel.getAllCategories(function (result) {
                    return res.json(result);
                }
                );
            }
    );

    /*return single category*/
    router.get('/api/v1/categories/:id',
            function (req, res) {
                var pageId = req.params.id;
                categoryModel.getCategoryDetails(pageId, function (result) {
                    return res.json(result);
                }
                );
            }
    );

/*create new category*/
    //router.post('/api/v1/pages/addPage', authenticationMiddleware.isLoggedIn,
    router.post('/api/v1/categories/addCategory',
            function (req, res) {
                categoryModel.createCategory(req.body,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

/*edit category*/
    router.post('/api/v1/categories/editcategory/:id',
            function (req, res) {
                var catId = req.params.id;
                categoryModel.updatecategory(catId,
                        req.body.category_name,
                        req.body.status,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

/*delete cms page*/
    router.delete('/api/v1/categories/:id',
            function (req, res) {
                var catId = req.params.id;
                categoryModel.deleteCategory(catId,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

}

module.exports = setCategoryRoutes;
