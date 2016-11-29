export const Get_All_Posts = 'Get_All_Posts';
export const Post_Added_Success =  'Post_Added_Success';
export const Post_Added_Dashboard_Success = 'Post_Added_Dashboard_Success';
export const Set_Comments_Null = 'Set_Comments_Null';
export const Fetch_Comment_Success = 'Fetch_Comment_Success';

export function receivedAllposts(posts){
  return{type: Get_All_Posts, data:posts}
}

export function addPostSuccess(post){
  return{type: Post_Added_Dashboard_Success, post};
}

export function addPost(formData){
  return (dispatch) => {
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/addPost',
      dataType:'JSON',
      data:formData
    }).done(function(data){
      if(data.error){
        console.log(data.error);
      }else{
      console.log(data);
      dispatch(addPostSuccess(data.post));

      }

    }).error(function(error){
      console.log("Error in posts api call"+JSON.stringify(error));
    })
  }
}

export function initializeComments(){
  return{type: Set_Comments_Null}
}

export function fetchCommentSuccess(comments){
  return{type: Fetch_Comment_Success, data:comments};
}

export function fetchCommentsByPost(postId){
  return(dispatch) =>{
    dispatch(initializeComments());
    $.ajax({
      type:'GET',
      url:'/api/v1/posts/getComments/'+postId,

    }).done(function(result){

      if(result.error){
        console.log("error:"+JSON.stringify(result.error));
      }else {
        console.log("Success comments");
        dispatch(fetchCommentSuccess(result.comments));
      }
    }).fail(function(error){
      console.log("Fail comments");
      console.log(error);
    });
  }
}
