export const Get_All_Posts = 'Get_All_Posts';
export const Post_Added_Success =  'Post_Added_Success';
export const Post_Added_Dashboard_Success = 'Post_Added_Dashboard_Success';
export const Set_Comments_Null = 'Set_Comments_Null';
export const Fetch_Comment_Success = 'Fetch_Comment_Success';
export const Fetch_Universal_Posts_Success = 'Fetch_Universal_Posts_Success';
export const Fetch_Universal_Posts_Failed = 'Fetch_Universal_Posts_Failed';
export const Post_Comment_Success = 'Post_Comment_Success';
export const Delete_Post_Success = 'Delete_Post_Success';
export const Fetch_News_Posts_Success = 'Fetch_News_Posts_Success';
export const Fetch_News_Posts_Failed = 'Fetch_News_Posts_Failed';
export const Initialize_Posts = 'Initialize_Posts';
export const Fetch_More_Posts_Success = 'Fetch_More_Posts_Success';

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

export function postCommentSucess(comment){
  return{type: Post_Comment_Success, comment:comment}
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
      console.log(data);
      console.log("**8")
      if(data.error){

      }else{
        dispatch(postCommentSucess(data.comment));
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

export function fetchUniversalPostsFailed(error){
  return{type:Fetch_Universal_Posts_Failed,error}
}

export function initializePosts(){
  return{type:Initialize_Posts}
}

export function fetchUniversalPosts(userId,limitFrom,limitTo){
  return(dispatch) =>{
    dispatch(initializePosts());
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/getUniversalPosts',
      data:{userId:userId,limitFrom:limitFrom,limitTo:limitTo},
      dataType:'JSON',
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

export function fetchMorePostsSuccess(posts) {
  return{type: Fetch_More_Posts_Success, posts}
}

export function fetchMorePosts(userId,limitFrom,limitTo){
  return(dispatch) =>{
    //dispatch(initializePosts());
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/getUniversalPosts',
      data:{userId:userId,limitFrom:limitFrom,limitTo:limitTo},
      dataType:'JSON',
    }).done(function(result){
      if(result.error){

      }else {
        dispatch(fetchMorePostsSuccess(result.posts));
      }
    }).fail(function(error){

      $(".loading").hide();
    });
  }
}

export function fetchLimitedUniversalPosts(userId,limitFrom,limitTo){
  return(dispatch) =>{
  //  dispatch(initializeComments());
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/getLimitedUniversalPosts',
      data:{userId:userId,limitFrom:limitFrom,limitTo:limitTo},
      dataType:'JSON'

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


export function fetchNewsPostsSuccess(posts){
    return{type:Fetch_News_Posts_Success,posts}
}

export function fetchNewsPostsFailed(error){
  return{type: Fetch_News_Posts_Failed,error}
}

export function fetchNewsPosts(userId,limitFrom,limitTo){
  //console.log(userId,limitFrom,limitTo);
  return(dispatch) =>{
    dispatch(initializePosts());
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/getNewsPosts',
      data:{userId:userId,limitFrom:limitFrom,limitTo:limitTo},
      dataType:'JSON',
    }).done(function(result){
      if(result.error){

      }else {
        console.log(result);
        dispatch(fetchUniversalPostsSuccess(result.posts));
      }
    }).fail(function(error){
      console.log("Fail posts");
      console.log(error);
      $(".loading").hide();
    });
  }
}


export function fetchPostByFriendsCategory(userId,catId){
  return(dispatch) =>{
  //  dispatch(initializeComments());
    $.ajax({
      type:'GET',
      url:'/api/v1/posts/getPostByFriendsCategory/'+userId+"/"+catId,

    }).done(function(result){
      if(result.error){
          dispatch(fetchUniversalPostsFailed(result.message));
      }else {
        dispatch(fetchUniversalPostsSuccess(result.posts));
      }
    }).fail(function(error){
    dispatch(fetchUniversalPostsFailed(result.error));
    });
  }
}

export function deletePostSuccess(id){
  return{type:'Delete_Post_Success',id}
}


export function deletePost(Id) {
  return (dispatch) => {

    $.ajax({
			type: 'DELETE',
			url: '/api/v1/posts/'+Id,
      beforeSend: function() {
          $(".loading").show();
      },
     })
			.done(function(data) {
				if (data.error){
					console.log("error in delete post ", data);
          //dispatch(handleErrorMessage(data.error));


					} else {
						console.log("deleted post successfull");
             dispatch(deletePostSuccess(Id));
            // dispatch(handleSuccessMessage("Deleted Successfully"));

					}
            $(".loading").hide();
				})
			.fail(function(error) {
        console.log("erro in delete post query")
			//	dispatch(handleErrorMessage(error));
			});

  }
}



export function fetchPhotos(userId,limitFrom,limitTo){
  return(dispatch) =>{
    dispatch(initializePosts());
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/getPhotosPost',
      data:{userId:userId,limitFrom:limitFrom,limitTo:limitTo},
      dataType:'JSON',
    }).done(function(result){
      if(result.error){

      }else {
        console.log(result);
        dispatch(fetchUniversalPostsSuccess(result.posts));
      }
    }).fail(function(error){
      console.log("Fail posts");
      console.log(error);
      $(".loading").hide();
    });
  }
}
