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
    <div>

    <FriendsList friendsList="dddd"/>
</div>
  );
}
}
