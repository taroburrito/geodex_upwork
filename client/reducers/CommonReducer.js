import {Handle_Message,Handle_Success_Message,Handle_Error_Message} from '../actions/CommonActions';
import {Handle_Error_Signup} from '../actions/AuthActions';


const defaultStates={
  error:null,
  success:null
}

export function handleFrontMessage(updateMessageState = defaultStates, action){
  switch (action.type) {
    case Handle_Message:
    return Object.assign({},updateMessageState);
      break;

      case Handle_Success_Message:
      return Object.assign({
        error:null,
        success:action.success
      });
        break;

        case Handle_Error_Signup:

        return Object.assign({},updateMessageState,{
          error:action.error,
          success:null
        });
          break;
    default:
    return updateMessageState;
  }
}
