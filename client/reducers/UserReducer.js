import {
          Fetch_Freind_List,
          Delete_friend_Success,
          Fetch_Friends_Posts,
          Update_Friend_List,
          Fetch_Dashboard_Data,
          Category_Added_Dashboard_Success,
          Fetch_Freind_Requests,
          Confirm_Friend_Success,
          Delete_Friend_Request_Success,
          Delete_Friend_Request_Failed,
          Update_Dashboard_Friend_List,
          Search_Users_Result_Success,
          Clear_Search_List,
          Add_Category_Dashboard_Failed,
          Set_Message_To_Default,
          Send_Email_From_Dashboard_Success,
          Send_Email_From_Dashboard_Failed,
          Change_Friend_Cat_Success,
          Change_Friend_Cat_Failed,
          Delete_Category_Success,
          Delete_Category_Failed,
          Update_Category_Failed_Dashboard,
          Update_Category_Success_Dashboard
        } from '../actions/UserActions';

        import {Post_Added_Dashboard_Success} from '../actions/PostActions';



export function getAllFriendsList(friendsListState={}, action){
  switch (action.type) {
    case Fetch_Freind_List:
      return Object.assign({}, friendsListState,{
        friendsList:action.friendList,
        categorizedFriendList:action.categorizedFriendList
      });
      break;
      case Update_Friend_List:
        return Object.assign({}, friendsListState,{
          friendsList:action.data,
        });
        break;

        case Change_Friend_Cat_Success:
        var currentData =  Object.assign({}, friendsListState);
        if(currentData.categorizedFriendList){
          console.log("userReducer");
          console.log(action);
          var friendId = action.friendId;
        currentData.categorizedFriendList[friendId] = action.data[friendId];
      }else {
          currentData.categorizedFriendList = action.data;
      }
        return Object.assign({},currentData);
          break;
      case Delete_friend_Success:
        const newState = Object.assign([], friendsListState);
        console.log(newState);
        newState.friendsList.splice(action.id, 1);
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

export function updateDashboardData(dashboardDataState={error:null,success:null},action){
  switch (action.type) {
    case Fetch_Dashboard_Data:
      return Object.assign({},action.data)
      break;

      case Set_Message_To_Default:
      var currentData = Object.assign({}, dashboardDataState);
        return Object.assign({}, currentData,{
          error:null,
          success:null
        });
        break;

      case Post_Added_Dashboard_Success:
      var currentData = Object.assign({}, dashboardDataState);
      currentData.latestPost = action.post;
        return Object.assign({}, currentData,{
          error:null,
        });
      break;

      case Update_Dashboard_Friend_List:
      var currentData = Object.assign({}, dashboardDataState);
      currentData.friends = action.friends;

        return Object.assign({}, dashboardDataState,currentData);
      break;

      case Category_Added_Dashboard_Success:
      var currentData = Object.assign({}, dashboardDataState);
      if(currentData.categories){
        currentData.categories[action.category.id] = action.category;
      }else{
        currentData.categories = {};
        currentData.categories[action.category.id] = action.category;
      }

        return Object.assign({}, currentData,{
          error:null,
          success:action.success
        });
      break;

      case Add_Category_Dashboard_Failed:
      var currentData = Object.assign({}, dashboardDataState);
        return Object.assign({}, currentData,{
          error:action.error,
          success:null
        });
        break;

        case Send_Email_From_Dashboard_Success:
          return Object.assign({}, dashboardDataState,{
            error:null,
            success:action.success
          });
          break;

        case Send_Email_From_Dashboard_Failed:
        return Object.assign({}, dashboardDataState,{
          error:action.error,
          success:null
        });
          break;

      case Delete_Category_Success:
      const newState = Object.assign([], dashboardDataState);
      delete newState.categories[action.id]

      return Object.assign({}, newState,{
        error:null,
        success:'Deleted Successfully'
      });
        break;

      case Delete_Category_Failed:
      return Object.assign({}, dashboardDataState,{
        error:action.error,
        success:null
      });
        break;

    case Update_Category_Success_Dashboard:
      var newState = Object.assign({},dashboardDataState);
      newState.categories[action.id] = action.category;
      return Object.assign({}, newState,{
        error:null,
        success:'update successfull'
      })
      break;

    case Update_Category_Failed_Dashboard:
      return Object.assign({},dashboardDataState,{
        error:action.error,
        success:null,
      })
      break;
    default:
    return dashboardDataState;

  }
}

export function friendRequests(friendRequestsState={}, action){
  switch (action.type) {
    case Fetch_Freind_Requests:
    return Object.assign({},friendRequestsState,action.friendRequests);
      break;

      case Confirm_Friend_Success:
        var prevState = Object.assign({},friendRequestsState);
        delete prevState[action.id];
        return Object.assign({},prevState);
        break;

        case Delete_Friend_Request_Success:
          var prevState = Object.assign({},friendRequestsState);
          delete prevState[action.id];
          return Object.assign({},prevState);
          break;
    default:
    return friendRequestsState;
  }
}

export function searchUsersResult(searchResultState={}, action) {
  switch (action.type) {
    case Search_Users_Result_Success:
      return Object.assign({},action.data);
      break;

      case Clear_Search_List:
        return null;
        break;
    default:
      return searchResultState;
  }
}
