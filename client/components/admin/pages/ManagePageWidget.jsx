import React, { Component, PropTypes } from 'react';

import ManagePageList from './ManagePageList';
import AdminSidebar from '../AdminSidebar';

export default class ManagePageWidget extends Component {

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
              <ManagePageList  page={this.props.pages}   onDeleteClick={this.props.onDeleteClick}
                error={this.props.error} success={this.props.success}/>
          </div>
        </div>
      </div>

    );
  }

}
