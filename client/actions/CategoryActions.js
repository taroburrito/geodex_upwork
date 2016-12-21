export const Received_All_Universal_Categories = 'Received_All_Universal_Categories';
export const Added_New_Category = 'Added_New_Category';
export const Deleted_Category = 'Deleted_Category';
export const Handle_Success_Message = 'Handle_Success_Message';
export const Hide_Message = 'Hide_Message';
export const Handle_Error_Message = 'Handle_Error_Message';
export const Update_Category_Failed = 'Update_Category_Failed';
export const Update_Category_Success = 'Update_Category_Success';
export const Fetch_Categories_By_User = 'Fetch_Categories_By_User';



/*
 * action creators
 */
 export function receivedAllUniversalCategories(categories) {
   return { type: Received_All_Universal_Categories, categories };
 }
 export function addedNewCategory(category){
   return { type: Added_New_Category, category };
 }
 export function deletedCategory(Id){
   return { type: Deleted_Category, Id };
 }
 export function handleSuccessMessage(msg){
   return{type: Handle_Success_Message, msg: msg};
 }
 export function handleErrorMessage(error){
   return{type: Handle_Error_Message, error};
 }

 export function hideMessage(){
   return{type: Hide_Message};
 }
 export function updatedCategoryFailed(error){
   return{type: Update_Category_Failed, error}
 }
 export function updatedCategorySuccess(data){
   return{type: Update_Category_Success, data}
 }

 export function fetchcategoriesByUserId(categories){
   return{type: Fetch_Categories_By_User, categories};
 }




/*     Add Category           */
export function addCategory(req) {
  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/categories/addCategory',
      dataType: 'json',
			data: req })
			.done(function(data) {
				if (data.error){
					console.log("add todo worked but error: ", data);
          dispatch(handleErrorMessage(data.error));

					} else {
						console.log("add todo success", data);
            dispatch(addedNewCategory(data.category));
            dispatch(handleSuccessMessage("Added Successfully"));

					}
				})
			.fail(function(error) {
				console.log("Failure");
        dispatch(handleErrorMessage(error));
			});
  }
}

export function deleteCategory(Id) {
  return (dispatch) => {

    $.ajax({
			type: 'DELETE',
			url: '/api/v1/categories/'+Id,
			data: ''
     })
			.done(function(data) {
				if (data.error){
					console.log("add todo worked but error: ", data);
          dispatch(handleErrorMessage(data.error));

					} else {
						console.log("add todo success");
            dispatch(deletedCategory(Id));
            dispatch(handleSuccessMessage("Deleted Successfully"));

					}
				})
			.fail(function(error) {
				dispatch(handleErrorMessage(error));
			});
  }
}

export function updateCategoryById(id, value){
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/categories/editcategory/'+id,
      dataType:'JSON',
      data:{category_name:value,status:1},
    }).done(function(data){

      if(data.error){
    dispatch(updatedCategoryFailed(data.error));
      }else{

          dispatch(updatedCategorySuccess(data.page));
          dispatch(handleSuccessMessage("Updated Successfully"));

      }
    }).error(function(error){

      dispatch(updatedCategoryFailed(error));
    })
  }
}
