/*
 * action types
 */
export const Get_All_User_Success = "Get_All_User_Success";
export const Get_All_User_Failed = "Get_All_User_Failed"


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
