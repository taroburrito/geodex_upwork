import React, { Component, PropTypes } from 'react';
import Friends from './Friends';
import {connect} from 'react-redux';

export default class FriendsList extends Component{
 constructor(props){
   super(props);
 }

 render() {
   console.log(this.props);
   const{dispatch} = this.props;
   var friends = this.props.friendsData.friendsList;
   var categorizedFriendList = this.props.friendsData.categorizedFriendList;
   var friendElement = [];
   if(friends)
   Object.keys(friends).forEach((id)=> {
     if(friends[id].status !=0){
     var user_id = friends[id].user_id;
     if(categorizedFriendList && categorizedFriendList[user_id]){
       var categoryContent = categorizedFriendList[user_id];
     }else{
       var categoryContent = null;
     }
     friendElement.push(<Friends id={id}
                  categoryData={categoryContent}
                  onChangeFriendCat={this.props.onChangeFriendCat}
                  userAuthSession={this.props.userAuthSession}

                  categories={this.props.categories}
                  onClickBlock={this.props.onClickBlock}
                  onDeleteClick={this.props.onDeleteClick}
                 {...friends[id]}
                 isSaved={true}
              />);
            }
     }
   );
   return (
      <div className="uk-grid uk-grid-large dash_top_head">
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
