import React, { Component, PropTypes } from 'react';

import AddNewPage from './AddPage';
import AdminSidebar from '../AdminSidebar';

export default class PageWidget extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount() {
  //  this.props.fetchInitialData();
  }

  render() {
    return (
      <div className="tm-middle">
        <div className="uk-container-my uk-container-center">
          <div data-uk-grid-margin="" className="uk-grid">
              <AdminSidebar/>

              <AddNewPage onClickPost={this.props.onClickPost}
                error={this.props.errro}
                success={this.props.success}
                />
          </div>
        </div>
      </div>

    );
  }

}
