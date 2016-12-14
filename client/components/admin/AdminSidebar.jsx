import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navigation } from 'react-router';

export default class AdminSidebar extends Component {
  redirectPage(pageName){
    console.log(pageName);
    this.context.router.transitionTo('/admin/'+pageName);
  }
  render() {

    return (
      <div className="tm-sidebar uk-width-medium-1-4 uk-hidden-small">

        <ul data-uk-nav="" className="uk-nav uk-nav-offcanvas uk-nav-parent-icon">

        <li><Link to="/dash">Dashboard</Link></li>

        <li className="uk-parent">
        <a href="#">Manage CMS</a>
          <ul className="uk-nav-sub">
            <li><Link to="addPage">Add new page</Link></li>
            <li><Link to="/manage_pages">Manage pages</Link></li>
          </ul>
        </li>
        <li><Link to="/manage_category">Manage Categories</Link></li>
        <li><Link to="/manage_users">Manage Users</Link></li>
        </ul>

      </div>

    );
  }
}
