import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Navbar extends Component {
  constructor(props){
    super(props);
  }
  changeContent(e){

    this.props.changeContent(e);
  }

  render() {
    if(this.props.userAuthSession){
      if(this.props.userAuthSession.isLoggedIn){
      return(
        <div>
          <nav className="uk-navbar fixed-nav innerpage_nav">
              <Link className="uk-navbar-brand uk-hidden-small" to="dashboard"><img src="public/images/logo.png"/></Link>

      <form className="uk-search search_dash_nav">
              <input className="uk-search-field" placeholder="search..." autocomplete="off" type="search"/>
          <div className="uk-dropdown uk-dropdown-search" aria-expanded="false"></div></form>

      <ul className="uk-navbar-nav uk-hidden-small uk-float-right">
                  <li><a href="">Current</a></li>
                  <li><a href="">Messages</a></li>
                  <li><a href="">Notifications</a></li>
        <li><a href="">About</a></li>
        <li><div className="uk-button-group settings">
                  <div className="uk-button"></div>
                  <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false" className="">
                      <a href="#" className="uk-button"><i className="uk-icon-gear"></i></a>
                      <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" style={{top:'30px',left:0}} tabindex="">
                          <ul className="uk-nav uk-nav-dropdown">

                              <li><Link to="settings">Settings </Link><a href="#" ></a></li>
                              <li><Link to="manage_friends">Manage friends</Link></li>
                              <li><Link to="manage_requests">Manage friends request</Link></li>
                            <li><a href="#" onClick={this.props.logout}>Logout</a></li>


                          </ul>
                      </div>
                  </div>
              </div></li>
              </ul>
              <a href="#offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
              <div className="uk-navbar-brand uk-navbar-center uk-visible-small"><a className="" href="index.html"><img src="public/images/logo.png"/></a></div>
          </nav>

  			</div>
      );
    }
    else{
    return (
      <div>
				<nav className="uk-navbar fixed-nav innerpage_nav">
						<Link className="uk-navbar-brand uk-hidden-small" to="home"><img src="public/images/logo.png" alt=""/></Link>
						<ul className="uk-navbar-nav uk-hidden-small uk-float-right">
              <li><a onClick={()=>this.changeContent('aboutUs')} href="#/pages/aboutUs">About Us</a></li>
              <li><Link to="pages/contactUs">Contact Us</Link></li>
              <li><a onClick={()=>this.changeContent('terms')} href="#/pages/terms">Term Of Use</a></li>
						</ul>
						<a href="#offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
						<div className="uk-navbar-brand uk-navbar-center uk-visible-small"><a className="" href="index.html"><img src="public/images/logo.png"/></a></div>
				</nav>
			</div>
    );
  }
}else{
  return (
    <div>
      <nav className="uk-navbar fixed-nav innerpage_nav">
          <Link className="uk-navbar-brand uk-hidden-small" to="home"><img src="public/images/logo.png" alt=""/></Link>
          <ul className="uk-navbar-nav uk-hidden-small uk-float-right">
            <li><a onClick={()=>this.changeContent('aboutUs')} href="#/pages/aboutUs">About Us</a></li>
            <li><Link to="pages/contactUs">Contact Us</Link></li>
            <li><a onClick={()=>this.changeContent('terms')} href="#/pages/terms">Term Of Use</a></li>
          </ul>
          <a href="#offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
          <div className="uk-navbar-brand uk-navbar-center uk-visible-small"><a className="" href="index.html"><img src="public/images/logo.png"/></a></div>
      </nav>
    </div>
  );
}
  }
}
