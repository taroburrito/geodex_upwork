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

    router.post('/api/v1/posts/fetchPreviousPost',function(req,res){
      postModel.fetchPreviousPost(req.body,function(result){
        return res.json(result);
      })
    })

    router.post('/api/v1/posts/fetchNextPost',function(req,res){
      postModel.fetchNextPost(req.body,function(result){
        return res.json(result);
      })
    });

    router.post('/api/v1/posts/getUniversalPosts',function(req,res){

      postModel.getUniversalPosts(req.body.userId,req.body.limitFrom,req.body.limitTo,function(result){
        return res.json(result);
      })
    })
    router.post('/api/v1/posts/getLimitedUniversalPosts',function(req,res){

      postModel.getUniversalPosts(req.body.userId,req.body.limitFrom,req.body.limitTo,function(result){
        return res.json(result);
      })
    })

    router.post('/api/v1/posts/getPhotosPost',function(req,res){

      postModel.getPhotosPost(req.body.userId,req.body.limitFrom,req.body.limitTo,function(result){
        return res.json(result);
      })
    })

    router.post('/api/v1/posts/getNewsPosts',function(req,res){

      postModel.getNewsPosts(req.body.userId,req.body.limitFrom,req.body.limitTo,function(result){
        return res.json(result);
      })
    })



    router.get('/api/v1/posts/getPostByFriendsCategory/:userId/:catId',function(req,res){

      postModel.getPostByFriendsCategory(req.params.userId,req.params.catId,function(result){
        return res.json(result);
      })
    });

    router.delete('/api/v1/posts/:id',
            function (req, res) {
                var postId = req.params.id;
                postModel.delete(postId,
                        function (result) {
                            return res.json(result);
                        }
                );
            }
    );




}

module.exports = setPostRoutes;
