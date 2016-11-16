export const Get_All_Posts = 'Get_All_Posts';
export const Post_Added_Success =  'Post_Added_Success';

export function receivedAllposts(posts){
  return{type: Get_All_Posts, data:posts}
}

export function addPostSuccess(post){
  return{type: Post_Added_Success, post};
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
