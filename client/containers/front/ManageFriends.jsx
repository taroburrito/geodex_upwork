import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import ManageFriendsWidget from '../../components/front/ManageFriendsWidget';
import Home from '../../components/front/Home';


import { fetchFriendList } from '../../utilities/ServerSocket';


export default class ManageFriends extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, userAuthSession } = this.props;
    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
        <ManageFriendsWidget fetchInitialData={(id)=>fetchFriendList(id)}
                        friendsList={this.props.friendsList}
                       userAuthSession={userAuthSession}
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
    friendsList: state.friendsList,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ManageFriends);
