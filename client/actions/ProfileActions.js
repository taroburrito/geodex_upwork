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
export function updateProfileInput(field,val){
  return {type:Update_Profile_Input,field:field,value:val}
}
export function updatedProfileData(data){
	return {type:Update_Profile_Success,data}
}
export function updateUserProfileData(userData){
	return (dispatch) => {
		$.ajax({
			type:'POST',
			url:'/api/v1/user/update/'+userData.id,
			data:userData,
			processData: false,
    		contentType: false
		}).done(function(data){
			if(data.error){
				console.log("Error in Updating data");
			}else{
				console.log("Successfully Updated");
				dispatch(updatedProfileData(data));
				//dispatch(handleSuccessMessage("Added Successfully"));
			}

		}).error(function(error){
			console.log("Error in get all pages api call"+JSON.stringify(error));
		})
	}
}


