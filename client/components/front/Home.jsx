import React, { Component, PropTypes } from 'react';
import Footer from '../front/Footer';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Alert from './Alert';
import ForgotPassword from '../authentication/ForgotPassword';
import { connect } from 'react-redux';
import { attemptLogin, forgetPasswordSubmit, navigatedAwayFromAuthFormPage, attemptSignUp } from '../../actions/AuthActions';


var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


export default class Home extends Component {
  constructor(props){
    super(props);
    this.checkIsVerifiedUser = this.checkIsVerifiedUser.bind(this);
    this.addAlert = this.addAlert.bind(this);
  }

  checkIsVerifiedUser(){
    if(localStorage.getItem("verifyAuth")){
      console.log("Verified");
    }else{
    this.addAlert("","Please verify first by clicking on lock icon.");
    }

  }

  addAlert (title,message) {
     this.refs.alertContainer.error(
      message,
      title, {
      timeOut: 4000,
      extendedTimeOut: 1000
    });
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

    var isVerifiedUser = localStorage.getItem("verifyAuth");
    const { dispatch, userAuthSession, forgotPasswordResult } = this.props;
    return (
      <div>
        <ToastContainer
           ref="alertContainer"
           toastMessageFactory={ToastMessageFactory}
           className="toast-top-right" />
        <div className="uk-grid" data-uk-grid-margin>
            <div className="uk-width-medium-1-1 banner_home">

                <div className="uk-vertical-align uk-text-center">
                    <div className="uk-vertical-align-middle uk-width-1-1">
                        <p>
                            <a className="uk-button uk-button-primary uk-button-large" data-uk-modal="{target:'#login'}" onClick={this.checkIsVerifiedUser}>Login</a>
                            <a className="uk-button uk-button-large" data-uk-modal="{target:'#signup'}" onClick={this.checkIsVerifiedUser}>Signup</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
        {isVerifiedUser?
      <div>
        <LoginPage
          onClickLogin={(formData) => {dispatch(attemptLogin(formData.email, formData.password, formData.role))}}
          isFetchingData={userAuthSession.fetchingAuthUpdate}
          serverError={userAuthSession.error}
         />
         <ForgotPassword onClickSubmit={(formData) => {
           dispatch(forgetPasswordSubmit(formData.email,formData.role))
         }}
         serverError={forgotPasswordResult.error}
         successMessage={forgotPasswordResult.success}/>
       <SignupPage onClickSignUp={formData =>{
           dispatch(attemptSignUp(formData))
         }}
         message={this.props.updateMessage}/>
     </div>
       :null}
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
