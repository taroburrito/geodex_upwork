import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import ManageFriendsWidget from '../../components/front/ManageFriendsWidget';
import Home from '../../components/front/Home';
import {clickedBlockUser, clickedDeleteFriend, changeFriendCat} from '../../actions/UserActions';


import { fetchFriendList, getCategoryByUserId } from '../../utilities/ServerSocket';


export default class ManageFriends extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, userAuthSession } = this.props;
    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
        <ManageFriendsWidget
                        onChangeFriendCat={(userId,friendId,catId)=>
                          dispatch(changeFriendCat(userId,friendId,catId))}
                        categories={this.props.categories}
                        fetchInitialData={(id)=>fetchFriendList(id)}
                        getCategories={(userId)=>
                        getCategoryByUserId(userId)}
                        friendsData={this.props.friendsData}
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
    friendsData: state.friendsListState,
    categories: state.universalCategories
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ManageFriends);
