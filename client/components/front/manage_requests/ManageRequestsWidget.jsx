import React, { Component, PropTypes } from 'react';
import FriendRequestsList from './FriendRequestsList';

export default class ManageRequestsWidget extends Component {
constructor(props){
  super(props);
}

componentWillMount(){
  const{userAuthSession} = this.props;
  this.props.fetchInitialData(userAuthSession.userObject.id);

}

render(){
  const{friendRequests} = this.props;
  if(friendRequests)
   var friendElement = [];
  Object.keys(friendRequests).forEach((id)=> {
    friendElement.push(<FriendRequestsList id={id} clickedConfirmRequest={this.props.clickedConfirmRequest}
                {...friendRequests[id]}
                isSaved={true}
             />);
    }
  );
  return(
    <div className="uk-container uk-container-center middle_content dashboad">
            {friendElement}
    </div>
  );
}
}
