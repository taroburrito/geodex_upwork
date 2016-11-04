import React, {Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {resetPassword, verifyToken} from '../../actions/AuthActions';
import { validatePassword } from '../../utilities/RegexValidators';
const initialFormState = {
      errorMessage:  null,
};

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    var token = this.props.params.token;
    this.handleOnClickReset = this.handleOnClickReset.bind(this);
    this.state = Object.assign({}, initialFormState);

  }
  componentWillMount(){
    const{dispatch} = this.props;
    dispatch(verifyToken("forgot_password_token",this.props.params.token));

  }
  componentDidMount(){

  }
  componentDidUpdate(){
    console.log(this.props.verifyToken);
  }
  findErrorsInResetPasswordForm(formData){
    let newState = Object.assign({}, initialFormState);
    if(formData.new_password === ''){
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
  handleOnClickReset(){
      const { dispatch, userAuthSession } = this.props;
    var formData = {
      new_password : this.refs.new_password.getDOMNode().value.trim(),
      confirm_password: this.refs.confirm_password.getDOMNode().value.trim(),
    }

    let newState = this.findErrorsInResetPasswordForm(formData);

    this.setState(newState);

    if(!newState.errorMessage){
      dispatch(resetPassword(this.props.params.token,formData.new_password));
    }
  }
  render(){
    const { dispatch, userAuthSession, verifyToken } = this.props;
    var errorLabel;
    if(this.state.errorMessage){

      errorLabel = (
        <div>
          <label className="control-label">{this.state.errorMessage}</label>
        </div> );
    }
    else if (verifyToken.hasOwnProperty('successMessage')) {
      console.log(verifyToken);
      errorLabel = (
        <div>
          <label className="control-label">{verifyToken.successMessage}</label>
        </div> );
    }
    else if (verifyToken.hasOwnProperty('error')) {
      console.log(verifyToken);
      errorLabel = (
        <div>
          <label className="control-label">{verifyToken.error}</label>
        </div> );
    }
    if(!verifyToken || !verifyToken.token){
    return(
      <div><p style={{fontSize:18, textAlign: 'center'}}>Link not found Please <Link to="/admin/login">Login here</Link></p></div>
    )
    }else{


    return(
      <div>
        <div className="uk-vertical-align uk-text-center uk-height-1-1">
          <div className="uk-vertical-align-middle login_form">
           <img className="uk-margin-bottom" src="resources/images/logo.png" alt=""/>
            <form className="uk-panel uk-panel-box uk-form">
              <div className="uk-form-row">
                <h3 style={{color:'#fff'}}>Reset Password</h3>
              </div>
              {errorLabel}

              <div className="uk-form-row">
                <input className="uk-width-1-1 uk-form-large" type="password" placeholder="New Password" ref="new_password" />
              </div>
              <div className="uk-form-row">
                <input className="uk-width-1-1 uk-form-large" type="password" placeholder="Confirm Password" ref="confirm_password" />
              </div>
              <div className="uk-form-row">
                  <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" onClick={this.handleOnClickReset}>Reset</a>
              </div>
              <div className="uk-form-row uk-text-small">
                <Link className="uk-float-right uk-link uk-link-muted" to="/admin/login">Login</Link>
              </div>
            </form>
          </div>
         </div>
      </div>

    );
  }
  }
}
function select(state) {
  return {
    verifyToken: state.verifyToken
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ResetPassword);
