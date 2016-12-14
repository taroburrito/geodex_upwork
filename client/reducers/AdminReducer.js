import {Get_All_User_Success,
  Get_All_User_Failed
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
