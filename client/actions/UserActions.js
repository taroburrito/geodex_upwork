/*
 * action types
 */
export const Fetch_Freind_List = 'Fetch_Freind_List';
export const Delete_friend_Success = 'Delete_friend_Success';
export const Fetch_User_Data = 'Fetch_User_Data';
export const Fetch_Friends_Posts = 'Fetch_Friends_Posts';
export const Update_Friend_List = 'Update_Friend_List';
export const Fetch_Dashboard_Data = 'Fetch_Dashboard_Data';
export const Post_Added_Dashboard_Success = 'Post_Added_Dashboard_Success';
export const Category_Added_Dashboard_Success = 'Category_Added_Dashboard_Success';
export const Fetch_Freind_Requests = 'Fetch_Freind_Requests';



/*
 * other constants
 */

/*
 * action creators
 */
 export function receivedAllfriendsList(friendList){
   //console.log(friendList);
   return {type: Fetch_Freind_List, data: friendList}
 }

 export function updatefriendsList(friendList){
   //console.log(friendList);
   return {type: Update_Friend_List, data: friendList}
 }

 export function receivedAllFriendsPosts(friendsPosts){
   console.log(friendsPosts);
   return {type: Fetch_Friends_Posts, data:friendsPosts}
 }

 export function getUserDataSuccess(userData){
   return{type: Fetch_User_Data, data:userData}
 }

 export function getDashboardDataSuccess(dashboardData) {
   return{type: Fetch_Dashboard_Data, data:dashboardData}
 }

export function clickedBlockUser(senderId,receiverId,userId) {

  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/user/blockUser',
      dataType: 'json',
			data: {sender:senderId, receiver:receiverId, user:userId} })
			.done(function(data) {
				if (data.error){
					console.log("block user works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("block user success", data);
					//	dispatch(deleteFriendSuccess(data));
					}
				})
			.fail(function(a,b,c,d) {
				console.log("actual failure: ", a, b, c, d)
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
  }
}

export function clickedAddFriend(sender,receiver) {

    $.ajax({
      type:'POST',
      url:'/api/v1/user/addFriendRequest',
      dataType:'json',
      data:{sender:sender,receiver:receiver},
    }).done(function(data){
      console.log("Success add friend request :"+ JSON.stringify(data));
    }).fail(function(error){
      console.log("Error in add friend request:"+JSON.stringify(error));
    });


}

export function respondFriendRequest(id) {

    $.ajax({
      type:'POST',
      url:'/api/v1/user/updateFriendList/'+id,
      dataType:'json',
      data:{field:"status", val:1,id:id},
    }).done(function(data){
      console.log("Success add friend request :"+ JSON.stringify(data));
    }).fail(function(error){
      console.log("Error in add friend request:"+JSON.stringify(error));
    });


}

export function deleteFriendSuccess(id){
  return {type: Delete_friend_Success, id:id}
}

export function clickedDeleteFriend(id) {

//  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/user/deleteFriend/'+id})
			.done(function(data) {
				if (data.error){
					console.log("delete friend works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("delete friend success", data);
						//dispatch(deleteFriendSuccess(id));
					}
				})
			.fail(function(a,b,c,d) {
				console.log("delete failure: ", a, b, c, d)
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
//}
}

export function addPostSuccess(post){
  return{type: Post_Added_Dashboard_Success, post};
}

export function addPost(formData){
  return (dispatch) => {
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/addPost',
      dataType:'JSON',
      data:formData
    }).done(function(data){
      if(data.error){
        console.log(data.error);
      }else{
      console.log(data);
      dispatch(addPostSuccess(data.post));

      }

    }).error(function(error){
      console.log("Error in posts api call"+JSON.stringify(error));
    })
  }
}

export function addCategorySuccess(category) {
  return{type: Category_Added_Dashboard_Success, category};
}

export function addCategory(req) {
  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/categories/addCategory',
      dataType: 'json',
			data: req })
			.done(function(data) {
				if (data.error){
					console.log("add todo worked but error: ", data);
        //  dispatch(handleErrorMessage(data.error));

					} else {
						console.log("add todo success", data);
            dispatch(addCategorySuccess(data.category));
          //  dispatch(handleSuccessMessage("Added Successfully"));

					}
				})
			.fail(function(error) {
				console.log("Failure");
      //  dispatch(handleErrorMessage(error));
			});
  }
}

export function fetchFriendsRequestsFailed(error) {

}

export function fetchFriendsRequestsSuccess(friendRequests) {
return{type: Fetch_Freind_Requests, friendRequests}
}

export function confirmFriendRequest(requestId){

  return (dispatch) =>{
    $.ajax({
      type: 'POST',
      url: '/api/v1/users/confirmFriendRequest',
      data:{id:requestId},
      dataType: 'json'
    }).done(function(result){
      if(result.error){
        console.log("Error in confirm firend request query");
      }else{
        console.log("Confirm frined success");
      }
    }).fail(function(error){
      console.log("Error in confirm request call "+ JSON.stringify(error));
    });
  }
}
