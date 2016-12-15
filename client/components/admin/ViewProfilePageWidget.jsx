import React, { Component, PropTypes } from 'react';


import AdminSidebar from './AdminSidebar';
import ViewProfile from './ViewProfile';

export default class ViewProfilePageWidget extends Component {

  constructor(props){
    super(props);

  }
  componentWillMount() {
    this.props.fetchInitialData(this.props.profileId);
  }

  render() {


    return (
      <div className="tm-middle">
        <div className="uk-container-my uk-container-center">
          <div data-uk-grid-margin="" className="uk-grid">
            <AdminSidebar/>
            <ViewProfile
              userProfile={this.props.userProfile}/>
          </div>
        </div>
      </div>

    );
  }

}
