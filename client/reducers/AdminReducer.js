import {Get_All_User_Success,
  Get_All_User_Failed,
  Fetch_Profile_Success,
  Fetch_Profile_Failed
} from '../actions/AdminActions';

export function updateUserList(userListState ={},action){
  switch (action.type) {
    case Get_All_User_Success:
      return Object.assign({}, userListState, action.userList);
      break;
      default:
    return userListState;

  }
}

export function viewProfile(userProfileState = {}, action){
  switch (action.type) {
    case Fetch_Profile_Success:
      return Object.assign({}, userProfileState, action.userProfile)
      break;
    default:
      return userProfileState;
  }
}
