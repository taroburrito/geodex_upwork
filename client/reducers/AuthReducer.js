import {  Clicked_SignUp, SignUp_Success, SignUp_Fail,
          Clicked_Login, Login_Success, Login_Fail,
          Started_Session_Check, Checked_Session_Status,
          Clicked_Logout, Logout_Success,
          Navigate_Away_From_Auth_Form,
          Clicked_Reset_Password,
          Token_Verified_Success,
          Token_Verified_Failed,
          Forgot_Password_Email_Error,
          Forgot_Password_Email_Success,
          Clicked_Forgot_Password,
        Reset_Password_Success,
        Reset_Password_Failed,
      Change_Password_Failed, Change_Password_Success } from '../actions/AuthActions';

import {Update_Profile_Input_Success, Update_Profile_Success} from '../actions/ProfileActions';

const defaultStartState = { isLoggedIn: false,
                            fetchingAuthUpdate: false,
                            userObject: null,
                            error: null,
                            success: null,


                          };

const defaultResetState = {
  token:null,
  successMessage:null,
  error:null

}
const defaultMessageState = {

  successMessage:null,
  error:null

}

export function updateError(actionMessage = defaultMessageState,action){
  switch (action.type) {
    case Change_Password_Success:
    return Object.assign({}, actionMessage, {
      successMessage: "You have successfully changed your password",
      error:null
    });
      break;
    case Change_Password_Failed:
    return Object.assign({}, actionMessage, {
      error: action.error,
      successMessage:null
    });
        break;

    default:
    return actionMessage;

  }
}

export function updateUserInfo(userAuthState = defaultStartState , action) {
  switch (action.type){

    case Started_Session_Check:
    return Object.assign({}, userAuthState);
    case Clicked_Login:
    case Clicked_SignUp:
    case Clicked_Logout:
      return Object.assign({}, userAuthState, {
        fetchingAuthUpdate: true
      });

    case Update_Profile_Success:
    var prevState = Object.assign({}, userAuthState);
    prevState.userObject = action.data;
    return Object.assign({}, userAuthState, prevState.userObject,{
      isLoggedIn: true,
      fetchingAuthUpdate: false,
        error: null
    });
    case Update_Profile_Input_Success:
    var prevState = Object.assign({}, userAuthState);
    prevState.userObject = action.data;
    console.log(prevState.userObject);
    return Object.assign({}, prevState,{
      isLoggedIn: true,
      fetchingAuthUpdate: false,
        error: null
    });
      break;

    case Login_Success:return Object.assign({}, userAuthState, action.userObject,{
        isLoggedIn: true,
        fetchingAuthUpdate: false,
        error: null
      });
    case SignUp_Success:
      return Object.assign({}, userAuthState, action.userObject,{
        isLoggedIn: true,
        fetchingAuthUpdate: false,

        error: null
      });

    case Login_Fail:
    case SignUp_Fail:
      return Object.assign({}, userAuthState, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        error: action.error
      });

    case Checked_Session_Status:
    console.log(action);
    console.log("***");
      if (action.result.isLoggedIn){
        return Object.assign({}, userAuthState, {
          isLoggedIn: true,
          fetchingAuthUpdate: false,
          userObject: action.result.userObject,
          error: null
        });
      }
      // set to default conditions
      // (ignore errors and let login/signup handle server errors)
      return  Object.assign({}, defaultStartState);

    case Logout_Success:
      return Object.assign({}, defaultStartState);

    case Navigate_Away_From_Auth_Form:
      return Object.assign({}, userAuthState, {
        error: null
      });

    default:
      return userAuthState;
  }
}

export function forgotPasswordResult(forgotPasswordResultState ={}, action){

  switch (action.type) {


      case Clicked_Forgot_Password:
      return Object.assign({}, forgotPasswordResultState, {
        error: null,
        success: null
      });
      case Forgot_Password_Email_Error:
      return Object.assign({}, forgotPasswordResultState, {
        error: action.error,
        success: null
      });

      case Forgot_Password_Email_Success:
      return Object.assign({}, forgotPasswordResultState, {
        error: null,
        success: "An email is send to your email id click reset password link to reset your password"
      });

    default:
    return forgotPasswordResultState;

  }
}

export function verifyToken(verifyTokenState =defaultResetState, action){
  switch (action.type) {
    case Token_Verified_Success:
      return Object.assign({},verifyTokenState,{
        token:action.token,
        successMessage:null,
        error: null
      });
      break;
      case Token_Verified_Failed:
        return Object.assign({},verifyTokenState,{
          token:null,
          successMessage:null,
          error: null
        });
        break;
        case Reset_Password_Success:
        return Object.assign({},verifyTokenState,{
          successMessage:"Congratulation you have successfully reset your password",
          error: null,

        });
          break;
          case Reset_Password_Failed:
          return Object.assign({},verifyTokenState,{
            successMessage:null,
            error: action.error,

          });
            break;
    default:
    return verifyTokenState;

  }
}

export function resetPasswordStatus(resetPasswordStatusState = {}, action){
  switch (action.type) {

    default:
      return resetPasswordStatusState;
  }
}
