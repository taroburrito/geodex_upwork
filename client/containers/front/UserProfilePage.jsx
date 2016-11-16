import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/front/Profile';
import Home from '../../components/front/Home';
import {getVisitedUserDetail} from '../../utilities/ServerSocket';

import { fetchUserProfile, reloadingProfilePage } from '../../actions/ProfileActions';
import { clickedAddFriend, respondFriendRequest, clickedDeleteFriend } from '../../actions/UserActions';

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
      <Profile
        onClickDenyRequest={(id)=>
        clickedDeleteFriend(id)}
        onClickRespondFriendRequest={(id)=>
          respondFriendRequest(id)}
        onClickAddFriend={(sender,receiver)=>
        clickedAddFriend(sender,receiver)}
        userAuthSession={this.props.userAuthSession}
        fetchInitialData={(id)=>getVisitedUserDetail(id)}
        userProfileData={this.props.visitedUser}
         userId={this.props.params.id}/>
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
  };
}

export default connect(select)(UserProfilePage);
