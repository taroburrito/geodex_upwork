import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import LoginForm from '../../components/authentication/LoginForm';
import ForgotPassword from '../../components/authentication/ForgotPassword';
import { attemptLogin, forgetPasswordSubmit, navigatedAwayFromAuthFormPage } from '../../actions/AuthActions';

class MainLoginPage extends Component {
  constructor(props) {
    super(props);
  }
  transferToDashboardIfLoggedIn(){

    if (this.props.userAuthSession.isLoggedIn){
      this.context.router.transitionTo('/dash');
    }
  }
  componentWillMount() {
    this.transferToDashboardIfLoggedIn();
  }
  componentDidUpdate() {
    this.transferToDashboardIfLoggedIn();
  }
  componentWillUnmount() {
    this.props.dispatch(navigatedAwayFromAuthFormPage());
  }
  render() {
    const { dispatch, userAuthSession, forgotPasswordResult } = this.props;
    // TODO is fetching logged in status, show loader...
    return (
      <div className="Login_page_admin">

        <LoginForm
                    onClickLogin={(formData) => {
                      dispatch(attemptLogin(formData.email, formData.password, formData.role))
                    }}
                    isFetchingData={userAuthSession.fetchingAuthUpdate}
                    serverError={userAuthSession.error} />
                    <ForgotPassword onClickSubmit={(formData) => {
                      dispatch(forgetPasswordSubmit(formData.email))
                    }}
                    serverError={forgotPasswordResult.error}
                    successMessage={forgotPasswordResult.success}
                    />
      </div>
    );
  }
}

MainLoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};


function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    forgotPasswordResult: state.forgotPasswordResult,
  };
}

export default connect(select)(MainLoginPage);
