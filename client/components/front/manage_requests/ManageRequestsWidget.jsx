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
    friendElement.push(<FriendRequestsList id={id}
                clickedDeleteRequest={this.props.clickedDeleteRequest}
                clickedConfirmRequest={this.props.clickedConfirmRequest}
                {...friendRequests[id]}
                isSaved={true}
             />);
    }
  );


  if(friendElement && friendElement.length > 0){
   return(
      <div className="uk-container uk-container-center middle_content dashboad">
          <div className="uk-grid uk-grid-medium">
            {friendElement}
          </div>
      </div>
    )
  }else {
      return(
        <div className="uk-container uk-container-center middle_content dashboad"><h3>No friend requests</h3></div>
      )
    }
  }
}
