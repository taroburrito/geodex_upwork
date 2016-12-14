import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../../components/front/Home';
import ProfileWidget from '../../components/front/ProfileWidget';
import Navbar from '../../components/Navbar';
import { attemptLogout } from '../../actions/AuthActions';
import {fetchUserProfile,updateUserData} from '../../actions/ProfileActions';
import {getUserDetail} from '../../utilities/ServerSocket';


class UserSettings extends Component{
  constructor(props){
    super(props);

  }

  render(){
    const {userAuthSession, dispatch} = this.props;
    if(userAuthSession.isLoggedIn){
    return(
        <div className="full_width">
        <ProfileWidget
           fetchInitialData={(id)=>getUserDetail(id)}
           userdetail={this.props.profileData}
           userAuthSession={userAuthSession}
           updateUserImage={(req)=>dispatch(updateUserData(req))}
           />
        </div>
      );
    }

  }
}

function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    profileData:state.userProfileData
  };
}

export default connect(select)(UserSettings);
