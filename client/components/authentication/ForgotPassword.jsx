import { validateEmail } from '../../utilities/RegexValidators';
import React, { Component, PropTypes } from 'react';

const initialFormState = {
      errorMessage:  null,
};

export default class ForgotPassword extends Component {


  constructor(props){
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.state = Object.assign({}, initialFormState);
  }

  componentDidMount(){

  }

  findErrorsInForgotPasswordForm(formData){
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

    return newState;
  }

  handleClickSubmit(){

     var formData = {
      email : this.refs.email.getDOMNode().value.trim(),
    }

    let newState = this.findErrorsInForgotPasswordForm(formData);
    this.setState(newState);
    if (!newState.errorMessage){
      this.props.onClickSubmit(formData);
    }

  }

  render() {
    var errorLabel;

    if(this.state.errorMessage){
      errorLabel = (

          <div className="uk-alert uk-alert-danger"><p>{this.state.errorMessage}</p></div>
       );
    }
    else if(this.props.serverError){
      errorLabel = (

          <div className="uk-alert uk-alert-danger"><p>{this.props.serverError}</p></div>
        );
    }else if(this.props.successMessage){
      errorLabel = (

          <div className="uk-alert uk-alert-success"><p>{this.props.successMessage}</p></div>
        );
    }
    return (
  <div>

   <div id="forget_pass" className="uk-modal geo_modals">
     <div className="uk-modal-dialog">
        <button type="button" className="uk-modal-close uk-close"></button>
        <div className="uk-modal-header">
          <h2>Forgot Password</h2>
        </div>
        {errorLabel}
        <form className="uk-form">
          <div className="uk-form-row">
            <input className="uk-width-1-1 uk-form-large" placeholder="Enter your registered email id" type="text" ref="email"/>
          </div>

          <div className="uk-form-row">
            <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" onClick={this.handleClickSubmit}>Send</a>
          </div>

        </form>
      </div>
    </div>
  </div>
    );
  }
}

ForgotPassword.propTypes = {
  serverError: PropTypes.string
};
