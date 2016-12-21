import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import ManageUserWidget from '../../components/admin/manage_users/ManageUserWidget';

/*Actions*/
import {getAllUsers,deleteUser,changeUserStatus} from '../../actions/AdminActions';

class ManageUsers extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {

  }

  render() {
    const { dispatch } = this.props;
    return (
      <ManageUserWidget

        fetchInitialData={()=>{dispatch(getAllUsers())}}
        userList={this.props.userList}
        deleteUser={(userId)=>{dispatch(deleteUser(userId))}}
        changeUserStatus={(userId,status)=>{dispatch(changeUserStatus(userId,status))}}/>
    );
  }
}

function select(state) {
  return {
    userList: state.userList
  };
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(ManageUsers);
