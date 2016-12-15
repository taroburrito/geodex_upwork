/*
 * action types
 */
export const Get_All_User_Success = "Get_All_User_Success";
export const Get_All_User_Failed = "Get_All_User_Failed"
export const Fetch_Profile_Success = "Fetch_Profile_Success";
export const Fetch_Profile_Failed = "Fetch_Profile_Failed";


/*
 * action creators
 */
export function getAllUsersSuccess(userList){
  return{type:Get_All_User_Success, userList}
}

export function getAllUsersFailed(error){
  return{type: Get_All_User_Failed, error:error}
}

export function getAllUsers(){

  return(dispatch) => {
    $.ajax({
      type:'GET',
      url:'/api/v1/admin/getAllUsers',
      data:{}
    }).done(function(data){
      if(data.error){
        dispatch(getAllUsersFailed(data.fail));
      }else {
        dispatch(getAllUsersSuccess(data.userList));
      }
    }).error(function(error){
      console.log("Error in get all pages api call");
      dispatch(getAllUsersFailed(error));
    })
  }
}

export function fetchProfileSuccess(userProfile){
  return{type: Fetch_Profile_Success, userProfile}
}

export function fetchProfileFailed(error){
  return{type: Fetch_Profile_Failed, error:error}
}

export function fetchUserProfile(userId){
  return(dispatch) => {
    $.ajax({
      type:'GET',
      url:'/api/v1/admin/fetchProfile/'+userId,

    }).done(function(data){
      console.log(data);
      if(data.error){
        dispatch(fetchProfileFailed(data.error));
      }else {
        dispatch(fetchProfileSuccess(data.userProfile));
      }
    }).error(function(error){
      console.log("Error in get all pages api call");
      dispatch(fetchProfileFailed(error));
    })
  }
}
