import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import VistiProfileWidget from '../../components/front/VistiProfileWidget';
import Home from '../../components/front/Home';
import {getVisitedUserDetail} from '../../utilities/ServerSocket';
import {fetchCommentsByPost,postComment,deletePost} from '../../actions/PostActions';

import { clickAddFriend,fetchUserProfile, reloadingProfilePage,clickAcceptRequest, clickDenyFriendRequest } from '../../actions/ProfileActions';

export default class UserProfilePage extends Component {
  constructor(props, context) {
    super(props);
  }
  componentWillMount() {
    const{dispatch} = this.props;
    console.log(this.props.params.id);
  }

  componentWillUpdate(){

  }


  render() {
    const { dispatch, userAuthSession, visitedUser } = this.props;
    if(userAuthSession.isLoggedIn){
    return (
      <div className="full_width">
      <VistiProfileWidget
        comments={this.props.comments}
        onClickDenyRequest={(id)=>
        dispatch(clickDenyFriendRequest(id))}
        clickAcceptRequest={(reqId)=>
          dispatch(clickAcceptRequest(reqId))}
        onClickAddFriend={(sender,receiver)=>
        dispatch(clickAddFriend(sender,receiver))}
        userAuthSession={this.props.userAuthSession}
        fetchInitialData={(userId,profileId)=>getVisitedUserDetail(userId,profileId)}
        visitedUser={this.props.visitedUser}
         profileId={this.props.params.id}
         fetchComments={(postId)=>
         dispatch(fetchCommentsByPost(postId))}
        postComment = {(req)=>dispatch(postComment(req))}
        deletePost={(postId)=>dispatch(deletePost(postId))}
         />
      </div>
    );
  }else {
    return (
      <div className="full_width">
        <h1> <Home/> </h1>
      </div>
    );
  }
  }
}


function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    visitedUser: state.visitedUser,
    comments:state.postComments,
  };
}

export default connect(select)(UserProfilePage);
