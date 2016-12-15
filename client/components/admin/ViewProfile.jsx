import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

export default class ViewProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {

  }

  getProfileImage(img,userId){
     if(img){
       var imageSrc = "uploads/images/user_"+userId+"/"+img;
      return imageSrc;
    }else{
     return "public/images/user.png";
    }

  }

  render() {
    const{userProfile} = this.props;
    if(userProfile)
    if(!userProfile.cover_image){
    var background_profile_css ={
      backgroundImage: 'url(public/images/profile_banner.jpg)'
    }
  }else{
    var coverImage = "uploads/images/user_"+userProfile.id+"/"+userProfile.cover_image;
    var background_profile_css ={

      backgroundImage: 'url(' + coverImage + ')'
    }
  }
    return (
      <div className="tm-main uk-width-medium-3-4">
        <div className="uk-container uk-container-center">


      <div className="background_profile" style={background_profile_css}>
        <div className="uk-container uk-container-center">
           <div className="uk-grid uk-grid-large dash_top_head">
            <div className="uk-width-small-1-2">
              <div className="uk-grid uk-grid-small">
              <div className="uk-width-3-10 user_img_left">
                <img src={this.getProfileImage(userProfile.profile_image,userProfile.id)} />

                </div>
              <div className="uk-width-7-10 pro_right">

              <h3>{userProfile.NAME}</h3>
              <h4>{userProfile.address}</h4>
              <h5>{userProfile.email} <i className="uk-icon-envelope"></i></h5>
              </div>
              </div>
            </div>
           </div>
         </div>
        </div>
      </div>
    </div>
    );
  }
}
