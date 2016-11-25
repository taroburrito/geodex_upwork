import {  Received_All_Universal_Categories,
   Added_New_Category,
    Deleted_Category,
     Handle_Success_Message,
      Hide_Message,
    Handle_Error_Message,
    Update_Category_Success,
    Update_Category_Failed,
    Fetch_Categories_By_User } from '../actions/CategoryActions';
// create function that flips loader for retrieving all todos

export function updateCategoryList(universalCategoriesState = {} , action) {
  switch (action.type){

    case Received_All_Universal_Categories:

      return Object.assign({}, action.categories);

      case Fetch_Categories_By_User:
          return Object.assign({}, action.categories);
        break;

      case Update_Category_Success:

        return Object.assign({}, universalCategoriesState,action.category);

        case Update_Category_Failed:
          return Object.assign({}, universalCategoriesState,{
            error: action.error
          });

      case Added_New_Category:
      var setToAdd = {};
      setToAdd[action.category.id] = action.category;
      return Object.assign({}, universalCategoriesState, setToAdd);

      case Deleted_Category:
      const newState = Object.assign([], universalCategoriesState);
      newState.splice(action.Id, 1);
      return Object.assign({}, newState, action.categories);

      default:
      return universalCategoriesState;
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
