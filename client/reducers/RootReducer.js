import { combineReducers } from 'redux';
import { updateUserInfo, verifyToken, forgotPasswordResult, updateError} from './AuthReducer';
import { updateUniversalTodoList, updateUniversalUnsavedTodoList } from './TodoReducer';
import { updateProfileData,userProfileData, visitedUserData } from './ProfileReducer';
import {getAllFriendsList, getUserData, getAllFriendsPosts, updateDashboardData, friendRequests, searchUsersResult} from './UserReducer';
import { updateCategoryList, handleMessage} from './CategoryReducer';
import { updatePagesList, getPageData } from './PageReducer';
import { updatePostsList} from './PostReducer';
import { handleFrontMessage} from './CommonReducer';
// import { Add_Todo, Complete_Todo, Set_Visibility_Filter, VisibilityFilters  } from '../actions/TodoActions';
// const { Show_All } = VisibilityFilters;


// function updateVisibilityFilter(visibilityFilterState = Show_All, action){
//   switch (action.type){

//     case Set_Visibility_Filter:
//       return action.filter;

//     default:
//       return visibilityFilterState;
//   }
// }

const RootReducer = combineReducers({
  // visibilityFilter: updateVisibilityFilter, //TODO implement or remove...
  universalTodos: updateUniversalTodoList,
  universalCategories: updateCategoryList,
  unsavedUniversalTodos: updateUniversalUnsavedTodoList,
  userAuthSession: updateUserInfo,
  universalPages: updatePagesList,
  verifyToken: verifyToken,
  forgotPasswordResult: forgotPasswordResult,
  handleMessage: handleMessage,
  getPageData:getPageData,
  actionMessage: updateError,
  friendsListState: getAllFriendsList,
  postsList: updatePostsList,
  friendsPosts:getAllFriendsPosts,
  dashboardData:updateDashboardData,
  updateMessage:handleFrontMessage,
  friendRequests:friendRequests,
  searchResult: searchUsersResult,

  //For viewing profiles.
  userProfileData:userProfileData,
  visitedUser: visitedUserData,
  userData:getUserData,
  updateProfileData: updateProfileData

});

export default RootReducer;
