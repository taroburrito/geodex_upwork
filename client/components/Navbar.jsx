import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchUser } from '../actions/UserActions';
import {getVisitedUserDetail} from '../utilities/ServerSocket';

export default class Navbar extends Component {
  constructor(props){
    super(props);

  }
  changeContent(e){

    this.props.changeContent(e);
  }

  handleSearchChange(e){

    this.props.searchUser(e.target.value);
  }

  handleClickUser(name,profileId){
    this.props.searchUser('');
    const{dispatch,userAuthSession} = this.props;
    var userId = userAuthSession.userObject.id;
    getVisitedUserDetail(userId,profileId);
    this.refs.search.getDOMNode().value = name;

  }

  render() {
    const{searchResult} = this.props;
    var searchList  = [];
    if(searchResult){
      Object.keys(searchResult).forEach((Id)=>
      {
        var item = searchResult[Id];
        var name = item.first_name+" "+item.last_name;
        var link = "/user/"+item.id;
         searchList.push(
          <Link to={link} onClick={this.handleClickUser.bind(this,name,item.id)}> <li  className="placesSuggest_suggest"><span>{name}</span></li></Link>
         );
      }
    );

    }
    if(this.props.userAuthSession){
      if(this.props.userAuthSession.isLoggedIn){
      return(
        <div>
          <nav className="uk-navbar fixed-nav innerpage_nav">
              <Link className="uk-navbar-brand uk-hidden-small" to="dashboard"><img src="public/images/logo.png"/></Link>

      <form className="uk-search search_dash_nav">
              <input className="uk-search-field" placeholder="search..."  type="search" ref="search" onChange={this.handleSearchChange.bind(this)} style={{width:'80%'}}/>
          <div className="uk-dropdown uk-dropdown-search" aria-expanded="false"></div>
            <ul className="placesSuggest_suggests">

            {searchList?searchList:null}
            </ul>
          </form>



      <ul className="uk-navbar-nav uk-hidden-small uk-float-right">
                  <li><a href="">Current</a></li>
                  <li><a href="">Messages</a></li>
                  <li><a href="">Notifications</a></li>
        <li><a href="">About</a></li>
        <li><div className="uk-button-group settings">
                  <div className="uk-button"></div>
                  <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false" className="">
                      <a href="#" className="uk-button"><i className="uk-icon-gear"></i></a>
                      <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" style={{top:'30px',left:0}} >
                          <ul className="uk-nav uk-nav-dropdown">

                              <li><Link to="settings">Settings </Link></li>
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

function select(state) {
  return {

    visitedUser: state.visitedUser,
  };
}

export default connect(select)(Navbar);
