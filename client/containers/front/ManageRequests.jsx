import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import ManageRequestsWidget from '../../components/front/manage_requests/ManageRequestsWidget';
import Home from '../../components/front/Home';
//import {clickedBlockUser, clickedDeleteFriend} from '../../actions/UserActions';
import { fetchFriendsRequests } from '../../utilities/ServerSocket';

export default class ManageRequests extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, userAuthSession } = this.props;
    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
        <ManageRequestsWidget
          fetchInitialData={(userId)=>
          fetchFriendsRequests(userId)}
          userAuthSession={userAuthSession}/>
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
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ManageRequests);
