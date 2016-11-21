import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

export default class FriendRequestsList extends Component{
 constructor(props){
   super(props);
 }

 render() {

   const{dispatch} = this.props;
  // var friends = this.props.friendsList;
  // var friendElement = [];

  //  Object.keys(friends).forEach((id)=> {
  //   //  friendElement.push(<Friends id={id} onClickBlock={this.props.onClickBlock} onDeleteClick={this.props.onDeleteClick}
  //   //              {...friends[id]}
  //   //              isSaved={true}
  //   //           />);
  //    }
  //  );



   return (
 <div className="uk-grid uk-grid-large dash_top_head">
         Hetre
       </div>


   );
 }
}

function select(state) {
  return {
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(FriendRequestsList);
