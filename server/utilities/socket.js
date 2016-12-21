
var socketio = require('socket.io');
var todoModel = require('../models/todos');
var categoryModel = require('../models/categories');
var pageModel = require('../models/pages');
var userModel=require('../models/users');
var postModel = require('../models/posts');
var io;

module.exports = {
    setServer: function (server) {
        io = socketio(server);

        io.on('connection', function (socket) {
            console.log('a user connected');

            socket.on('viewing', function () {
                todoModel.getAllUniversalTodos(function (results) {
                    socket.emit("current-universal-todos", results);
                });
            });
            socket.on('getAllCategoriesData',function(){
              categoryModel.getAllCategories(function(result){

                socket.emit("allCategories",result);
              })

            });

            socket.on('getAllFriendsList',function(userId){
              userModel.getAllFriends(userId,function(result){


                socket.emit("allFriendsList",result);
              })
            });

            socket.on('getAllPagesData',function(){

              pageModel.getAllPages(function(result){
                socket.emit("allPages",result);
              })

            });

            socket.on('user-detail',function(userId){
                userModel.getUserProfile(userId,function(result){
                  if(result.friendsArray){
                  postModel.getAllFriendsPost(result.friendsArray,function(res){
                    var final_result = Object.assign({},result,res);
                    socket.emit("userDetail",final_result);
                  })
                }else{
                    socket.emit("userDetail",result);
                }
                  // userModel.getAllFriends(userId,function(res){
                  //   var final_result = Object.assign({},result,res);
                  //   socket.emit("userDetail",final_result);
                  // })

                    // if(result.userData && result.userData.length){
                    //       //  var userData=JSON.stringify(result.userData[0]);
                    //         //var userCategories = JSON.stringify(result.userCategories);
                    //         socket.emit("userDetail",result);
                    // }

                })

            });

//          Viseted user detail
            socket.on('visited-user-detail',function(userId,profileId){
                userModel.getVisitedProfileData(userId,profileId,function(result){
                  socket.emit("visitedUserDetail",result);
                  // userModel.getAllFriends(userId,function(res){
                  //   var final_result = Object.assign({},result,res);
                  //   socket.emit("visitedUserDetail",final_result);
                  // })

                })

            });

            socket.on('fetch-friend-requests',function(userId){
                userModel.getFreindRequests(userId,function(result){
                  socket.emit("friend-requests", result);
                })
              });

              socket.on('fetch-dashboard-data',function(userId,catId){

                userModel.getDashboardData(userId,catId,function(result){

                  socket.emit("dashboad-data", result);
                })
              });

              socket.on('get-categories-by-user', function(userId){
                userModel.getCategoryByUserId(userId, function (result) {
                  socket.emit("categories-by-user", result);
               }
              );
              })



            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
    },
    notifyAllListenersOfNewTodo: function (todo) {
        io.emit('new-todo', todo);
    }

}
