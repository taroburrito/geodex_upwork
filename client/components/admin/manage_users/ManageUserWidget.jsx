import React, { Component, PropTypes } from 'react';


import AdminSidebar from '../AdminSidebar';

import ManageUserList from './ManageUserList';

export default class ManageUserWidget extends Component {

  constructor(props){
    super(props);
    console.log(this.props);
  }
  componentWillMount() {
    this.props.fetchInitialData();

  }
  render() {


    return (
      <div className="tm-middle">
        <div className="uk-container-my uk-container-center">
          <div data-uk-grid-margin="" className="uk-grid">
            <AdminSidebar/>
            <ManageUserList
              userList={this.props.userList}

              changeUserStatus={this.props.changeUserStatus}
              deleteUser={this.props.deleteUser}/>
          </div>
        </div>
      </div>

    );
  }

}
