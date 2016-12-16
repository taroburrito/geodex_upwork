/*
 * action types
 */
export const Get_All_User_Success = "Get_All_User_Success";
export const Get_All_User_Failed = "Get_All_User_Failed"
export const Fetch_Profile_Success = "Fetch_Profile_Success";
export const Fetch_Profile_Failed = "Fetch_Profile_Failed";
export const Delete_User_Success = "Delete_User_Success";
export const Change_User_Status_Success = "Change_User_Status_Success";


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

export  function deleteUserSuccess(userId){
  return{type: Delete_User_Success, userId:userId};
}

export function deleteUser(userId){
  return(dispatch) => {
    $.ajax({
      type:'post',
      url:'/api/v1/admin/delete_user',
      data: {id:userId},
      dataType:'json',
    }).done(function(data){
      console.log(data);
      if(data.error){
      //  dispatch(deleteUserFaile(data.error));
      }else {
        dispatch(deleteUserSuccess(userId));
      }
    }).error(function(error){
      console.log("Error in get all pages api call");
    //  dispatch(fetchProfileFailed(error));
    })
  }
}


export  function changeUserStatusSuccess(userId,status){
  return{type: Change_User_Status_Success, userId:userId,status:status};
}


export function changeUserStatus(userId,status){
  return(dispatch) => {
    $.ajax({
      type:'post',
      url:'/api/v1/admin/change_user_status',
      data:{id:userId,status:status},
      dataType:'JSON',

    }).done(function(data){
      console.log(data);
      if(data.error){
      //  dispatch(deleteUserFaile(data.error));
      }else {
        dispatch(changeUserStatusSuccess(userId,status));
      }
    }).error(function(error){
      console.log("Error in get all pages api call");
    //  dispatch(fetchProfileFailed(error));
    })
  }
}
