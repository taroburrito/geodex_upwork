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

	/*
     * other constants
     */

/*
 * action creators
 */

export function startFetchingUserProfile() {
  return { type: Start_Fetching_User_Profile };
}




export function fetchUserProfile(userId) {

  return (dispatch) => {
    dispatch(startFetchingUserProfile());

    $.ajax({
			type: 'GET',
			url: ('/api/v1/users/' + userId) })
			.done(function(data) {
				if (data.error){
					dispatch(fetchUserProfileFail(data.error));
				} else {
					dispatch(fetchUserProfileSuccess(data.userData));
				}
			})
			.fail(function(a,b,c,d) {
				console.log("GET '/api/v1/users/' has actual failure: ", a, b, c, d)
			  dispatch(fetchUserProfileFail()); //TODO figure out what to pass
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

export function updateProfileSuccess(userdetail){
	return { type: Update_Profile_Success, data:userdetail};
}

export function handleSuccessMessage(msg){

}

export function updateUserProfileData(userData){
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/user/update/'+userData.id,
      dataType:'JSON',
      data:userData,
    }).done(function(data){

      if(data.error){
        console.log("error:"+JSON.stringify(data.error));
      }else{
        dispatch(updateProfileSuccess(userData));
      // /  dispatch(handleSuccessMessage("Updated Successfully"));

      }
    }).error(function(error){
    console.log("Error in update profile api"+ error);
    })
  }
}

export function updateUserData(userData){
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/user/updateData/',
      dataType:'JSON',
      data:userData,
    }).done(function(data){

      if(data.error){
        console.log("error:"+data.error);
      }else{
        console.log(data);
        //dispatch(updateProfileSuccess(userData));
      // /  dispatch(handleSuccessMessage("Updated Successfully"));

      }
    }).error(function(error){
    console.log("Error in update user data api"+ JSON.stringify(error));
    })
  }
}
