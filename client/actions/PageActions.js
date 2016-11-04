export const Added_New_Page = 'Added_New_Page';
export const Received_All_Universal_Pages = 'Received_All_Universal_Pages';
export const Deleted_Page = 'Deleted_Page';

export const Handle_Success_Message = 'Handle_Success_Message';
export const Hide_Message = 'Hide_Message';
export const Handle_Error_Message = 'Handle_Error_Message';

export const Get_Page_Success = 'Get_Page_Success';
export const Get_Page_Fail = 'Get_Page_Fail';
export const Set_Page_Default = 'Set_Page_Default';
export const Update_Input = 'Update_Input';
export const Updated_Page_Failed = 'Updated_Page_Failed';
export const Updated_Page_Success = 'Updated_Page_Success';







export function addedPage(page){
  return { type: Added_New_Page, page }
}
export function deletedPage(Id){
  return{ type: Deleted_Page, Id}
}

export function handleSuccessMessage(msg){
  return{type: Handle_Success_Message, msg: msg}
}
export function handleErrorMessage(error){
  return{type: Handle_Error_Message, error}
}

export function getPageFail(error){

  return { type: Get_Page_Fail, error}
}

export function getPageSuccess(data){
  return { type: Get_Page_Success, data}
}
export function updateInput(field,val){
  return {type:Update_Input,field:field,value:val}
}

export function setPageDefault(){
  return{ type: Set_Page_Default}
}

export function updatedPageSuccess(data){

  return { type: Updated_Page_Success, data}
}

export function updatedPageFailed(error){
  return { type: Updated_Page_Failed, error}
}
/*
 * action creators
 */
export function receivedAllUniversalPages(pages){

  return { type: Received_All_Universal_Pages, pages }
}
/*     Add Page           */
export function addPage(formData) {
  return (dispatch) => {
    $.ajax({
      type:'POST',
      url:'/api/v1/pages/addPage',
      data:{slug:formData.slug,title:formData.title,meta_tags:formData.meta_tags,meta_description:formData.meta_description,status:formData.status,content:formData.content}
    }).done(function(data){
      if(data.error){
        console.log("Error in creating page");
      }else{
      console.log("Successfully created page");
      dispatch(addedPage(data.page));
      dispatch(handleSuccessMessage("Added Successfully"));
      }

    }).error(function(error){
      console.log("Error in get all pages api call"+JSON.stringify(error));
    })
  }
}

export function deletePage(Id) {
  return (dispatch) => {
    $.ajax({
			type: 'DELETE',
			url: '/api/v1/pages/'+Id,
			data: ''
     })
			.done(function(data) {
				if (data.error){
					console.log("delete error api: ", data);

					} else {
						console.log("Deleted success");
            dispatch(deletedPage(Id));
            dispatch(handleSuccessMessage("Deleted Successfully"));

					}
				})
			.fail(function(a,b,c,d) {
				console.log("actual failure: ", a, b, c, d)
			});
  }
}

export function getAllPages(){

  return(dispatch) => {
    $.ajax({
      type:'GET',
      url:'/api/v1/pages',
      data:{}
    }).done(function(data){
      console.log(data);
    }).error(function(error){
      console.log("Error in get all pages api call");
    })
  }
}

export function updatePage(pageId,formData){
  return(dispatch) => {
    $.ajax({
      type:'Post',
      url:'/api/v1/pages/editPage/'+pageId,
      dataType:'JSON',
      data:formData,
    }).done(function(data){

      if(data.error){
    dispatch(updatedPageFailed(data.error));
      }else{

        dispatch(updatedPageSuccess(data.page));
          dispatch(handleSuccessMessage("Updated Successfully"));

      }
    }).error(function(error){

      dispatch(updatedPageFailed(error));
    })
  }
}

export function getPageById(Id){

  return(dispatch) => {
    dispatch(setPageDefault());
    $.ajax({
      type:'GET',
      url:'/api/v1/pages/' + Id,
    }).done(function(data){
      if(data.error){

        dispatch(getPageFail(data.error));
      }else{
        //console.log(data);
        dispatch(getPageSuccess(data.pages));
      }

    }).error(function(error){

      dispatch(getPageFail(error));
    })
  }
}
