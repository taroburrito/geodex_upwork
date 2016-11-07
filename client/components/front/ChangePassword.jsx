import React, {Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {changePassword} from '../../actions/AuthActions';
import { validatePassword } from '../../utilities/RegexValidators';
const initialFormState = {
      errorMessage:  null,
};

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleClickUpdatePassword = this.handleClickUpdatePassword.bind(this);
    this.state = Object.assign({}, initialFormState);

  }
  componentWillMount(){


  }
  componentDidMount(){

  }
  componentDidUpdate(){

  }

  handleClickUpdatePassword(){
    const{dispatch, userData} = this.props;
  //  console.log(userData);
    var formData = {
        old_password : this.refs.old_password.getDOMNode().value.trim(),
        new_password : this.refs.new_password.getDOMNode().value.trim(),
        confirm_password: this.refs.confirm_new_password.getDOMNode().value.trim(),
      }

      let newState = this.findErrorsInChangePasswordForm(formData);

      this.setState(newState);

      if(!newState.errorMessage){
       dispatch(changePassword(userData.email,formData.old_password,formData.new_password));
      }
  }
  findErrorsInChangePasswordForm(formData){
    let newState = Object.assign({}, initialFormState);
    if(formData.old_password === ''){
      newState.errorMessage = "Please enter old password";
    }else if(!validatePassword(formData.old_password)) {
      newState.errorMessage = "Your password must contain at least 6 valid characters";
    }else if(formData.new_password === ''){
      newState.errorMessage = "Please enter new password";
    }else if(!validatePassword(formData.new_password)) {
      newState.errorMessage = "Your password must contain at least 6 valid characters";
    }else if(formData.confirm_password === ''){
      newState.errorMessage = "Please enter confirm password";
    }else if(formData.new_password != formData.confirm_password){
      newState.errorMessage = "New password and confirm password does not match";
    }
    return newState;
  }
  // handleOnClickReset(){
  //     const { dispatch, userAuthSession } = this.props;
  //   var formData = {
  //     new_password : this.refs.new_password.getDOMNode().value.trim(),
  //     confirm_password: this.refs.confirm_password.getDOMNode().value.trim(),
  //   }
  //
  //   let newState = this.findErrorsInResetPasswordForm(formData);
  //
  //   this.setState(newState);
  //
  //   if(!newState.errorMessage){
  //     dispatch(resetPassword(this.props.params.token,formData.new_password));
  //   }
  // }
  render(){

    var errorLabel;
    const{actionMessage} = this.props;
    if(this.state.errorMessage){

      errorLabel = (
        <div className="uk-width-medium-2-3 uk-alert uk-alert-danger">
          <p>{this.state.errorMessage}</p>
        </div> );
    }else if (actionMessage.error) {
      errorLabel = (
        <div className="uk-width-medium-2-3 uk-alert uk-alert-danger">
          <p>{actionMessage.error}</p>
        </div> );
    }else if (actionMessage.successMessage) {
      errorLabel = (
        <div className="uk-width-medium-2-3 uk-alert uk-alert-success">
          <p>{actionMessage.successMessage}</p>
        </div> );
    }

    return(
      <div className="uk-width-medium-2-3 profile-form">

          <div className="uk-grid uk-grid-medium">
              <h4 className="uk-width-medium-1-1">Change Password</h4>
                {errorLabel}
              <div className="uk-width-medium-2-3">
                  <label className="uk-form-label" for="form-gs-a">Old Password</label>
                  <div className="uk-form-controls">
                      <input id="form-gs-a" placeholder="Old Password" ref="old_password" className="uk-width-1-1" type="password"/>
                  </div>
              </div>
              <div className="uk-width-medium-2-3">
                  <label className="uk-form-label" for="form-gs-b">New Password</label>
                  <div className="uk-form-controls">
                      <input id="form-gs-b" placeholder="New Password" ref="new_password" className="uk-width-1-1" type="password"/>
                  </div>
              </div>
              <div className="uk-width-medium-2-3">
                  <label className="uk-form-label" for="form-gs-b">Confirm New Password</label>
                  <div className="uk-form-controls">
                      <input id="form-gs-b" placeholder="Confirm New Password" ref="confirm_new_password" className="uk-width-1-1" type="password"/>
                  </div>
              </div>
          </div>
          <div>
            <p className="text-align-left">
                <button className="uk-button uk-button-success uk-button-large" onClick={this.handleClickUpdatePassword}>Update Password</button>

                </p>
          </div>
       </div>

    );

  }
}
function select(state) {
  return {
    actionMessage:state.actionMessage
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ChangePassword);
