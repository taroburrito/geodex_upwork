/*
 * action types
 */
export const Fetch_Freind_List = 'Fetch_Freind_List';
export const Delete_friend_Success = 'Delete_friend_Success';
export const Fetch_User_Data = 'Fetch_User_Data';
export const Fetch_Friends_Posts = 'Fetch_Friends_Posts';
export const Update_Friend_List = 'Update_Friend_List';
export const Fetch_Dashboard_Data = 'Fetch_Dashboard_Data';
//export const Post_Added_Dashboard_Success = 'Post_Added_Dashboard_Success';
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
export const Send_Email_From_Dashboard_Success = 'Send_Email_From_Dashboard_Success';
export const Send_Email_From_Dashboard_Failed = 'Send_Email_From_Dashboard_Failed';
export const Change_Friend_Cat_Success = 'Change_Friend_Cat_Success';
export const Change_Friend_Cat_Failed = 'Change_Friend_Cat_Failed';
export const Delete_Category_Success = 'Delete_Category_Success';
export const Delete_Category_Failed = 'Delete_Category_Failed';
export const Update_Category_Failed_Dashboard = 'Update_Category_Failed_Dashboard';
export const Update_Category_Success_Dashboard = 'Update_Category_Failed_Dashboard';
export const Fetch_Previous_Post_Success = 'Fetch_Previous_Post_Success';
export const Fetch_Previous_Post_Failed = 'Fetch_Previous_Post_Failed';
export const Fetch_Next_Post_Success = 'Fetch_Next_Post_Success';
export const Fetch_Next_Post_Failed = 'Fetch_Next_Post_Failed';
export const Check_News_Success = 'Check_News_Success';
export const Check_News_Failed = 'Check_News_Failed';
export const Initialize_Check_News = 'Initialize_Check_News';

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
   return {type: Update_Dashboard_Friend_List, friends: friendList}
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
			data: {sender:senderId, receiver:receiverId, user:userId},
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data) {
      $(".loading").hide();
				if (data.error){
					console.log("block user works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("block user success", data);
					//	dispatch(deleteFriendSuccess(data));
					}

				})
			.fail(function(a,b,c,d) {
				console.log("actual failure: ", a, b, c, d);
        $(".loading").hide();
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
  }
}

export function deleteFriendSuccess(id){
  return {type: Delete_friend_Success, id:id}
}

export function clickedDeleteFriend(id) {

//  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/user/deleteFriend/'+id,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data) {
       $(".loading").hide();
				if (data.error){
					console.log("delete friend works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("delete friend success", data);
						//dispatch(deleteFriendSuccess(id));
					}

				})
			.fail(function(a,b,c,d) {
				console.log("delete failure: ", a, b, c, d);
        $(".loading").hide();
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
//}
}



export function addCategorySuccess(category) {
  return{type: Category_Added_Dashboard_Success, category,success:"Added category Successfully"};
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
			data: req,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data) {
				if (data.error){

          dispatch(addCategoryFail(data.error));

					} else {
						console.log("add todo success", data);
            dispatch(addCategorySuccess(data.category));
          //  dispatch(handleSuccessMessage("Added Successfully"));

					}
          	$(".loading").hide();
				})
			.fail(function(error) {
				console.log("Failure");
        $(".loading").hide();
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
      dataType: 'json',
       beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(result){
      $(".loading").hide();
      if(result.error){
        console.log("Error in confirm friend request query");
        dispatch(confirmFriendFailed(result.error));
      }else{
        dispatch(confirmFriendSuccess(requestId,result.success));
      }

    }).fail(function(error){
      $(".loading").hide();
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
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(result){
      $(".loading").hide();
      if(result.error){
        console.log("Error in confirm firend request query");
        dispatch(deleteFriendRequestFailed(result.error));
      }else{
        dispatch(deleteFriendRequestSuccess(requestId,result.success));
      }

    }).fail(function(error){
      dispatch(deleteFriendRequestFailed("Error in confirm request call"));
      $(".loading").hide();
    });
  }
}

