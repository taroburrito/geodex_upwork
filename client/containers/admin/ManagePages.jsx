import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import { deletePage } from '../../actions/PageActions';
import ManagePageWidget from '../../components/admin/pages/ManagePageWidget';
import {registerPages} from '../../utilities/ServerSocket';

class ManagePages extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {

  }

  render() {
    const { dispatch } = this.props;
    return (
    <div>
      <ManagePageWidget
        error={this.props.handleMessage.error}
        success={this.props.handleMessage.success}
        title = {"Manage Pages"}
        fetchInitialData={registerPages}
        pages={this.props.universalPages}
        onDeleteClick={Id => dispatch(deletePage(Id))} />
    </div>
    );
  }
}

function select(state) {
  return {
universalPages: state.universalPages,
handleMessage: state.handleMessage
  };
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(ManagePages);
