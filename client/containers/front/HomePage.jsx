import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../../components/front/Home';
import DashboardPage from '../../components/front/DashboardPage';
import Navbar from '../../components/Navbar';
import { attemptLogout } from '../../actions/AuthActions';
import {addCategory} from '../../actions/CategoryActions';
import {getUserDetail} from '../../utilities/ServerSocket';

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
        <DashboardPage
          addCategory={(req)=>
          dispatch(addCategory(req))}
          categories={this.props.categories}
          userAuthSession = {this.props.userAuthSession}
          fetchInitialData={(id)=>getUserDetail(id)}
          userProfileData={this.props.userProfileData}
          handleMessage={this.props.handleMessage}/>
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
  userProfileData: state.userProfileData,
  categories: state.universalCategories,
  handleMessage: state.handleMessage,
  };
}

export default connect(select)(HomePage);
