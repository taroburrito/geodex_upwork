import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class AdminNavbar extends Component {
  render() {
    var todos;
    var loginTab;
    var signupTab;
    var userDropdown;
    if (this.props.userAuthSession.isLoggedIn) {
    //  todos =  <li><Link to="/dash"> Todos </Link></li>;
    //  userDropdown = (<UserDropdown logout={this.props.logout}/>);
    } else {
      //loginTab = <li><Link to="/login"> Login </Link></li>;
    //  signupTab = <li><Link to="/signup"> Sign Up</Link></li>;
    }

    return (
        <nav className="uk-navbar fixed-nav innerpage_nav">
        <a className="uk-navbar-brand uk-hidden-small" href="#"><img src="/resources/images/logo.png"/></a>
        <ul className="uk-navbar-nav uk-hidden-small uk-float-right">
          <li>
            <div className="uk-button-group">
                <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
                  <a href="#" className="uk-button">Messages</a>
                    <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">
                        <ul className="uk-nav uk-nav-dropdown">
                            <li><a href="#">Item</a></li>
                            <li><a href="#">Another item</a></li>
                        </ul>
                    </div>
                </div>
              </div>

            </li>

            <li>
              <div className="uk-button-group">
                  <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
                      <a href="#" className="uk-button">Notifications</a>
                      <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">
                          <ul className="uk-nav uk-nav-dropdown">
                              <li><a href="#">Item</a></li>
                              <li><a href="#">Another item</a></li>

                          </ul>
                      </div>
                  </div>
                </div>

            </li>

            <li>
              <div className="uk-button-group">
                  <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
                      <a href="#" className="uk-button">Settings</a>
                      <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">
                          <ul className="uk-nav uk-nav-dropdown">
                              <li><a href="#" onClick={this.props.logout}>Logout</a></li>


                          </ul>
                      </div>
                  </div>
                </div>

            </li>
          </ul>
          <a href="#offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
          <div className="uk-navbar-brand uk-navbar-center uk-visible-small">
            <a className="" href="#"><img src="resources/images/logo.png"/></a></div>

        </nav>

    );
  }
}
