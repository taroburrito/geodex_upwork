export const Get_All_Posts = 'Get_All_Posts';
export const Post_Added_Success =  'Post_Added_Success';
export const Post_Added_Dashboard_Success = 'Post_Added_Dashboard_Success';
export const Set_Comments_Null = 'Set_Comments_Null';
export const Fetch_Comment_Success = 'Fetch_Comment_Success';
export const Fetch_Universal_Posts_Success = 'Fetch_Universal_Posts_Success';

export function receivedAllposts(posts){
  return{type: Get_All_Posts, data:posts}
}

export function addPostSuccess(post){
  return{type: Post_Added_Dashboard_Success, post};
}

/* addPost
  params: user_id,content,image
  return: post
*/
export function addPost(formData){

  return (dispatch) => {
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/addPost',
      dataType:'JSON',
      data:formData,
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      if(data.error){
        console.log(data.error);
      }else{
      console.log(data);
      dispatch(addPostSuccess(data.post));

      }$(".loading").hide();

    }).error(function(error){$(".loading").hide();
      console.log("Error in posts api call"+JSON.stringify(error));
    })
  }
}

export function postComment(formData){
  return(dispatch)=>{
    $.ajax({
      type:'POST',
      url: '/api/v1/posts/postComment',
      data: formData,
      dataType: 'JSON',
      beforeSend: function() {
          $(".loading").show();
      }
    }).done(function(data){
      if(data.error){

      }else{
        dispatch(fetchCommentsByPost(formData.post_id));
      }
      console.log(data);
       $(".loading").hide();
    }).fail(function(error){
      console.log(error);
      $(".loading").hide();
    })
  }
}



export function initializeComments(){
  return{type: Set_Comments_Null}
}

export function fetchCommentSuccess(comments){
  return{type: Fetch_Comment_Success, comments};
}

export function fetchCommentsByPost(postId){
  return(dispatch) =>{
    dispatch(initializeComments());
    $.ajax({
      type:'GET',
      url:'/api/v1/posts/getComments/'+postId,
       beforeSend: function() {
          //$(".loading").hide();
      }
    }).done(function(result){

      if(result.error){
        console.log("error:"+JSON.stringify(result.error));
      }else {
        console.log("Success comments");
        dispatch(fetchCommentSuccess(result.comments));
      }
      $(".loading").hide();
    }).fail(function(error){
      console.log("Fail comments");
      console.log(error);
      $(".loading").hide();
    });
  }
}

export function fetchUniversalPostsSuccess(posts){
  return{type:Fetch_Universal_Posts_Success,posts}
}

export function fetchUniversalPosts(){
  return(dispatch) =>{
  //  dispatch(initializeComments());
    $.ajax({
      type:'GET',
      url:'/api/v1/posts/getUniversalPosts/',

    }).done(function(result){
      if(result.error){

      }else {
        dispatch(fetchUniversalPostsSuccess(result.posts));
      }
    }).fail(function(error){
      console.log("Fail posts");
      console.log(error);
      $(".loading").hide();
    });
  }
}
