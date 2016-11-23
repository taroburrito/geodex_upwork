import React, { Component, PropTypes } from 'react';
import Footer from '../front/Footer';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPassword from '../authentication/ForgotPassword';
import { connect } from 'react-redux';
import { attemptLogin, forgetPasswordSubmit, navigatedAwayFromAuthFormPage, attemptSignUp } from '../../actions/AuthActions';

export default class Home extends Component {
  constructor(props){
    super(props);
  }
  transferToDashboardIfLoggedIn(){

    if (this.props.userAuthSession.isLoggedIn){
      this.context.router.transitionTo('/dashboard');
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
    return (
      <div>
        <div className="uk-grid" data-uk-grid-margin>
            <div className="uk-width-medium-1-1 banner_home">

                <div className="uk-vertical-align uk-text-center">
                    <div className="uk-vertical-align-middle uk-width-1-1">


                        <p>
                            <a className="uk-button uk-button-primary uk-button-large" data-uk-modal="{target:'#login'}">Login</a>
            <a className="uk-button uk-button-large" data-uk-modal="{target:'#signup'}">Signup</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <LoginPage onClickLogin={(formData) => {
                       dispatch(attemptLogin(formData.email, formData.password, formData.role))
                    }}
                    isFetchingData={userAuthSession.fetchingAuthUpdate}
                    serverError={userAuthSession.error}
         />
         <ForgotPassword onClickSubmit={(formData) => {
           dispatch(forgetPasswordSubmit(formData.email))
         }}
         serverError={forgotPasswordResult.error}
         successMessage={forgotPasswordResult.success}/>
       <SignupPage onClickSignUp={formData =>{
           dispatch(attemptSignUp(formData))
         }}
         message={this.props.updateMessage}/>
     <Footer/>
       <div id="offcanvas" className="uk-offcanvas">
           <div className="uk-offcanvas-bar">
               <ul className="uk-nav uk-nav-offcanvas">
               <li><a href="about_us.html">About Us</a></li>
               <li><a href="contact_us.html">Contact Us</a></li>
       <li><a href="terms_of_use.html">Terms of use</a></li>
               </ul>
           </div>
       </div>


     </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

function select(state) {
  return {
       userAuthSession: state.userAuthSession,
       forgotPasswordResult: state.forgotPasswordResult,
       updateMessage: state.updateMessage
  };
}

export default connect(select)(Home);
