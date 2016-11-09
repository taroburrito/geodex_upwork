import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import ManageFriendsWidget from '../../components/front/ManageFriendsWidget';
import Home from '../../components/front/Home';
import {clickedBlockUser, clickedDeleteFriend} from '../../actions/UserActions';


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
                       onClickBlock={(senderId,receiverId,UserId)=>
                       dispatch(clickedBlockUser(senderId,receiverId,UserId))}
                       onDeleteClick={(id)=>
                       dispatch(clickedDeleteFriend(id))}
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
    friendsList: state.friendsListState,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ManageFriends);
