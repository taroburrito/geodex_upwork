import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import Home from '../../components/front/Home';
import {fetchUniversalPosts} from '../../actions/PostActions';
import FeedsWidget from '../../components/front/feeds/FeedsWidget';



export default class Feeds extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, userAuthSession } = this.props;
    if(userAuthSession.isLoggedIn){

      return(
        <div className="full_width">
            <FeedsWidget
              fetchAllPosts={()=>dispatch(fetchUniversalPosts())}
              posts={this.props.universalPosts}
              userAuthSession={this.props.userAuthSession}
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


function select(state) {
  return {
    userAuthSession: state.userAuthSession,
    universalPosts:state.universalPosts,
    
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Feeds);
