import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//Actions
import { attemptLogout } from '../actions/AuthActions';

//Components
import Navbar from '../components/Navbar';
import AdminNavbar from '../components/AdminNavbar';
import SignUpForm from '../components/authentication/SignUpForm';
import LoginForm from '../components/authentication/LoginForm';
import Home from '../components/front/Home';
import LandingPage from '../components/static_pages/landing_page/LandingPage.jsx';

// containers
import MainLoginPage from './admin/MainLoginPage';
import HomePage from './front/HomePage';
import Dashboard from './admin/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var baseUrl = window.location.href.split('#')[0].split('/')[window.location.href.split('#')[0].split('/').length-1];

    // Injected by connect() call:
    const { dispatch, userAuthSession } = this.props;
    console.log(userAuthSession);
    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;

    const value = pathname.substring(1);


    var content;
    var landingPage;
    var loginForm = <LoginForm/>
    if (children === undefined){
      landingPage = <HomePage/>;
    }

    if (baseUrl == 'admin'){
     if(userAuthSession.isLoggedIn && userAuthSession.userObject.role=='admin'){
       return (<div>
         <AdminNavbar userAuthSession={userAuthSession} logout={() => dispatch(attemptLogout())}/>
         { children }
         { content }
       </div>);
     }else{
       return (<div>
         <MainLoginPage/>
       </div>);
     }

  } else{
    if(userAuthSession.isLoggedIn && userAuthSession.userObject.role=='user'){
    return (
            <div>
              <Navbar userAuthSession={userAuthSession} logout={() => dispatch(attemptLogout())}/>
              {landingPage}
              { children }
              { content }
            </div>
          );
        }else{
          return(
            <div>
              {landingPage}
              { children }
              { content }
            </div>
          );
        }
  }

  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

function select(state) {
  return {
    universalTodos: state.universalTodos,
    unsavedUniversalTodos: state.unsavedUniversalTodos,
    userAuthSession: state.userAuthSession,
    errorMessage: state.errorMessage,
  //  universalPages: state.universalPages,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
