import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import Home from '../../components/front/Home';
import DashboardPage from '../../components/front/DashboardPage';
import Navbar from '../../components/Navbar';
import { attemptLogout } from '../../actions/AuthActions';
//import {addCategory} from '../../actions/CategoryActions';
import {fetchCommentsByPost, addPost,postComment} from '../../actions/PostActions';
import {getUserDetail, fetchDashboardData} from '../../utilities/ServerSocket';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import {
  updatefriendsList,
  updateDashboardFriendList,
  addCategory,
  setMessageToDefault,
  sendEmailFromDashboard,
  deleteCategory,
  updateCategoryById,
  fetchPreviousPost,
  fetchNextPost
  } from '../../actions/UserActions';
class HomePage extends Component{
  constructor(props){
    super(props);

  }

  render(){
    const {userAuthSession, dispatch} = this.props;

    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">

        <DashboardPage
          setMessageToDefault={()=>
          dispatch(setMessageToDefault())}
          fetchComments={(postId)=>
          dispatch(fetchCommentsByPost(postId))}
          comments={this.props.comments}
          updateDashboardFriendList={(friendList)=>
          dispatch(updateDashboardFriendList(friendList))}
          posts={this.props.posts}
          friendsPosts={this.props.friendsPosts}
          onClickSavePost={(data)=>
          dispatch(addPost(data))}
          addCategory={(req)=>
          dispatch(addCategory(req))}
          categories={this.props.categories}
          friends={this.props.friendsList}
          userAuthSession = {this.props.userAuthSession}
          fetchInitialData={(id,catId)=>fetchDashboardData(id,catId)}
          userProfileData={this.props.userProfileData}
          handleMessage={this.props.handleMessage}
          dashboardData={this.props.dashboardData}
          sendEmail={(to,from,content)=>
          dispatch(sendEmailFromDashboard(to,from,content))}
          postComment = {(req)=>dispatch(postComment(req))}
          onDeleteClick={Id => dispatch(deleteCategory(Id))}
          onChange={(id, value) => {dispatch(updateCategoryById(id,value))}}
          onFetchPreviousPost = {(id, value) => {dispatch(fetchPreviousPost(id,value))}}
          onFetchNextPost = {(id, value) => {dispatch(fetchNextPost(id,value))}}
          />
        </div>

      );
    }else{
    return(
      <div className="full_width">

      <Home/>
      </div>
    );
  }
  }
}

HomePage.contextTypes = {
  router: PropTypes.object.isRequired
};


function select(state) {
  return {
  userAuthSession: state.userAuthSession,
  userProfileData: state.userProfileData,
  categories: state.universalCategories,
  friendsList: state.friendsListState,
  handleMessage: state.handleMessage,
  posts:state.postsList,
  friendsPosts: state.friendsPosts,
  dashboardData: state.dashboardData,
  comments:state.postComments,
  };
}

export default connect(select)(HomePage);
