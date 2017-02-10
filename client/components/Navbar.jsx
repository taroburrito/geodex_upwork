import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchUser } from '../actions/UserActions';
import {getVisitedUserDetail} from '../utilities/ServerSocket';

export default class Navbar extends Component {
  constructor(props){
    super(props);
     this.verifyLogin = this.verifyLogin.bind(this);
     this._handleKeyPress = this._handleKeyPress.bind(this);
     this.state={
       error:null,
       success:null,
     }

  }
  changeContent(e){

    this.props.changeContent(e);

  }


  handleSearchChange(e){

    this.props.searchUser(e.target.value);
  }

  _handleKeyPress(e){
    if(e.key=='Enter'){
        this.verifyLogin();
      }
  }

  verifyLogin(){

    var pwd = this.refs.authPwd.getDOMNode().value.trim();
    console.log(pwd)
    console.log(this.props.page);
    console.log("*")
    //this.props.verifyLockPwd(pwd);
    if(pwd == 'root'){
      localStorage.setItem("verifyAuth",true);
      this.setState({error:null,success:"Congratulation your password is confirmed, You can now access the site"});
      setTimeout(function(){
        if(this.props.page){
          this.context.router.transitionTo('/');
        }else{
          this.context.router.transitionTo('/home');
        }

        var modal = UIkit.modal("#auth");
        modal.hide();
      }.bind(this),1000)

    }else{
      if(pwd == ''){
        this.setState({error:"Please enter site password",success:null})
      }else{
      this.setState({error:"Sorry you have enterd wrong password",success:null});
    }

    }


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
              <div className="uk-container uk-container-center top-navigation">
              <Link className="uk-navbar-brand uk-hidden-small" to="dashboard"><img src="public/images/logo.png"/></Link>

      <form className="uk-search search_dash_nav">
              <input className="uk-search-field" placeholder="search..."  type="search" ref="search" onChange={this.handleSearchChange.bind(this)} style={{width:'80%'}}/>
          <div className="uk-dropdown uk-dropdown-search" aria-expanded="false"></div>
            <ul className="placesSuggest_suggests">

            {searchList?searchList:null}
            </ul>
          </form>



      <ul className="uk-navbar-nav uk-hidden-small uk-float-right">
                  <li><Link to="/feeds">Feed</Link></li>
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
                              <li><Link to={"user/"+this.props.userAuthSession.userObject.id}>MyProfile </Link></li>
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
          </div>
          </nav>

  			</div>
      );
    }
    else{
      if(this.state.error){
        var ValidationMesssage = (
        <div className="uk-alert uk-alert-danger"><p>{this.state.error}</p></div>
        )
      }else if (this.state.success) {
        var ValidationMesssage = (
        <div className="uk-alert uk-alert-success"><p>{this.state.success}</p></div>
        )
      }else {
        var ValidationMesssage;
      }
    return (
      <div>
				<nav className="uk-navbar fixed-nav innerpage_nav">
						<Link className="uk-navbar-brand uk-hidden-small" to="home"><img src="public/images/logo.png" alt=""/></Link>
            {/* {!localStorage.getItem("verifyAuth")?
        <a href={"#auth"} data-uk-modal><img src="public/images/lock.png" className="lockset"/></a>
        :null} */}
          <ul className="uk-navbar-nav uk-hidden-small uk-float-right">
              <li><a onClick={()=>this.changeContent('aboutUs')} href="#/pages/aboutUs">About Us</a></li>
              <li><Link to="pages/contactUs">Contact Us</Link></li>
              <li><a onClick={()=>this.changeContent('terms')} href="#/pages/terms">Term Of Use</a></li>
						</ul>
						<a href="#offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
						<div className="uk-navbar-brand uk-navbar-center uk-visible-small"><a className="" href="index.html"><img src="public/images/logo.png"/></a></div>
				</nav>
        <div id="auth" className="uk-modal" >
          <div className="uk-modal-dialog">
             <button type="button" className="uk-modal-close uk-close"></button>
             <div className="uk-modal-header">
                 <h2>Verify site authentication by typing password here.</h2>
             </div>
             {ValidationMesssage}


                   <div className="uk-form-row">
                       <input className="uk-width-1-1 uk-form-large" placeholder="Password" onKeyPress={this._handleKeyPress} type="password" ref="authPwd"/>

                   </div>
                   <div className="uk-form-row">

                     <div className="uk-text-small uk-pull-left f_r_p">

                       <a className="uk-width-1-4 uk-button uk-button-primary uk-button-large" onClick={this.verifyLogin}>Verify</a>

                   </div>

                   </div>



          </div>
        </div>
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


Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};

function select(state) {
  return {

    visitedUser: state.visitedUser,
  };
}

export default connect(select)(Navbar);
