/*
 * action types
 */
export const Start_Fetching_User_Profile = 'Start_Fetching_User_Profile';
export const Fetch_User_Profile_Success = 'Fetch_User_Profile_Success';
export const Fetch_User_Profile_Fail = 'Fetch_User_Profile_Fail';
export const Reload_Profile_Page = 'Reload_Profile_Page';
export const Get_User_Details='Get_User_Deails';
export const Update_Profile_Input='Update_Profile_Input';
export const Update_Profile_Success='Update_Profile_Success';
import {Handle_Success_Message} from './PageActions';
export const Fetch_Freind_List = 'Fetch_Freind_List';
export const Get_Visited_User_Data = 'Get_Visited_User_Data';
export const Update_Profile_Input_Success = 'Update_Profile_Input_Success';
export const Update_Profile_Input_Failed = 'Update_Profile_Input_Failed';
export const Add_Friend_Request_Success = 'Add_Friend_Request_Success';
export const Add_Friend_Request_Failed = 'Add_Friend_Request_Failed';
export const Accept_Request_Success = 'Accept_Request_Success';
export const Accept_Request_Failed = 'Accept_Request_Failed';
export const Delete_Friend_Request_Success = 'Delete_Friend_Request_Success';
export const Delete_Friend_Request_Failed = 'Delete_Friend_Request_Failed';
export const Set_Visited_User_Null = 'Set_Visited_User_Null';
export const Update_Profile_Data_Success = 'Update_Profile_Data_Success';

	/*
     * other constants
     */

/*
 * action creators
 */

export function startFetchingUserProfile() {
  return { type: Start_Fetching_User_Profile };
}

export function setVisitedUserNull() {
  return { type: Set_Visited_User_Null };
}




export function fetchUserProfile(userId) {

  return (dispatch) => {
    dispatch(startFetchingUserProfile());

    $.ajax({
			type: 'GET',
			url: ('/api/v1/users/' + userId),
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data) {
				if (data.error){
					dispatch(fetchUserProfileFail(data.error));
				} else {
					dispatch(fetchUserProfileSuccess(data.userData));
				}
        $(".loading").hide();
			})
			.fail(function(a,b,c,d) {
				console.log("GET '/api/v1/users/' has actual failure: ", a, b, c, d)
			  dispatch(fetchUserProfileFail()); //TODO figure out what to pass
        $(".loading").hide();
			});
  }
}

export function fetchUserProfileSuccess(userData) {
	return { type: Fetch_User_Profile_Success, userData };
}

export function fetchUserProfileFail(error) {
	return { type: Fetch_User_Profile_Fail, error };
}
/*export function handleSuccessMessage(msg){
	return{type: Handle_Success_Message, msg: msg}
}*/

export function reloadingProfilePage() {
	return { type: Reload_Profile_Page };
}

export function getUserDetails(userdetail){
	return { type: Get_User_Details, userdetail};
}
export function getVisitedUserData(data){
  return{ type: Get_Visited_User_Data, data: data}
}

export function updateProfileInput(field,val){
  return {type:Update_Profile_Input,field:field,value:val}
}
export function updatedProfileData(data){
	return {type:Update_Profile_Success,data}
}

export function updateProfileDataSuccess(userdetail){
	return { type: Update_Profile_Data_Success, data:userdetail};
}

export function handleSuccessMessage(msg){

}

export function updateUserProfileData(userData){
  console.log(userData);
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/users/update/',
      dataType:'JSON',
      data:userData,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      $(".loading").hide();
      if(data.error){
        console.log("error in update userProfile:"+JSON.stringify(data.error));
      }else{

        var prevData = JSON.parse(localStorage.getItem("userData"));
        //prevData.userObject.first_name = userData
        var prevUserObject = prevData.userObject;

        //console.log(userData);
      Object.keys(userData).forEach((key)=> {
        prevUserObject[key] = userData[key];
      });
      prevData.userObject = prevUserObject;
        // prevUserObject['isLoggedIn']=true;
        // console.log(prevUserObject);

         localStorage.setItem("userData",JSON.stringify(prevData));
        //console.log("Success update user Profile");
        dispatch(updateProfileDataSuccess(prevData));
        //console.log(localStorage.getItem("userData"))
      // /  dispatch(handleSuccessMessage("Updated Successfully"));

      }
    }).error(function(error){
      $(".loading").hide();
    console.log("Error in update profile api"+ error);
    })
  }
}

