import {Get_All_Posts,
        Post_Added_Success,
        Set_Comments_Null,
        Fetch_Comment_Success,
        Fetch_Universal_Posts_Success,
        Fetch_Universal_Posts_Failed,
        Post_Comment_Success,
        Fetch_News_Posts_Success,
        Fetch_News_Posts_Failed
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

export function updateComments(postCommentsState={}, action){
  switch (action.type) {
    case Set_Comments_Null:
    return null;
      break;

      case Fetch_Comment_Success:

        return Object.assign({}, action.comments);
        break;

        case Post_Comment_Success:
          var prevState = Object.assign({}, postCommentsState);
          var len =Object.keys(prevState).length;
          prevState[len] = action.comment;
        //  prevState.push(action.comment);
          return Object.assign({}, prevState);
          break;
    default:
      return postCommentsState;
  }
}

export function updateFeeds(universalPosts={},action){
  switch (action.type) {
    case Fetch_Universal_Posts_Success:
    console.log(action.posts);
    return Object.assign({}, action.posts);
      break;

    case Fetch_News_Posts_Success:
    return Object.assign({}, action.posts);
      break;

      case Fetch_News_Posts_Failed:
          return Object.assign({},null);
        break;
      case Fetch_Universal_Posts_Failed:
      return Object.assign({}, null);
        break;
        break;
    default:
    return universalPosts;
  }
}
