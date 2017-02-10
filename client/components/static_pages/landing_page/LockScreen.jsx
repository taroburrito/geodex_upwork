import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchUser } from '../../../actions/UserActions';
import {getVisitedUserDetail} from '../../../utilities/ServerSocket';

export default class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.verifyLogin = this.verifyLogin.bind(this);

    this.state={
      error:null,
      success:null,
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


  render(){
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
    return(
      <div>
        <div className="logo-splash">
        <img src="public/images/logo_a_b.png"/>
          <a href={"#auth"} data-uk-modal><img src="public/images/iconmonstr-lock.png" className="lockset"/></a>
      </div>

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
    )
  }
}

LockScreen.contextTypes = {
  router: PropTypes.object.isRequired
};

function select(state) {
  return {

    visitedUser: state.visitedUser,
  };
}

export default connect(select)(LockScreen);
