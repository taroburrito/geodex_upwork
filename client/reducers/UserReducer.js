import {
          Fetch_Freind_List,
          Delete_friend_Success
        } from '../actions/UserActions';


export function getAllFriendsList(friendsListState={}, action){
  switch (action.type) {
    case Fetch_Freind_List:
      return Object.assign({}, friendsListState, action.data);
      break;
      case Delete_friend_Success:
        const newState = Object.assign([], friendsListState);
        console.log(newState);
        newState.splice(action.id, 1);
        return Object.assign({}, newState);
        break;
    default:
    return friendsListState;

  }
}