export function updateProfileInputSuccess(userData){
  return{type: Update_Profile_Input_Success, data:userData}
}

export function updateProfileInputFailed(error){
  return{type: Update_Profile_Input_Failed, error}
}

export function updateUserData(userData){
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/user/updateData/',
      dataType:'JSON',
      data:userData,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      $(".loading").hide();
      if(data.error){
        console.log("error update user data api");
        console.log("error:"+data.error);
          dispatch(updateProfileInputFailed(data.error));
      }else{
        console.log("success update user data api");

        console.log(data);
        var newResult = {};
        newResult.userObject = data.userData;
        var storageData=newResult;

         storageData['isLoggedIn']=true;
        // console.log(storageData);
         //console.log(localStorage.getItem("userData"))
       localStorage.setItem("userData",JSON.stringify(storageData));

        dispatch(updateProfileInputSuccess(data.userData));
      // /  dispatch(handleSuccessMessage("Updated Successfully"));
       console.log(localStorage.getItem("userData"))

      }
    }).error(function(error){
      $(".loading").hide();
    console.log("Error update user data api call"+ JSON.stringify(error));
    dispatch(updateProfileInputFailed("Error in update profiel"));
    })
  }
}

export function addFriendRequestSuccess(success,friendStatus){
    return{type:Add_Friend_Request_Success, msg:success,friendStatus:friendStatus}
}

export function addFriendRequestFailed(error){
  return{type:Add_Friend_Request_Failed, msg:error}
}

export function clickAddFriend(sender,receiver){

  return(dispatch) => {

    $.ajax({
      type:'POST',
      url:'/api/v1/user/addFriendRequest',
      dataType:'json',
      data:{sender:sender,receiver:receiver},
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      $(".loading").hide();
      console.log("Success add friend request :"+ JSON.stringify(data));
      if(data.error){
        dispatch(addFriendRequestFailed(data.error));
      }else{
        dispatch(addFriendRequestSuccess(data.success,data.friendStatus));
      }
    }).fail(function(error){
      $(".loading").hide();
      console.log("Error in add friend request:"+JSON.stringify(error));
        dispatch(addFriendRequestFailed(error));
    });
  }
}

export function acceptRequestSuccess(msg){
  return{type: Accept_Request_Success, success:msg}
}

export function acceptRequestFailed(msg){
  return{type: Accept_Request_Failed, error:msg}
}

export function clickAcceptRequest(reqId){

  return(dispatch) => {

    $.ajax({
      type:'POST',
      url:'/api/v1/users/acceptFriendRequest/'+reqId,
       beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      console.log("Success accept request :"+ JSON.stringify(data));
      $(".loading").hide();
      if(data.error){
        dispatch(acceptRequestFailed(data.error));
      }else{
        dispatch(acceptRequestSuccess(data.success));
      }
    }).fail(function(error){
      $(".loading").hide();
      console.log("Error in accept request:"+JSON.stringify(error));
      dispatch(acceptRequestFailed(error));
    });

  }
}

export function deleteFriendRequestSuccess(success){
  return{type:Delete_Friend_Request_Success,success:success}
}

export function deleteFriendRequestFailed(error){
  return{type:Delete_Friend_Request_Failed,error:error}
}

export function clickDenyFriendRequest(reqId) {

  return (dispatch) => {

    $.ajax({
			type: 'DELETE',
			url: '/api/v1/users/deleteFriendRequest/'+reqId,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data) {
				if (data.error){
					console.log("delete friend works but error: ", data);
						dispatch(deleteFriendRequestFailed(data.error));
					} else {
						console.log("delete friend success", data);
						dispatch(deleteFriendRequestSuccess(data.success));
					}
          $(".loading").hide();
				})
			.fail(function(error) {
				console.log("delete failure: ");
        $(".loading").hide();
			  dispatch(deleteFriendRequestFailed(error));
			});
    }
}
