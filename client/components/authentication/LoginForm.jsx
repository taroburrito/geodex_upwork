import { validateEmail, validateDisplayName, validatePassword } from '../../utilities/RegexValidators';

import React, { Component, PropTypes } from 'react';

const initialFormState = {
      errorMessage:  null,
      isEmailFieldIncorrect : false,
      isPasswordFieldIncorrect : false
};

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({}, initialFormState);
    this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
    this.handleClickForgot = this.handleClickForgot.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  getInputContainerClass(inputIncorrect){
    return ("form-group " + (inputIncorrect ? "has-error" : "") );
  }
  handleClickForgot(){
    this.setState({errorMessage:null});
     this.refs.email.getDOMNode().value = "";
    this.refs.password.getDOMNode().value = "";
  }

  findErrorsInLoginForm(formData) {
    // Only finding one error at a time.
    let newState = Object.assign({}, initialFormState);

    // Checking email
    if (formData.email === "") {
      newState.errorMessage = "Email is required";
      newState.isEmailFieldIncorrect = true;
    }
    else if (!validateEmail(formData.email)) {
      newState.errorMessage = "Please enter a valid email address";
      newState.isEmailFieldIncorrect = true;
    }
    // Checking password
    else if (formData.password === "") {
      newState.errorMessage = "Password is required";
      newState.isPasswordFieldIncorrect = true;
    }
    else if(!validatePassword(formData.password)) {
      newState.errorMessage = "Passwords must contain at least 6 valid characters";
      newState.isPasswordFieldIncorrect = true;
    }

    return newState;
  }
  _handleKeyPress(e){
    if(e.key=='Enter'){
        this.handleOnClickLogin();
      }
  }
  handleOnClickLogin(){
    var formData = {
      email : this.refs.email.getDOMNode().value.trim(),
      password : this.refs.password.getDOMNode().value.trim(),
      role : this.refs.role.getDOMNode().value.trim(),
    }
    let newState = this.findErrorsInLoginForm(formData);
    this.setState(newState);
    if (!newState.errorMessage){
      this.props.onClickLogin(formData);
    }
  }

  componentDidMount(){
    React.findDOMNode(this.refs.email).focus();
  }

  componentDidUpdate(){
    
    if(this.props.serverError === "Email not found."){
      if(!this.state.isEmailFieldIncorrect){
        let newState = Object.assign({}, this.state);
        newState.isEmailFieldIncorrect = true;
        this.setState(newState);
      }
      React.findDOMNode(this.refs.email).focus();
    }
    if(this.props.serverError === "Incorrect password."){
      if(!this.state.isPasswordFieldIncorrect){
        let newState = Object.assign({}, this.state);
        newState.isPasswordFieldIncorrect = true;
        this.setState(newState);
      }
      React.findDOMNode(this.refs.password).focus();
    }
  }

  render() {
    var loader;
    var errorLabel;
    if (this.props.isFetchingData){
      loader = <p> loading </p>;
    }

    if(this.state.errorMessage){
      errorLabel = (
        <div className="uk-alert uk-alert-danger">
          <p>{this.state.errorMessage}</p>
        </div> );
    }
    else if(this.props.serverError){
      errorLabel = (
        <div className="uk-alert uk-alert-danger">
          <p>{this.props.serverError}</p>
        </div> );
    }
    return (
  <div>

  <div className="uk-vertical-align uk-text-center uk-height-1-1">
    <div className="uk-vertical-align-middle login_form">
     <img className="uk-margin-bottom" src="../../resources/images/logo.png" alt=""/>
      <form className="uk-panel uk-panel-box uk-form">
        { errorLabel }
        {loader}
        <div className="uk-form-row">
          <input className="uk-width-1-1 uk-form-large" type="text" onKeyPress={this._handleKeyPress} placeholder="Email" ref="email"/>
        </div>
        <div className="uk-form-row">
          <input className="uk-width-1-1 uk-form-large" type="password"  onKeyPress={this._handleKeyPress} placeholder="Password" ref="password" />
          <input type="hidden" value="admin" ref="role" />
        </div>
        <div className="uk-form-row">
            <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" onClick={this.handleOnClickLogin}>Login</a>
        </div>
        <div className="uk-form-row uk-text-small">

            <a className="uk-float-right uk-link uk-link-muted" data-uk-modal="{target:'#forget_pass'}" onClick={this.handleClickForgot}>Forgot Password?</a>

        </div>
      </form>
    </div>
   </div>
  </div>
    );
  }
}

LoginForm.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  serverError: PropTypes.string
};
