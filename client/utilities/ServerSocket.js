import { receivedAllUniversalTodos, optimisticUniversalAddSuccess } from '../actions/TodoActions';
import { receivedAllUniversalCategories, fetchcategoriesByUserId } from '../actions/CategoryActions';
import { receivedAllUniversalPages } from '../actions/PageActions';
import {getVisitedUserData, getUserDetails} from '../actions/ProfileActions';
import {receivedAllfriendsList, receivedAllFriendsPosts, getDashboardDataSuccess, fetchFriendsRequestsSuccess} from '../actions/UserActions';
import {receivedAllposts} from '../actions/PostActions';


var socket = io();
var  encode =function(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

export function linkSocketToStore(dispatch) {
	// Add listeners that dispatch actions here.
	socket.on("current-universal-todos", function(result){
		// console.log("got all todos!", result);
		if(result.error){
			//TODO handle some how
			alert("something went wrong retrieving all todos");
		} else {
			dispatch(receivedAllUniversalTodos(result.todos));
		}
	});

	socket.on("new-todo", function(result){
		// console.log("got a new todo!", result);
		if(result.error){
			//Do nothing
		} else {
			dispatch(optimisticUniversalAddSuccess(result.todo));
		}
	});

  socket.on('categories-by-user',function(result){
    console.log(result);
    if(result.error){

    }else{
      dispatch(fetchcategoriesByUserId(result.categories));
    }
  });

	socket.on("allCategories",function(result){
		if(result.error){

		console.log("Error in server socket");
		} else {
			console.log(result);
			dispatch(receivedAllUniversalCategories(result.categories));
		}
	});

  socket.on("allFriendsList",function(result){
		if(result.error){

		console.log("Error in server socket line 68:"+JSON.stringify(result.error));
		} else {
			console.log(result);
			//dispatch(receivedAllfriendsList(result.friendList));
      dispatch(receivedAllfriendsList(result.friendList, result.categorizedFriendList));
		}
	});

	socket.on("allPages",function(result){

		if(result.error){
			console.log("Error in server socket");
		}else{
			dispatch(receivedAllUniversalPages(result.pages));
		}
	});

  socket.on("dashboad-data",function(res){
    console.log(res);
    if(res.error){

    }else{

      dispatch(getDashboardDataSuccess(res));
    }
  });

  socket.on("friend-requests",function(res){
    console.log(res);
    if(res.error){

    }else{

      dispatch(fetchFriendsRequestsSuccess(res.friendRequests));
    }
  });

	socket.on("userDetail",function(res){


    var friendsPosts = res.friends;
    var postObj = [];
    if(friendsPosts && friendsPosts.length){
      friendsPosts.forEach((friendsPost)=>{

        // console.log("postObj.indexOf(friendsPost.user_id): "+postObj.indexOf(friendsPost.user_id))
        if(postObj[friendsPost.user_id]){
          console.log('if part');
          // console.log('prev length was: '+ postObj[friendsPost.user_id].length)
          postObj[friendsPost.user_id].push(friendsPost);
          // console.log('current length is: '+ postObj[friendsPost.user_id].length)
        } else{
          var temp = [];
          temp.push(friendsPost);
          postObj[friendsPost.user_id] = temp;
        }
      });
    }
    //user profile data
    var userdata = res.userData;

    // user category data
   var userCategoriesData = res.userCategories;
   userdata.categories = userCategoriesData;
  //  console.log(userdata);
		if(userdata.error){
			console.log("Error in server socket");
		}else{

			dispatch(getUserDetails(userdata));

     dispatch(receivedAllUniversalCategories(userCategoriesData));
     dispatch(receivedAllfriendsList(res.friendList));
     dispatch(receivedAllposts(res.posts));
     dispatch(receivedAllFriendsPosts(postObj));
		}
	});

// Visited user detail
  socket.on("visitedUserDetail",function(res){
    console.log(res);
    //user profile data
    // var userdata = res.userData;
    //
    // // user category data
    // var userCategoriesData = res.userCategories;
    // // visited users friendlist
    // var friendList = res.friendList;
    // userdata.categories = userCategoriesData;
    // userdata.friends = friendList;
    // userdata.posts = res.posts;
  //  console.log(userdata);
		if(res.error){
			console.log("Error in server socket");
		}else{

			dispatch(getVisitedUserData(res));
		}
	});


}

// Add functions that emit socket events:
export function registerToUniversalTodo() {
	socket.emit("viewing");
}

export function registerCategory(){
	socket.emit("getAllCategoriesData");
}

export function fetchFriendList(userId){
  socket.emit("getAllFriendsList",userId)
}

export function registerPages(){
	socket.emit("getAllPagesData");
}

//LoggedIn user profile detail
export function getUserDetail(userId){
	socket.emit("user-detail",userId);
}

// visited user profile detail
export function getVisitedUserDetail(userId,profileId){
  
  socket.emit("visited-user-detail", userId,profileId);
}

export function fetchDashboardData(userId,catId){
  //console.log(catId);
  socket.emit("fetch-dashboard-data", userId,catId);
}

export function fetchFriendsRequests(userId){
  socket.emit("fetch-friend-requests", userId);
}

export function getCategoryByUserId(userId){
  socket.emit("get-categories-by-user", userId);
}
