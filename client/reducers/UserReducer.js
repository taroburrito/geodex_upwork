import {
          Fetch_Freind_List,
          Delete_friend_Success,
          Fetch_Friends_Posts,
          Update_Friend_List
        } from '../actions/UserActions';


export function getAllFriendsList(friendsListState={}, action){
  switch (action.type) {
    case Fetch_Freind_List:
      return Object.assign({}, friendsListState, action.data);
      break;
      case Update_Friend_List:
        return Object.assign({}, action.data);
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

export function getAllFriendsPosts(friendsPostsState={}, action){
  switch (action.type) {
    case Fetch_Friends_Posts:
      return Object.assign({}, friendsPostsState, action.data);
      break;

    default:
    return friendsPostsState;

  }
}
