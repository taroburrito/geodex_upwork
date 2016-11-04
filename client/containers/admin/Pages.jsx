import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import PageWidget from '../../components/admin/pages/PageWidget';

import { addPage, hideMessage } from '../../actions/PageActions';

class Pages extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {

  }
  componentDidUpdate() {
    const{dispatch} = this.props;
    setTimeout(() => {
  //dispatch(hideMessage());
}, 5000);
    //dispatch(handleMessage());
  }
  render() {
    const { location, children, dispatch } = this.props;
    const { pathname } = location;

    const value = pathname.split('/');
    var currentPage = value[0];
    if(this.props.params.id){
      var pageId = this.props.params.id;
    }else{
      var pageId = null;
    }
    return (
    <div className="full_width">
      <PageWidget
        page={currentPage}
        pageId={pageId}
        error={this.props.handleMessage.error}
        success={this.props.handleMessage.success}
        title = {"Pages"}
        onClickPost = {(data) =>{
            dispatch(addPage(data))
          }}
            />
    </div>
    );
  }
}

function select(state) {
  return {
handleMessage: state.handleMessage
  };
}

export default connect(select)(Pages);
