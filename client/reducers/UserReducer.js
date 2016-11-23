import {
          Fetch_Freind_List,
          Delete_friend_Success,
          Fetch_Friends_Posts,
          Update_Friend_List,
          Fetch_Dashboard_Data,
          Post_Added_Dashboard_Success,
          Category_Added_Dashboard_Success
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

export function updateDashboardData(dashboardDataState={},action){
  switch (action.type) {
    case Fetch_Dashboard_Data:
      return Object.assign({},action.data)
      break;

      case Post_Added_Dashboard_Success:
      var currentData = Object.assign({}, dashboardDataState);
      currentData.latestPost = action.post;
        return Object.assign({}, currentData);
      break;

      case Category_Added_Dashboard_Success:
      var currentData = Object.assign({}, dashboardDataState);
      currentData.categories[action.category.id] = action.category;
        return Object.assign({}, currentData);
      break;
    default:
    return dashboardDataState;

  }
}
