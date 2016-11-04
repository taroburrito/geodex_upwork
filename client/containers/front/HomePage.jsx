import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../../components/front/Home';
import DashboardPage from '../../components/front/DashboardPage';
import Navbar from '../../components/Navbar';
import { attemptLogout } from '../../actions/AuthActions';

class HomePage extends Component{
  constructor(props){
    super(props);

  }
  componentWillMount(){

  }
  render(){
    const {userAuthSession, dispatch} = this.props;

    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
        <DashboardPage/>
        </div>
      );
    }else{
    return(
      <div className="full_width">
      <Navbar userAuthSession={userAuthSession}/>
      <Home/>
      </div>
    );
  }
  }
}

function select(state) {
  return {
  userAuthSession: state.userAuthSession,
  };
}

export default connect(select)(HomePage);
