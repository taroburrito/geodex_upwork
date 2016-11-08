
var socketio = require('socket.io');
var todoModel = require('../models/todos');
var categoryModel = require('../models/categories');
var pageModel = require('../models/pages');
var userModel=require('../models/users');
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
                    if(result.userData && result.userData.length){
                            var userData=JSON.stringify(result.userData[0]);
                            socket.emit("userDetail",userData);
                    }

                })

            });



            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
    },
    notifyAllListenersOfNewTodo: function (todo) {
        io.emit('new-todo', todo);
    }

}
