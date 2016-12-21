import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import ViewProfilePageWidget from '../../components/admin/ViewProfilePageWidget';

/*Actions*/
import {fetchUserProfile} from '../../actions/AdminActions';

class ViewProfilePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {

  }
  componentWillMount(){
    //console.log(this.props.params.id);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <ViewProfilePageWidget
        fetchInitialData={(profileId)=>{dispatch(fetchUserProfile(profileId))}}
        profileId={this.props.params.id}
        userProfile={this.props.userProfile}/>
    );
  }
}

function select(state) {
  return {
    userProfile: state.userProfile
  };
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(ViewProfilePage);
