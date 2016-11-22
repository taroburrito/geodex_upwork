import React, { Component, PropTypes } from 'react';
import FriendRequestsList from './FriendRequestsList';

export default class ManageRequestsWidget extends Component {
constructor(props){
  super(props);
}

componentWillMount(){
  const{userAuthSession} = this.props;
//  this.props.fetchInitialData(userAuthSession.userObject.id);

}

render(){
  return(
    <div className="uk-container uk-container-center middle_content dashboad">
      <FriendRequestsList/>
  </div>
  );
}
}
