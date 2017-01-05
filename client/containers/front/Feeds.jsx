import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import ManageFriendsWidget from '../../components/front/ManageFriendsWidget';
import Home from '../../components/front/Home';
import {clickedBlockUser, clickedDeleteFriend, changeFriendCat} from '../../actions/UserActions';


import { fetchFriendList, getCategoryByUserId } from '../../utilities/ServerSocket';


export default class Feeds extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, userAuthSession } = this.props;
    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
            <br/><br/><br/><h2>Feeds</h2>
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
    friendsData: state.friendsListState,
    categories: state.universalCategories
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Feeds);
