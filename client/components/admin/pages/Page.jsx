import React, { Component, PropTypes } from 'react';

import {Link} from 'react-router';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }
  handleClickDelete(e){
    console.log(e);
    this.props.onDeleteClick(e.props.id);

  }
  render() {
    console.log(this.props);
    var content = this.props.title;
    var pageId = this.props.id;
    var editLink = "editPage/"+pageId;
    return (
      <tr>
          <td>{content}</td>
          <td>
            <Link to={editLink}><i title="Edit" alt="Edit" className="uk-icon-edit"></i></Link>
             <Link><i title="View" alt="View" className="uk-icon-eye"></i></Link>
              <i title="Delete" alt="Delete" className="uk-icon-close" onClick={()=>this.handleClickDelete(this)}></i>

          </td>
      </tr>
    );
  }
}

Page.propTypes = {
};
