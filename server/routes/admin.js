var authenticationMiddleware = require('../middlewares/authentication.js');
var adminModel = require('../models/admin.js');

var setAdminRoutes = function (router) {
  router.get('/api/v1/admin/getAllUsers',//authenticationMiddleware.isLoggedIn,
          function (req, res) {
              adminModel.getAllUsers(function(result){
                return res.json(result);
              })

          }
  );

  router.get('/api/v1/admin/fetchProfile/:id',//authenticationMiddleware.isLoggedIn,
          function (req, res) {
              var userId = req.params.id;

              adminModel.fetchProfile(userId,function(result){
                return res.json(result);
              })

          }
  );

  router.post('/api/v1/admin/delete_user',//authenticationMiddleware.isLoggedIn,
          function (req, res) {
              var userId = req.body.id;

              adminModel.deleteUser(userId,function(result){
                return res.json(result);
              })

          }
  );

  router.post('/api/v1/admin/change_user_status',//authenticationMiddleware.isLoggedIn,
          function (req, res) {
              var userId = req.body.id;
              var status = req.body.status;

              adminModel.updateUserStatus(userId,status,function(result){
                return res.json(result);
              })

          }
  );

}

module.exports = setAdminRoutes;
