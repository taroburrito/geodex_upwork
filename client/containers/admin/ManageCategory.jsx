import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import CategoryWidget from '../../components/admin/category/CategoryWidget';

import { addCategory, deleteCategory, handleMessage, updateCategoryById } from '../../actions/CategoryActions';
import { registerCategory } from '../../utilities/ServerSocket';

class ManageCategory extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }
  componentDidUpdate() {

    //dispatch(handleMessage());
  }
  render() {
    const { dispatch } = this.props;
    return (
    <div>
      <CategoryWidget
         fetchInitialData={registerCategory}
         userAuthSession ={this.props.userAuthSession}
          error={this.props.handleMessage.error}
          success={this.props.handleMessage.success}
          title = {"Manage Category"}
          categories  = {this.props.universalCategories}
          onAddClick = {(req) =>
                      dispatch(addCategory(req))
                   }
          onDeleteClick={Id => dispatch(deleteCategory(Id))}
          onChange={(id, value) => {
                    dispatch(updateCategoryById(id,value));
                      }}
            />
    </div>
    );
  }
}

function select(state) {
  return {
 universalCategories: state.universalCategories,
 handleMessage: state.handleMessage,
 userAuthSession:state.userAuthSession
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ManageCategory);
