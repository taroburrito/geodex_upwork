import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//Actions
import { attemptLogout } from '../actions/AuthActions';
import { searchUser, clearSearchList } from '../actions/UserActions';

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
    console.log(this.props.userAuthSession);
    var baseUrl = window.location.href.split('#')[0].split('/')[window.location.href.split('#')[0].split('/').length-1];

    // Injected by connect() call:
    const { dispatch, userAuthSession } = this.props;

    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;

    const value = pathname.split('/');
    const page = value[1];


    var content;
    var landingPage;
    var loginForm = <LoginForm/>
    if (children === undefined){
      landingPage = <HomePage/>;
    }else if (page == 'pages') {
      landingPage = children;
    }else{
    //  landingPage = <HomePage/>;
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

    if(userAuthSession.isLoggedIn && userAuthSession.userObject && userAuthSession.userObject.role=='user'){
    return (
            <div>
              <Navbar
                clearSearchList={this.props.clearSearchList}
                 userAuthSession={userAuthSession} logout={() => dispatch(attemptLogout())} searchUser={(str)=>
                dispatch(searchUser(str))}
                searchResult={this.props.searchResult}/>
              {landingPage}
              { children }
              { content }
            </div>
          );
        }else{
          if(!landingPage){
            landingPage = <HomePage/>;
          }
          return(
            <div>
              <Navbar
                clearSearchList={this.props.clearSearchList}
                userAuthSession={userAuthSession} searchUser={(str)=>
                dispatch(searchUser(str))}
                searchResult={this.props.searchResult}/>
              {landingPage}

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
    searchResult: state.searchResult
  //  universalPages: state.universalPages,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
