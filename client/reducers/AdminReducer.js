import {Get_All_User_Success,
  Get_All_User_Failed,
  Fetch_Profile_Success,
  Fetch_Profile_Failed,
  Delete_User_Success,
  Change_User_Status_Success
} from '../actions/AdminActions';

export function updateUserList(userListState ={},action){
  switch (action.type) {
    case Get_All_User_Success:
      return Object.assign({}, userListState, action.userList);
      break;

      case Delete_User_Success:
        var prevState =  Object.assign({}, userListState);
        delete prevState[action.userId];
        return Object.assign({},prevState);
        break;

        case Change_User_Status_Success:
        var prevState =  Object.assign({}, userListState);
        prevState[action.userId].status = action.status;
        return Object.assign({},prevState);
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
