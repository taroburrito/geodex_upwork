import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export default class FriendRequestsList extends Component{
 constructor(props){
   super(props);
   this.handleClickConfirm = this.handleClickConfirm.bind(this);
 }

 handleClickConfirm(requestId){
   if(requestId)
   this.props.clickedConfirmRequest(requestId);
 }
 handleClickDelete(requestId){
   alert(requestId);
   if(requestId)
   this.props.clickedDeleteRequest(requestId);
 }
 render() {

   const{dispatch} = this.props;
   var view_link = "/user/"+this.props.user_id;
    var img;
    if(this.props.profile_image){
      img = "uploads/images/user_"+this.props.user_id+"/"+this.props.profile_image;

    }else{
      img= "public/images/user.png";
    }
  return (
     <div className="uk-width-small-1-3 add_friend">
       <div className="af_border">
         <div className="uk-grid uk-grid-small">
           <div className="uk-width-2-10"><img src={img} className=""/></div>
           <div className="uk-width-6-10 user_bottom_img_right">
             <h3><Link to={view_link}>{this.props.Name}</Link><small className="user_location"><a>{this.props.address}</a></small></h3>
           </div>
           </div>
           <div className="manage-request-btns-div">
             <a  className="uk-button manage-request-btns confirm-rqst-btn" onClick={this.handleClickConfirm.bind(this, this.props.request_id)}>Confirm</a>
             <a className="uk-button manage-request-btns delete-rqst-btn" onClick={this.handleClickDelete.bind(this, this.props.request_id)}>Delete Request</a>
           </div>
         </div>
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
