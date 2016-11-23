import {  Start_Fetching_User_Profile,
          Fetch_User_Profile_Success, Fetch_User_Profile_Fail,
          Reload_Profile_Page,Get_User_Details,Update_Profile_Input,Update_Profile_Success,
          Fetch_Freind_List, Get_Visited_User_Data
        } from '../actions/ProfileActions';

const defaultStartState = { profileLoaded: false, //true even if results failed
                            isFetchingProfile: false,
                            userData: null,
                            error: null
                          }
const defaultuserData = null;

/*export function updateProfileData(userProfileState = defaultStartState , action) {

  switch (action.type){

    case Start_Fetching_User_Profile:
      return Object.assign({}, defaultStartState,{isFetchingProfile: true });

    case Fetch_User_Profile_Success:
      return {
        profileLoaded: true,
        isFetchingProfile: false,
        userData: action.userData,
        error: null
      };


    case Fetch_User_Profile_Fail:
      return {
        profileLoaded: true,
        isFetchingProfile: false,
        userData: null,
        error: action.error
      };

    case Reload_Profile_Page:
      return Object.assign({}, defaultStartState);
    case Get_User_Details:return Object.assign({},action.userdetail);

    default:
      return userProfileState;
  }
}*/
const defaultStates={
  error: null,
  success: null,
}


export function userProfileData(userProfileState = {} , action){
  switch (action.type){

        case Get_User_Details:
             return action.userdetail;

       case Update_Profile_Input:
            var dataObj={};
             dataObj[action.field]=action.value;
             return Object.assign({},userProfileState,dataObj);
      case Update_Profile_Success:
      action.data.success = "updated successfully";
        return Object.assign({}, userProfileState, action.data);
       default:
          return userProfileState;
  }
}

export function visitedUserData(visitedUserState={}, action){
  switch (action.type) {
    case Get_Visited_User_Data:
      return Object.assign({}, visitedUserState, action.data);
      break;
    default:
    return visitedUserState

  }
}
