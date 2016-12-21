var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply when needed
var postModel = require('../models/posts.js');

var setPostRoutes = function (router) {
  router.post('/api/v1/posts/addPost',
            function (req, res) {
                postModel.createPost(req.body,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );

    router.post('/api/v1/posts/postComment',function(req,res){
      postModel.postComment(req.body,function(result){
        return res.json(result);
      })
    })

    router.get('/api/v1/posts/getComments/:id',function(req,res){
        var postId = req.params.id;
        postModel.getComments(postId,function(result){
            return res.json(result);
        });
    });



}

module.exports = setPostRoutes;
