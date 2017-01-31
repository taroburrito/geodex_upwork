import React, {Component, PropTypes} from 'react';

import { validateEmail, validateDisplayName, validatePassword } from '../../utilities/RegexValidators';

const initialFormState = {
      errorMessage:  null,
      isEmailFieldIncorrect : false,
      isPasswordFieldIncorrect : false
};
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
    this._handleKeyPress=this._handleKeyPress.bind(this)
    this.state = Object.assign({}, initialFormState);
  }

  getInputContainerClass(inputIncorrect){
    return ("form-group " + (inputIncorrect ? "has-error" : "") );
  }
   componentDidMount(){
    React.findDOMNode(this.refs.email).focus();
  }

  componentDidUpdate(){
    //console.log(this.props.serverError);
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

  findErrorsInLoginForm(formData) {
    // Only finding one error at a time.
    let newState = Object.assign({}, initialFormState);

    // Checking email
    if (formData.email === "") {
      newState.errorMessage = "Email is required";
    }
    else if (!validateEmail(formData.email)) {
      newState.errorMessage = "Please enter a valid email address";
    }
    // Checking password
    else if (formData.password === "") {
      newState.errorMessage = "Password is required";
    }
    else if(!validatePassword(formData.password)) {
      newState.errorMessage = "Passwords must contain at least 6 valid characters";
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


  render(){
    var errorLabel;
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

    return(
      <div id="login" className="uk-modal" >
        <div className="uk-modal-dialog">
           <button type="button" className="uk-modal-close uk-close"></button>
           <div className="uk-modal-header">
               <h2>Login</h2>
           </div>
           {errorLabel}
          <form className="uk-form">
                 <div className="uk-form-row">
                     <input className="uk-width-1-1 uk-form-large" placeholder="Email" onKeyPress={this._handleKeyPress} type="text" ref="email"/>
                 </div>
                 <div className="uk-form-row">
                     <input className="uk-width-1-1 uk-form-large" placeholder="Password" onKeyPress={this._handleKeyPress} type="password" ref="password"/>
                     <input value="user" type="hidden" ref="role"/>
                 </div>
                 <div className="uk-form-row">

                   <div className="uk-text-small uk-pull-left f_r_p">
                     {/*<label className="uk-float-left"><input type="checkbox"/> Remember Me</label>*/}
                     <a className="uk-width-1-4 uk-button uk-button-primary uk-button-large" href="#" onClick={this.handleOnClickLogin}>Login</a>
                <a className="uk-float-right uk-link uk-link-muted" data-uk-modal="{target:'#forget_pass'}">Forgot Password?</a>
                 </div>

                 </div>

             </form>

        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
//  onClickLogin: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  serverError: PropTypes.string
};
