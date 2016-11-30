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
export const Confirm_Friend_Success = 'Confirm_Friend_Success';
export const Confirm_Friend_Failed = 'Confirm_Friend_Failed';
export const Delete_Friend_Request_Success = 'Delete_Friend_Request_Success';
export const Delete_Friend_Request_Failed = 'Delete_Friend_Request_Failed';
export const Update_Dashboard_Friend_List = 'Update_Dashboard_Friend_List';
export const Search_Users_Result_Success = 'Search_Users_Result_Success';
export const Clear_Search_List = 'Clear_Search_List';
export const Add_Category_Dashboard_Failed = 'Add_Category_Dashboard_Failed';
export const Set_Message_To_Default = 'Set_Message_To_Default';



/*
 * other constants
 */

/*
 * action creators
 */
 export function receivedAllfriendsList(friendList,categorizedFriendList){
   //console.log(friendList);
   return {type: Fetch_Freind_List, friendList: friendList, categorizedFriendList:categorizedFriendList}
 }

 export function updatefriendsList(friendList){
   //console.log(friendList);
   return {type: Update_Friend_List, data: friendList}
 }

 export function updateDashboardFriendList(friendList){
   //console.log(friendList);
   return {type: Update_Dashboard_Friend_List, data: friendList}
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

/* addPost
  params: user_id,content,image
  return: post
*/
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
  return{type: Category_Added_Dashboard_Success, category,success:"Added category successfully"};
}

export function addCategoryFail(msg){
  return{type: Add_Category_Dashboard_Failed, error:msg}
}

export function setMessageToDefault(){
  return{type: Set_Message_To_Default}
}

export function addCategory(req) {
  return (dispatch) => {
    dispatch(setMessageToDefault());
    $.ajax({
			type: 'POST',
			url: '/api/v1/categories/addCategory',
      dataType: 'json',
			data: req })
			.done(function(data) {
				if (data.error){
					console.log("add todo worked but error: ", data);
          dispatch(addCategoryFail(data.error));

					} else {
						console.log("add todo success", data);
            dispatch(addCategorySuccess(data.category));
          //  dispatch(handleSuccessMessage("Added Successfully"));

					}
				})
			.fail(function(error) {
				console.log("Failure");
      dispatch(addCategoryFail(error));
			});
  }
}

export function fetchFriendsRequestsFailed(error) {

}

export function fetchFriendsRequestsSuccess(friendRequests) {
return{type: Fetch_Freind_Requests, friendRequests}
}

export function confirmFriendSuccess(requestId,success){
  return{type:Confirm_Friend_Success,id:requestId, msg:success};
}
export function confirmFriendFailed(error){
  return{type:Confirm_Friend_Failed, msg:error};
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
        dispatch(confirmFriendFailed(result.error));
      }else{
        dispatch(confirmFriendSuccess(requestId,result.success));
      }
    }).fail(function(error){
      dispatch(confirmFriendFailed("Error in confirm request call"));
    });
  }
}

export function deleteFriendRequestSuccess(requestId, success){
  return{type:  Delete_Friend_Request_Success,id:requestId, msg:success};
}

export function deleteFriendRequestFailed(error){
    return{type:Delete_Friend_Request_Failed, msg:error};
}

export function deleteFriendRequest(requestId){

  return (dispatch) =>{
    $.ajax({
      type: 'DELETE',
      url: '/api/v1/users/deleteFriendRequest/'+requestId,

    }).done(function(result){
      if(result.error){
        console.log("Error in confirm firend request query");
        dispatch(deleteFriendRequestFailed(result.error));
      }else{
        dispatch(deleteFriendRequestSuccess(requestId,result.success));
      }
    }).fail(function(error){
      dispatch(deleteFriendRequestFailed("Error in confirm request call"));
    });
  }
}

export function getCategoryByUserId(userId){
  console.log("Here");
  return (dispatch) => {
    $.ajax({
      type:'GET',
      url: 'api/v1/users/getCategoryByUserId/'+userId,
    }).done(function(result){
      console.log("Success get cat by user id");
    }).fail(function(error){
      console.log("Error in get cat by user id");
    });
  }
}

export function changeFriendCat(userId,friendId, catId){
  return(dispatch) => {
    $.ajax({
      type: 'POST',
      url: '/api/v1/users/changeFriendCat',
      data:{userId:userId,friendId:friendId,catId:catId},
      dataType: 'json'
    }).done(function(result){
      console.log("success:"+JSON.stringify(result));
    }).fail(function(error){
      console.log("success:"+JSON.stringify(error));
    });
  }
}

export function searchUserSuccess(result){
  return{type:Search_Users_Result_Success,data:result};
}

export function clearSearchList (){

  return{type: Clear_Search_List};
}
export function searchUser(str){
  return(dispatch) => {
    $.ajax({
      type:'GET',
      url: 'api/v1/users/searchUser/'+str,

    }).done(function(result){
      dispatch(searchUserSuccess(result.searchResult));
    }).fail(function(error){
      console.log(error);
    })
  }
}
