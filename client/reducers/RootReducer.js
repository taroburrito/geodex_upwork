import { combineReducers } from 'redux';
import { updateUserInfo, verifyToken, forgotPasswordResult, updateError} from './AuthReducer';
import { updateUniversalTodoList, updateUniversalUnsavedTodoList } from './TodoReducer';
import { updateProfileData,userProfileData } from './ProfileReducer';
import { updateCategoryList, handleMessage} from './CategoryReducer';
import { updatePagesList, getPageData } from './PageReducer';
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

  //For viewing profiles.
  userProfileData:userProfileData,
  updateProfileData: updateProfileData

});

export default RootReducer;
