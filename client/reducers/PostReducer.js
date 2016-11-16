import {Get_All_Posts,
        Post_Added_Success
      } from '../actions/PostActions';

export function updatePostsList(postsListState={},action){
  switch (action.type) {
    case Get_All_Posts:
      return Object.assign({},postsListState,action.data);
      break;
    case Post_Added_Success:
    var postData = Object.assign({},postsListState);
    postData[action.post.id] = action.post;
      return Object.assign({},postsListState,postData);
      break;
    default:
    return postsListState;

  }
}
