import React, { Component, PropTypes } from 'react';
import Category from './Category';
//import { connect } from 'react-redux';
//import { Navigation, Link } from 'react-router';


export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    }

  render(){
    const{categories} = this.props;
    var categoriesElements = [];
    if(categories)
    Object.keys(categories).forEach( (categoryId) => {
      if(categories[categoryId].added_by != 'admin')
      categoriesElements.push(<Category id={categoryId} onChangeInput={this.props.onChange} onDeleteClick={this.props.onDeleteClick}
                  {...categories[categoryId]}

              isSaved={true}
               />);
      }
    );

    if(categoriesElements){
    return(
      <div>
        <label className="uk-form-label ufl2">Manage Category</label>
      <ul className="uk-nestable uflul" data-uk-nestable="{group:'test', handleClass:'uk-nestable-handle'}">
          {categoriesElements}
        </ul>
      </div>
     );
   }
     else {
       return(
         <div>No category added yet</div>
        );
     }

   }
}
