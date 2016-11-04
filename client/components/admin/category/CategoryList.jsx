import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Category from './Category';
import {updateCategoryById} from '../../../actions/CategoryActions';

export default class CategoryList extends Component {
  render() {
    const{dispatch} = this.props;
    var categories = this.props.categories;
    var categoryElements = [];

    Object.keys(categories).forEach( (categoryId) => {
      categoryElements.push(<Category id={categoryId} onChangeInput={this.props.onChange} onDeleteClick={this.props.onDeleteClick}
                  {...categories[categoryId]}

              isSaved={true}
               />);
      }
    );



    return (
      <ul className="uk-nestable" data-uk-nestable="{group:'test', handleClass:'uk-nestable-handle'}">
          {categoryElements}
        </ul>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.object.isRequired
};

function select(state) {
  return {
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CategoryList);
