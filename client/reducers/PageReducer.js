import {  Received_All_Universal_Pages,
          Added_New_Page,
          Deleted_Page,
          Handle_Success_Message,
          Handle_Error_Message,
          Hide_Message,
          Get_Page_Fail,
          Get_Page_Success,
          Set_Page_Default,Update_Input,
        Updated_Page_Success,Updated_Page_Failed} from '../actions/PageActions';
// create function that flips loader for retrieving all todos

export function updatePagesList(universalPagesState = {} , action) {
  switch (action.type){

    case Received_All_Universal_Pages:

      return Object.assign({}, action.pages);

      case Deleted_Page:
      const newState = Object.assign([], universalPagesState);
      newState.splice(action.Id, 1);
      return Object.assign({}, newState, action.pages);

      default:
      return universalPagesState;
  }
}

export function getPageData(getPageDataState= {}, action){

  switch (action.type) {
    case Get_Page_Success:
    return Object.assign({}, getPageDataState, action.data);

    case Updated_Page_Success:

    return Object.assign({}, getPageDataState, action.data);

    case Updated_Page_Failed:
    return Object.assign({}, getPageDataState, {
    error: action.error
    });

    case Get_Page_Fail:
    return Object.assign({}, getPageDataState,{
      error: action.error
    });
    case Update_Input:
    var dataObj={};
    dataObj[action.field]=action.value;
    return Object.assign({},getPageDataState,dataObj);

    case Set_Page_Default:
    return Object.assign({}, getPageDataState);
    default:
    return getPageDataState;
  }

}
export function handleMessage(handleMessageState={}, action){

  switch (action.type) {
    case Handle_Success_Message:

    return Object.assign({}, handleMessageState,{
      success: action.msg
    });
      break;

      case Hide_Message:
      return Object.assign({}, handleMessageState,{
        success: null,
        error: null
      });
        break;

        case Handle_Error_Message:
        return Object.assign({}, handleMessageState,{
          success: null,
          error: action.error
        });
        break;

    default:
    return handleMessageState;

  }

}
