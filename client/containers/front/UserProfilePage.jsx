import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProfileWidget from '../../components/front/ProfileWidget';
import Home from '../../components/front/Home';

//import { fetchUserProfile, reloadingProfilePage } from '../../actions/ProfileActions';

export default class UserProfilePage extends Component {
  constructor(props, context) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props.params.id);
  //  this.props.dispatch(fetchUserProfile(this.props.params.id));
  }

  componentWillUpdate(){

  }


  render() {
    const { dispatch, userAuthSession, userProfileData } = this.props;
    if(userAuthSession.isLoggedIn){
    return (
      <div className="full_width">
      {/* <ProfileWidget userProfileData={this.props.userProfileData} userId={this.props.params.id}/> */}
      </div>
    );
  }else {
    return (
      <div className="full_width">
        <h1> <Home/> </h1>
      </div>
    );
  }
  }
}


function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    userProfileData: state.userProfileData,
  };
}

export default connect(select)(UserProfilePage);
