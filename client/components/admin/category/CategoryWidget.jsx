import React, { Component, PropTypes } from 'react';

import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import AdminSidebar from '../AdminSidebar';

export default class CategoryWidget extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {

    var message;
    if(this.props.success){
      message = (<div className="uk-alert uk-alert-danger" >{this.props.success}</div>);
    }else if (this.props.error) {
      message = (<div className="uk-alert uk-alert-danger" >{this.props.error}</div>);
    }
    return (
      <div className="tm-middle">
        <div className="uk-container-my uk-container-center">
          <div data-uk-grid-margin="" className="uk-grid">
              <AdminSidebar/>

              <div className="tm-main uk-width-medium-3-4">
                <div className="uk-container uk-container-center">
                  <h2 className="white_heading">Manage Categories</h2>
                    {message}
                    <AddCategory
                        onAddClick={this.props.onAddClick}
                        userAuthSession={this.props.userAuthSession} />
                     <div className="uk-grid cat_shorting">
                      <h3 className="white_heading_small">Manage Categories</h3>
                        <CategoryList
                            categories={this.props.categories}
                            onDeleteClick={this.props.onDeleteClick}
                            onChange={this.props.onChange}
                            />

                       </div>
                </div>
               </div>
          </div>
        </div>
      </div>

    );
  }

}
