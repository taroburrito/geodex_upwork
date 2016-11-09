import React, { Component, PropTypes } from 'react';
import FriendsList from './manage_friends/FriendsList';
import Navbar from '../Navbar';

export default class ManageFriendsWidget extends Component {
constructor(props){
  super(props);
}

componentWillMount(){
  const{userAuthSession} = this.props;
  this.props.fetchInitialData(userAuthSession.userObject.id);

}

render(){
  return(
    <div className="uk-container uk-container-center middle_content dashboad">
      <FriendsList friendsList={this.props.friendsList}
         onClickBlock={this.props.onClickBlock}
         onDeleteClick={this.props.onDeleteClick}/>
  </div>
  );
}
}
