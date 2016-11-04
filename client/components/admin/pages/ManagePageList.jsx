import React, { Component, PropTypes } from 'react';
import Page from './Page';

export default class ManagePageList extends Component{
 constructor(props){
   super(props);
 }

  render() {
    var message;
    if(this.props.success){
      message = (<label className="control-label" >{this.props.success}</label>);
    }else if (this.props.error) {
      message = (<label className="control-label" >{this.props.error}</label>);
    }
    var pages = this.props.page;
    var pageElements = [];
    console.log(this.props);

    Object.keys(pages).forEach( (pageId) => {
      pageElements.push(<Page onDeleteClick={this.props.onDeleteClick}{...pages[pageId]}

              isSaved={true}
               />);
      }
    );



    return (
      <div className="tm-main uk-width-medium-3-4">
        <div className="uk-container uk-container-center">
          <h2 className="white_heading">Manage Page</h2>
          {message}
            <table className="uk-table uk-table-hover uk-table-striped manage_page">
               <thead>
                  <tr>
                      <th>Title</th>
                      <th>Action</th>
                  </tr>
              </thead>

              <tbody>
                {pageElements}

              </tbody>
          </table>

      </div>
      </div>
    );
  }
}

ManagePageList.propTypes = {
  pages: PropTypes.object.isRequired
};
