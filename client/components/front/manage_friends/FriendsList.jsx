import React, { Component, PropTypes } from 'react';
import Friends from './Friends';
import {connect} from 'react-redux';

export default class FriendsList extends Component{
 constructor(props){
   super(props);
 }

 render() {
   console.log(this.props.friendsList);
   const{dispatch} = this.props;
   var friends = this.props.friendsList;
   var friendElement = [];

   Object.keys(friends).forEach( (friendId) => {
     friendElement.push(<Friends id={friendId}
                 {...friends[friendId]}

             isSaved={true}
              />);
     }
   );



   return (
<div>
         {friendElement}
       </div>

   );
 }
}

FriendsList.propTypes = {
  // pages: PropTypes.object.isRequired
};
function select(state) {
  return {
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(FriendsList);