export function getCategoryByUserId(userId){
  console.log("Here");
  return (dispatch) => {
    $.ajax({
      type:'GET',
      url: 'api/v1/users/getCategoryByUserId/'+userId,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(result){
      console.log("Success get cat by user id");
      $(".loading").hide();
    }).fail(function(error){
      $(".loading").hide();
      console.log("Error in get cat by user id");
    });
  }
}

export function changeFriendCatSuccess(result,friendId){
  return{type: Change_Friend_Cat_Success,data:result,friendId:friendId}
}

export function changeFriendCatFailed(error){
  return{type: Change_Friend_Cat_Failed, error:error}
}

export function changeFriendCat(userId,friendId, catId){
  return(dispatch) => {
    $.ajax({
      type: 'POST',
      url: '/api/v1/users/changeFriendCat',
      data:{userId:userId,friendId:friendId,catId:catId},
      dataType: 'json',
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(result){
       $(".loading").hide();
      console.log("success:"+JSON.stringify(result));
      if(result.error){

        dispatch(changeFriendCatFailed(result.error));
      }else {
        console.log(result);
        dispatch(changeFriendCatSuccess(result.categorizedFriends,friendId));
      }

    }).fail(function(error){
      console.log("success:"+JSON.stringify(error));
      dispatch(changeFriendCatFailed(error));
      $(".loading").hide();
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

export function sendEmailFromDashboardSuccess(msg){
  return{type:'Send_Email_From_Dashboard_Success', success:msg}
}

export function sendEmailFromDashboardFailed(msg){
  return{type: 'Send_Email_From_Dashboard_Failed', error:msg}
}

export function sendEmailFromDashboard(from,to,subject,content){
  return(dispatch)=>{
    dispatch(setMessageToDefault());
    $.ajax({
      type:'POST',
      url:'/api/v1/users/sendEmailFromDashboard',
      data:{from:from,to:to,subject:subject,content:content},
      dataType:'json',
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(result){
      $(".loading").hide();
      if(result.error){
        dispatch(sendEmailFromDashboardFailed(result.error));
      }else{
        dispatch(sendEmailFromDashboardSuccess(result.success));
      }
    }).fail(function(error){
      console.log("Failed email request");
      $(".loading").hide();
      dispatch(sendEmailFromDashboardFailed(error));
    });
  }
}

export function deleteCategorySuccess(Id){
  return{type: Delete_Category_Success, id:Id};
}

export function deleteCategoryFailed(error){
  return{type: Delete_Category_Failed, error}
}

export function deleteCategory(Id) {
  return (dispatch) => {

    $.ajax({
			type: 'DELETE',
			url: '/api/v1/categories/'+Id,
			data: '',
      beforeSend: function() {
          $(".loading").show();
      }
     })
			.done(function(data) {
        $(".loading").hide();
				if (data.error){
					  dispatch(deleteCategoryFailed(data.error));
        	} else {
					  dispatch(deleteCategorySuccess(Id));
          	}

				})
			.fail(function(error) {
        $(".loading").hide();
				dispatch(deleteCategoryFailed(error));
			});
  }
}

export function updateCategorySuccess(id,category){

  return{type: Update_Category_Success_Dashboard, id:id, category};
}

export function updateCategoryFailed(error){
  return{type: Update_Category_Failed_Dashboard, error}
}

export function updateCategoryById(id, value){
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/categories/editcategory/'+id,
      dataType:'JSON',
      data:{category_name:value,status:1},
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      $(".loading").hide();
      if(data.error){
        dispatch(updateCategoryFailed(data.error));
      }else{

        dispatch(updateCategorySuccess(id,data.category));
      }

    }).fail(function(error){
      $(".loading").hide();
      dispatch(updateCategoryFailed(error));
    })
  }
}

export function fetchPreviousPostSuccess(data) {
  return {type:Fetch_Previous_Post_Success,data}
}

export function fetchPreviousPostFailed(data) {
  return {type:Fetch_Previous_Post_Failed,data}
}

export function fetchPreviousPost(postid,userid){
return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/posts/fetchPreviousPost/',
      dataType:'JSON',
      data:{postid:postid,userid:userid},
      beforeSend: function() {
          $("#loader_"+userid).show();
      }
    }).done(function(data){
        $("#loader_"+userid).hide();
      if(Object.keys(data).length === 0 && data.constructor === Object){
        dispatch(fetchPreviousPostFailed(userid));
      }else{
        dispatch(fetchPreviousPostSuccess(data));
      }
    }).fail(function(error){
      $("#loader_"+userid).hide();
      dispatch(fetchPreviousPostFailed(userid));
    })
  }
}

export function fetchNextPostSuccess(data) {
  return {type:Fetch_Next_Post_Success,data}
}

export function fetchNextPostFailed(data) {
  return {type:Fetch_Next_Post_Failed,data}
}

export function fetchNextPost(postid,userid){
return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/posts/fetchNextPost/',
      dataType:'JSON',
      data:{postid:postid,userid:userid},
      beforeSend: function() {
          $("#loader_"+userid).show();
      }
    }).done(function(data){
     // console.log(data);
    $("#loader_"+userid).hide();
      if(Object.keys(data).length === 0 && data.constructor === Object){
        dispatch(fetchNextPostFailed(userid));
      }else{
        dispatch(fetchNextPostSuccess(data));
      }

    }).fail(function(error){
   $("#loader_"+userid).hide();
      dispatch(fetchNextPostFailed(userid));
    })
  }
}

export function checkNewsSuccess(news){
  return {type: Check_News_Success,news}
}

export function checkNewsFailed(){
  return {type: Check_News_Failed}
}

export function initializeCheckNews(){
  return {type: Initialize_Check_News}
}

export function checkNews(url){
  return(dispatch) => {
    dispatch(initializeCheckNews())
      $.ajax({
        type:'Post',
        url:'/api/v1/users/checkNews',
        dataType:'JSON',
        data:{url:url},
        beforeSend: function() {

            $(".loading").show();
        }
      }).done(function(data){
       // console.log(data);
       if(data.eror){
         console.log("Error in check news");
         console.log(checkNewsFailed);
       }else {
         console.log(data);
         dispatch(checkNewsSuccess(data.news));
       }
      console.log(data)

      }).fail(function(error){
        console.log(error);

      //  dispatch(fetchNextPostFailed(userid));
    });
      $(".loading").hide();
    }
}
