import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import Home from '../../components/front/Home';
import {fetchLimitedUniversalPosts,
        fetchUniversalPosts,
        fetchPostByFriendsCategory,
        fetchCommentsByPost,
        postComment,
        fetchNewsPosts,
        fetchPhotos,
        fetchMorePosts,
        fetchNoNewsPosts,
      } from '../../actions/PostActions';
import {fetchCategoriesByUser} from '../../actions/CategoryActions';
import FeedsWidget from '../../components/front/feeds/FeedsWidget';



export default class Feeds extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, userAuthSession } = this.props;
    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
            <FeedsWidget
              fetchNoNewsPosts={(userId,limitFrom,limitTo)=>dispatch(fetchNoNewsPosts(userId,limitFrom,limitTo))}
              fetchMorePosts ={(userId,limitFrom,limitTo)=>dispatch(fetchMorePosts(userId,limitFrom,limitTo))}
              fetchNewsPosts={(userId,limitFrom,limitTo)=>dispatch(fetchNewsPosts(userId,limitFrom,limitTo))}
              fetchAllPosts={(userId,limitFrom,limitTo)=>dispatch(fetchUniversalPosts(userId,limitFrom,limitTo))}
              fetchPhotos={(userId,limitFrom,limitTo)=>dispatch(fetchPhotos(userId,limitFrom,limitTo))}
              fetchCategories={(userId)=>dispatch(fetchCategoriesByUser(userId))}
              fetchPostByFriendsCategory = {(userId,catId)=>dispatch(fetchPostByFriendsCategory(userId,catId))}
              posts={this.props.universalPosts}
              userAuthSession={this.props.userAuthSession}
              categories={this.props.categories}
              fetchComments={(postId)=>
              dispatch(fetchCommentsByPost(postId))}
              comments={this.props.comments}
              postComment = {(req)=>dispatch(postComment(req))}
              loadMorePosts={(userId,limitFrom,limitTo)=>dispatch(fetchLimitedUniversalPosts((userId,limitFrom,limitTo)))}
            />
        </div>
      );
    }else{
    return(
      <div className="full_width">
        <Home/>
      </div>
    );
  }
  }
}


function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    universalPosts:state.universalPosts,
    categories:state.universalCategories,
    comments:state.postComments,

  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Feeds);
